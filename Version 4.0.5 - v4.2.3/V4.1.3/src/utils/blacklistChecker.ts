import { BLACKLISTED_CREATORS } from "@/config/blacklistConfig";
import { supabase } from "@/integrations/supabase/client";

export type CheckResult = {
  isBlacklisted: boolean;
  reason: string;
  matchedCreator: string | null;
  discordServerId: string | null;
  category: string | null;
  flaggedBy: string | null;
  severity: string;
  matchType: 'exact' | 'keyword' | 'none' | 'discord_id' | 'ip_violation' | 'coc_violation' | 'content_filter';
  matchedKeywords?: string[];
  possibleFalsePositive: boolean;
};

export type ComplianceResult = {
  isCompliant: boolean;
  issues: string[];
  recommendations: string[];
  severity: string;
  flaggedBy?: string;
  matchedCreator?: string;
};

export const checkResourceCompliance = async (resourceName: string): Promise<ComplianceResult> => {
  // Check for hardcoded blacklisted words first
  const HARDCODED_BLACKLISTED_WORDS = [
    'gay', 'trans', 'tranny', 'fag', 'faggot', 'nigg', 'nigger', 'nazi', 'hitler',
    'kike', 'chink', 'spic', 'wetback', 'towelhead', 'raghead', 'sandnigger',
    'retard', 'retarded', 'autistic', 'autism', 'downs', 'mongoloid'
  ];

  const inputLower = resourceName.trim().toLowerCase();
  const containsBlacklistedWord = HARDCODED_BLACKLISTED_WORDS.some(word => 
    inputLower.includes(word.toLowerCase())
  );

  if (containsBlacklistedWord) {
    const matchedWords = HARDCODED_BLACKLISTED_WORDS.filter(word => 
      inputLower.includes(word.toLowerCase())
    );
    
    return {
      isCompliant: false,
      issues: [
        `🚫 Inappropriate Content Detected`,
        `📝 Contains prohibited terms: ${matchedWords.join(', ')}`,
        `👤 Flagged by: Automated Content Filter`,
        `⚡ Severity: High`
      ],
      recommendations: [
        "Remove or replace inappropriate language",
        "Ensure content follows community guidelines",
        "Use respectful and inclusive terminology"
      ],
      severity: 'high',
      flaggedBy: 'Automated Content Filter',
      matchedCreator: 'Content Filter'
    };
  }

  const checkResult = await checkCreator(resourceName);
  
  const issues: string[] = [];
  const recommendations: string[] = [];
  
  if (checkResult.isBlacklisted) {
    // More informal output showing who flagged it and what flagged it
    const flagInfo = `Flagged by: ${checkResult.flaggedBy || 'Unknown'}`;
    const matchInfo = checkResult.matchedCreator ? `Target: ${checkResult.matchedCreator}` : 'Automated Detection';
    
    if (checkResult.matchType === 'ip_violation') {
      issues.push(`🚫 IP Violation Detected - ${matchInfo}`);
      issues.push(`📝 ${checkResult.reason}`);
      issues.push(`👤 ${flagInfo}`);
      recommendations.push("Consider using original content or properly licensed assets");
      recommendations.push("Review FiveM Terms of Service regarding intellectual property");
    } else if (checkResult.matchType === 'coc_violation') {
      issues.push(`⚠️ Code of Conduct Violation - ${matchInfo}`);
      issues.push(`📝 ${checkResult.reason}`);
      issues.push(`👤 ${flagInfo}`);
      recommendations.push("Ensure content follows FiveM Community Guidelines");
      recommendations.push("Remove any inappropriate or offensive content");
    } else {
      issues.push(`🔍 Database Match Found - ${matchInfo}`);
      issues.push(`📝 Reason: ${checkResult.reason}`);
      issues.push(`👤 Reported by: ${checkResult.flaggedBy || 'Unknown'}`);
      issues.push(`🏷️ Category: ${checkResult.category || 'Unknown'}`);
      issues.push(`⚡ Severity: ${checkResult.severity}`);
      
      if (checkResult.possibleFalsePositive) {
        issues.push(`⚠️ Note: This might be a partial match - verify manually`);
      }
      
      recommendations.push("Verify the creator's current status");
      recommendations.push("Consider using alternative resources from verified creators");
      
      if (checkResult.discordServerId) {
        issues.push(`💬 Discord Server: ${checkResult.discordServerId}`);
      }
    }
  }
  
  return {
    isCompliant: !checkResult.isBlacklisted,
    issues,
    recommendations,
    severity: checkResult.severity,
    flaggedBy: checkResult.flaggedBy,
    matchedCreator: checkResult.matchedCreator
  };
};

export const checkCreator = async (input: string): Promise<CheckResult> => {
  // Hardcoded blacklisted words that should be filtered
  const HARDCODED_BLACKLISTED_WORDS = [
    'gay', 'trans', 'tranny', 'fag', 'faggot', 'nigg', 'nigger', 'nazi', 'hitler',
    'kike', 'chink', 'spic', 'wetback', 'towelhead', 'raghead', 'sandnigger',
    'retard', 'retarded', 'autistic', 'autism', 'downs', 'mongoloid'
  ];

  // Check for hardcoded blacklisted words first
  const inputLower = input.trim().toLowerCase();
  const containsBlacklistedWord = HARDCODED_BLACKLISTED_WORDS.some(word => 
    inputLower.includes(word.toLowerCase())
  );

  if (containsBlacklistedWord) {
    const matchedWords = HARDCODED_BLACKLISTED_WORDS.filter(word => 
      inputLower.includes(word.toLowerCase())
    );
    
    console.log('Hardcoded blacklisted words detected:', matchedWords);
    return {
      isBlacklisted: true,
      reason: `Inappropriate content detected. This search contains prohibited terms that violate community guidelines.`,
      matchedCreator: 'Content Filter',
      discordServerId: null,
      category: 'inappropriate_content',
      flaggedBy: 'Automated Content Filter',
      severity: 'high',
      matchType: 'content_filter',
      matchedKeywords: matchedWords,
      possibleFalsePositive: false
    };
  }

  console.log('Checking input:', input);
  
  let processedInput = input.trim();
  let discordServerId: string | null = null;
  let searchTerm = processedInput.toLowerCase();
  let domain: string | null = null;
  
  // Check if input is a Discord ID (numeric string typically 17-19 digits)
  const isDiscordId = /^\d{17,19}$/.test(processedInput);
  
  // Load blacklist data from database
  let BLACKLISTED_CREATORS: any[] = [];
  try {
    const { data: blacklistData } = await supabase
      .from('blacklist_entries')
      .select('*');
    
    if (blacklistData) {
      BLACKLISTED_CREATORS = blacklistData.map(entry => ({
        name: entry.name,
        links: entry.links || [],
        reason: entry.reason,
        severity: entry.severity,
        blacklistedSince: entry.blacklisted_since,
        category: entry.category,
        keyword: entry.keyword,
        flaggedBy: entry.flagged_by,
        discordServerId: entry.discord_server_id
      }));
    }
  } catch (error) {
    console.error('Error loading blacklist from database:', error);
    // Fallback to config file if database fails
    BLACKLISTED_CREATORS = [];
  }
  
  if (isDiscordId) {
    // If it's a Discord ID, search directly in the blacklist
    console.log('Input detected as Discord ID:', processedInput);
    discordServerId = processedInput;
    
    const directDiscordMatch = BLACKLISTED_CREATORS.find(creator => 
      creator.discordServerId === processedInput
    );
    
    if (directDiscordMatch) {
      console.log('Direct Discord ID match found:', directDiscordMatch);
      return {
        isBlacklisted: true,
        reason: directDiscordMatch.reason,
        matchedCreator: directDiscordMatch.name,
        discordServerId: directDiscordMatch.discordServerId,
        category: directDiscordMatch.category,
        flaggedBy: directDiscordMatch.flaggedBy,
        severity: directDiscordMatch.severity,
        matchType: 'discord_id',
        possibleFalsePositive: false
      };
    }
  } else {
    // Handle URLs and domain extraction
    if (processedInput.includes("http") || processedInput.includes(".") || processedInput.includes("discord.gg")) {
      try {
        // Handle Discord invite links specially
        if (processedInput.includes("discord.gg")) {
          discordServerId = extractDiscordServerId(processedInput);
          // Also try to create a proper URL for domain extraction
          if (!processedInput.startsWith("http")) {
            processedInput = `https://${processedInput}`;
          }
        } else {
          // For other URLs, ensure proper format
          if (!processedInput.startsWith("http")) {
            processedInput = `https://${processedInput}`;
          }
        }
        
        // Extract domain from URL
        domain = extractDomain(processedInput);
        
        // Also extract Discord server ID if it's a Discord URL
        if (!discordServerId) {
          discordServerId = extractDiscordServerId(processedInput);
        }
        
      } catch (err) {
        console.error("Error processing URL:", err);
        // If URL processing fails, treat as a simple search term
        searchTerm = input.trim().toLowerCase();
      }
    } else {
      // For non-URL inputs, treat as search terms (names, etc.)
      searchTerm = processedInput.toLowerCase();
    }
  }

  console.log('Processed input:', { 
    original: input, 
    processed: processedInput, 
    domain, 
    discordServerId,
    searchTerm,
    isDiscordId
  });

  // Check for IP violation keywords in the URL/input
  const ipViolationResult = await checkIPViolations(processedInput, searchTerm);
  if (ipViolationResult.isBlacklisted) {
    return ipViolationResult;
  }

  // Check for COC violation keywords in the URL/input
  const cocViolationResult = await checkCOCViolations(processedInput, searchTerm);
  if (cocViolationResult.isBlacklisted) {
    return cocViolationResult;
  }

  // Check for exact matches first (highest priority)
  for (const creator of BLACKLISTED_CREATORS) {
    const creatorName = creator.name.toLowerCase();
    const creatorKeyword = creator.keyword.toLowerCase();
    
    // Exact Discord server ID match
    if (discordServerId && creator.discordServerId === discordServerId) {
      console.log('Exact Discord server ID match found:', creator);
      return {
        isBlacklisted: true,
        reason: creator.reason,
        matchedCreator: creator.name,
        discordServerId: creator.discordServerId,
        category: creator.category,
        flaggedBy: creator.flaggedBy,
        severity: creator.severity,
        matchType: 'exact',
        possibleFalsePositive: false
      };
    }
    
    // Check links array for exact matches
    if (creator.links && Array.isArray(creator.links)) {
      for (const link of creator.links) {
        const linkLower = link.toLowerCase();
        const inputLower = processedInput.toLowerCase();
        
        // Exact link match
        if (linkLower === inputLower) {
          console.log('Exact link match found:', creator, 'matched link:', link);
          return {
            isBlacklisted: true,
            reason: creator.reason,
            matchedCreator: creator.name,
            discordServerId: creator.discordServerId || discordServerId,
            category: creator.category,
            flaggedBy: creator.flaggedBy,
            severity: creator.severity,
            matchType: 'exact',
            possibleFalsePositive: false
          };
        }
        
        // Check if the input contains the link or vice versa
        if (linkLower.includes(inputLower) || inputLower.includes(linkLower)) {
          console.log('Partial link match found:', creator, 'matched link:', link);
          return {
            isBlacklisted: true,
            reason: creator.reason,
            matchedCreator: creator.name,
            discordServerId: creator.discordServerId || discordServerId,
            category: creator.category,
            flaggedBy: creator.flaggedBy,
            severity: creator.severity,
            matchType: 'exact',
            possibleFalsePositive: false
          };
        }
        
        // Extract Discord server ID from links and compare
        const linkDiscordId = extractDiscordServerId(link);
        if (linkDiscordId && discordServerId && linkDiscordId === discordServerId) {
          console.log('Discord ID match from link found:', creator, 'matched link:', link);
          return {
            isBlacklisted: true,
            reason: creator.reason,
            matchedCreator: creator.name,
            discordServerId: creator.discordServerId || discordServerId,
            category: creator.category,
            flaggedBy: creator.flaggedBy,
            severity: creator.severity,
            matchType: 'exact',
            possibleFalsePositive: false
          };
        }
      }
    }
    
    // Exact domain match
    if (domain && (creatorName === domain || creatorKeyword === domain)) {
      console.log('Exact domain match found:', creator);
      return {
        isBlacklisted: true,
        reason: creator.reason,
        matchedCreator: creator.name,
        discordServerId: creator.discordServerId || discordServerId,
        category: creator.category,
        flaggedBy: creator.flaggedBy,
        severity: creator.severity,
        matchType: 'exact',
        possibleFalsePositive: false
      };
    }
    
    // Exact name/keyword match for search terms
    if (!isDiscordId && (creatorName === searchTerm || creatorKeyword === searchTerm)) {
      console.log('Exact name/keyword match found:', creator);
      return {
        isBlacklisted: true,
        reason: creator.reason,
        matchedCreator: creator.name,
        discordServerId: creator.discordServerId || discordServerId,
        category: creator.category,
        flaggedBy: creator.flaggedBy,
        severity: creator.severity,
        matchType: 'exact',
        possibleFalsePositive: false
      };
    }
  }

  // Check for partial matches (lower priority, possible false positives)
  const partialMatches = [];
  
  for (const creator of BLACKLISTED_CREATORS) {
    const creatorName = creator.name.toLowerCase();
    const creatorKeyword = creator.keyword.toLowerCase();
    let isPartialMatch = false;
    const matchedKeywords = [];
    
    // Partial domain match
    if (domain) {
      if (creatorName.includes(domain) || domain.includes(creatorName)) {
        isPartialMatch = true;
        matchedKeywords.push(creator.name);
      }
      if (creatorKeyword.includes(domain) || domain.includes(creatorKeyword)) {
        isPartialMatch = true;
        matchedKeywords.push(creator.keyword);
      }
    }
    
    // Partial search term match (for non-URL, non-Discord ID inputs)
    if (!isDiscordId && !domain && searchTerm.length > 2) {
      if (creatorName.includes(searchTerm) || searchTerm.includes(creatorName)) {
        isPartialMatch = true;
        matchedKeywords.push(creator.name);
      }
      if (creatorKeyword.includes(searchTerm) || searchTerm.includes(creatorKeyword)) {
        isPartialMatch = true;
        matchedKeywords.push(creator.keyword);
      }
    }
    
    if (isPartialMatch) {
      partialMatches.push({
        ...creator,
        matchedKeywords: [...new Set(matchedKeywords)]
      });
    }
  }

  if (partialMatches.length > 0) {
    const match = partialMatches[0]; // Take first match
    console.log('Partial match found (possible false positive):', match);
    
    return {
      isBlacklisted: true,
      reason: match.reason,
      matchedCreator: match.name,
      discordServerId: match.discordServerId || discordServerId,
      category: match.category,
      flaggedBy: match.flaggedBy,
      severity: match.severity,
      matchType: 'keyword',
      matchedKeywords: match.matchedKeywords,
      possibleFalsePositive: true
    };
  }

  // No matches found
  console.log('No matches found for input:', processedInput);
  return {
    isBlacklisted: false,
    reason: '',
    matchedCreator: null,
    discordServerId: discordServerId,
    category: null,
    flaggedBy: null,
    severity: 'low',
    matchType: 'none',
    possibleFalsePositive: false
  };
};

const checkIPViolations = async (processedInput: string, searchTerm: string): Promise<CheckResult> => {
  const inputLower = processedInput.toLowerCase();
  const matchedKeywords: string[] = [];
  
  try {
    // Fetch IP violation keywords from database
    const { data: ipKeywords } = await supabase
      .from('ip_violation_keywords')
      .select('keyword');
    
    // Fetch IP bypass keywords from database
    const { data: ipBypassKeywords } = await supabase
      .from('ip_bypass_keywords')
      .select('keyword');
    
    const violationKeywords = ipKeywords?.map(item => item.keyword) || [];
    const bypassKeywords = ipBypassKeywords?.map(item => item.keyword) || [];
    
    // Check for IP violation keywords
    for (const keyword of violationKeywords) {
      const keywordLower = keyword.toLowerCase();
      
      // Check if keyword appears in the input
      if (inputLower.includes(keywordLower)) {
        // Check if any bypass keywords are present
        const hasBypass = bypassKeywords.some(bypass => 
          inputLower.includes(bypass.toLowerCase())
        );
        
        if (!hasBypass) {
          matchedKeywords.push(keyword);
        }
      }
    }
    
    if (matchedKeywords.length > 0) {
      console.log('IP violation keywords found:', matchedKeywords);
      return {
        isBlacklisted: true,
        reason: `IP Infringement - Contains copyrighted brand names: ${matchedKeywords.join(', ')}`,
        matchedCreator: 'Automated Detection',
        discordServerId: null,
        category: 'other',
        flaggedBy: 'Automated System',
        severity: 'high',
        matchType: 'ip_violation',
        matchedKeywords,
        possibleFalsePositive: false
      };
    }
  } catch (error) {
    console.error('Error checking IP violations:', error);
  }
  
  return {
    isBlacklisted: false,
    reason: '',
    matchedCreator: null,
    discordServerId: null,
    category: null,
    flaggedBy: null,
    severity: 'low',
    matchType: 'none',
    possibleFalsePositive: false
  };
};

const checkCOCViolations = async (processedInput: string, searchTerm: string): Promise<CheckResult> => {
  const inputLower = processedInput.toLowerCase();
  const matchedKeywords: string[] = [];
  const contextualMatches: string[] = [];
  
  try {
    // Fetch COC violation keywords from database
    const { data: cocKeywords } = await supabase
      .from('coc_violation_keywords')
      .select('keyword');
    
    // Fetch COC bypass keywords from database
    const { data: cocBypassKeywords } = await supabase
      .from('coc_bypass_keywords')
      .select('keyword');
    
    // Fetch COC contextual patterns from database
    const { data: contextualPatterns } = await supabase
      .from('coc_contextual_patterns')
      .select('pattern');
    
    const violationKeywords = cocKeywords?.map(item => item.keyword) || [];
    const bypassKeywords = cocBypassKeywords?.map(item => item.keyword) || [];
    const patterns = contextualPatterns?.map(item => item.pattern) || [];
    
    // Check for direct COC violation keywords (those without ':' suffix)
    for (const keyword of violationKeywords) {
      if (!keyword.endsWith(':')) {
        const keywordLower = keyword.toLowerCase();
        
        if (inputLower.includes(keywordLower)) {
          // Check if any bypass keywords are present
          const hasBypass = bypassKeywords.some(bypass => 
            inputLower.includes(bypass.toLowerCase())
          );
          
          if (!hasBypass) {
            matchedKeywords.push(keyword);
          }
        }
      }
    }
    
    // Check for contextual violations (keywords that need context)
    for (const pattern of patterns) {
      if (Array.isArray(pattern) && pattern.length >= 2) {
        const [contextWord, violationWord] = pattern;
        
        if (inputLower.includes(contextWord.toLowerCase()) && inputLower.includes(violationWord.toLowerCase())) {
          // Check if any bypass keywords are present
          const hasBypass = bypassKeywords.some(bypass => 
            inputLower.includes(bypass.toLowerCase())
          );
          
          if (!hasBypass) {
            contextualMatches.push(`${contextWord} + ${violationWord}`);
          }
        }
      }
    }
    
    const allMatches = [...matchedKeywords, ...contextualMatches];
    
    if (allMatches.length > 0) {
      console.log('COC violation keywords found:', allMatches);
      return {
        isBlacklisted: true,
        reason: `Code of Conduct Violation - Contains inappropriate content: ${allMatches.join(', ')}`,
        matchedCreator: 'Automated Detection',
        discordServerId: null,
        category: 'other',
        flaggedBy: 'Automated System',
        severity: 'critical',
        matchType: 'coc_violation',
        matchedKeywords: allMatches,
        possibleFalsePositive: false
      };
    }
  } catch (error) {
    console.error('Error checking COC violations:', error);
  }
  
  return {
    isBlacklisted: false,
    reason: '',
    matchedCreator: null,
    discordServerId: null,
    category: null,
    flaggedBy: null,
    severity: 'low',
    matchType: 'none',
    possibleFalsePositive: false
  };
};

export const extractDomain = (url: string): string | null => {
  try {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;

    // Remove "www." prefix if it exists
    domain = domain.startsWith('www.') ? domain.slice(4) : domain;
    return domain.toLowerCase();
  } catch (e) {
    console.error("Invalid URL", url, e);
    return null;
  }
};

export const getSeverityClass = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    case 'high':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'medium':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
    default:
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
  }
};

export const extractDiscordServerId = (input: string): string | null => {
  // Check if the input is a Discord invite link
  if (input.includes("discord.gg/")) {
    const inviteCode = input.substring(input.lastIndexOf('/') + 1);
    return `invite:${inviteCode}`; // Prefix 'invite:' to distinguish from direct IDs
  }

  // Check if the input is a direct Discord server ID (numeric string)
  if (/^\d{17,19}$/.test(input)) {
    return input;
  }

  return null;
};
