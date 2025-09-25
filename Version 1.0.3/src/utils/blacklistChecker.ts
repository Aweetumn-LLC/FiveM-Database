import { 
  BLACKLISTED_CREATORS, 
  IP_VIOLATION_KEYWORDS, 
  COC_VIOLATION_KEYWORDS, 
  IP_BYPASS_KEYWORDS, 
  COC_BYPASS_KEYWORDS,
  GLOBAL_WHITELIST,
  COC_CONTEXTUAL_PATTERNS
} from "@/config/blacklistConfig";

export interface CheckResult {
  isBlacklisted: boolean;
  reason?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  matchedCreator?: string;
  matchedKeywords?: string[];
  matchType?: 'exact' | 'keyword';
  category?: 'discord' | 'tebex' | 'discord-other' | 'other'; 
  flaggedBy?: string;
  keyword?: string;
  possibleFalsePositive?: boolean;
  discordServerId?: string; // Added for Discord server ID
}

// New function to extract Discord server ID from URL
export const extractDiscordServerId = (url: string): string | null => {
  try {
    // Handle various Discord URL formats
    // Format: https://discord.com/invite/INVITECODE
    // Format: https://discord.gg/INVITECODE
    // Format: https://discord.com/servers/SERVER-NAME-SERVER_ID
    
    const normalizedUrl = url.trim().toLowerCase();
    
    // Check for servers URL format with direct server ID
    const serversRegex = /discord\.com\/servers\/.*?-(\d+)/i;
    const serversMatch = normalizedUrl.match(serversRegex);
    if (serversMatch && serversMatch[1]) {
      return serversMatch[1];
    }
    
    // For invite links, we can't directly extract the server ID
    // We'll return a special code indicating it's an invite link
    const inviteRegex = /(discord\.com\/invite\/|discord\.gg\/)([\w-]+)/i;
    const inviteMatch = normalizedUrl.match(inviteRegex);
    if (inviteMatch && inviteMatch[2]) {
      return `invite:${inviteMatch[2]}`; // Use prefix to indicate it's an invite
    }
    
    return null;
  } catch (error) {
    console.error("Error extracting Discord server ID:", error);
    return null;
  }
};

export const checkCreator = (input: string): CheckResult => {
  // Normalize input (trim whitespace, lowercase for case-insensitive comparison)
  const normalizedInput = input.trim().toLowerCase();
  
  // Extract Discord server ID if present in the input
  const discordServerId = extractDiscordServerId(input);
  
  // Check if input matches any blacklisted creator directly
  const matchedCreator = BLACKLISTED_CREATORS.find(creator => 
    creator.name.toLowerCase() === normalizedInput ||
    (creator.links && creator.links.some(link => link.toLowerCase().includes(normalizedInput) || normalizedInput.includes(link.toLowerCase()))) ||
    creator.keyword.toLowerCase() === normalizedInput ||
    // Add check for Discord server ID if present in creator object
    (discordServerId && creator.discordServerId === discordServerId)
  );

  if (matchedCreator) {
    return {
      isBlacklisted: true,
      reason: matchedCreator.reason,
      severity: matchedCreator.severity,
      matchedCreator: matchedCreator.name,
      matchType: 'exact',
      category: matchedCreator.category,
      flaggedBy: matchedCreator.flaggedBy,
      keyword: matchedCreator.keyword,
      discordServerId: discordServerId || matchedCreator.discordServerId
    };
  }
  
  // Check for global whitelist words - if they exist in input, we'll be more careful
  const containsWhitelistedWord = GLOBAL_WHITELIST.some(word => 
    normalizedInput.includes(word.toLowerCase())
  );
  
  // Check for keyword violations with whole word matching and context analysis
  const ipKeywords = checkKeywordsWithContext(normalizedInput, IP_VIOLATION_KEYWORDS, IP_BYPASS_KEYWORDS, containsWhitelistedWord);
  const cocKeywords = checkKeywordsWithContext(normalizedInput, COC_VIOLATION_KEYWORDS, COC_BYPASS_KEYWORDS, containsWhitelistedWord);
  
  // Combine all found keywords and remove duplicates
  const allKeywords = [...new Set([...ipKeywords.exactMatches, ...cocKeywords.exactMatches])];
  const partialMatches = [...new Set([...ipKeywords.partialMatches, ...cocKeywords.partialMatches])];
  
  // If we have exact matches, those take precedence
  if (allKeywords.length > 0) {
    // Determine severity based on which violations were found
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
    let reason = '';
    let flaggedBy = 'Automatic Keyword Detection';
    
    if (cocKeywords.exactMatches.length > 0 && ipKeywords.exactMatches.length > 0) {
      severity = 'critical';
      reason = 'Multiple violations detected: IP and Code of Conduct';
    } else if (cocKeywords.exactMatches.length > 0) {
      severity = 'high';
      reason = 'Potential code of conduct violation detected';
    } else {
      severity = 'medium';
      reason = 'Potential IP violation detected';
    }
    
    return {
      isBlacklisted: true,
      reason,
      severity,
      matchedKeywords: allKeywords,
      matchType: 'keyword',
      flaggedBy,
      category: 'other',
      possibleFalsePositive: false,
      discordServerId
    };
  }
  
  // If we only have partial matches, flag as a possible false positive
  if (partialMatches.length > 0) {
    return {
      isBlacklisted: true,
      reason: 'Possible IP or CoC violation (partial match detected)',
      severity: 'low',
      matchedKeywords: partialMatches,
      matchType: 'keyword',
      flaggedBy: 'Automatic Keyword Detection',
      category: 'other',
      possibleFalsePositive: true,
      discordServerId
    };
  }
  
  // No violations found
  return {
    isBlacklisted: false,
    discordServerId // Include the Discord ID even if not blacklisted
  };
};

// Helper function to check for keyword matches with context analysis
const checkKeywordsWithContext = (
  input: string, 
  violationKeywords: string[], 
  bypassKeywords: string[],
  hasGlobalWhitelist: boolean
) => {
  const exactMatches: string[] = [];
  const partialMatches: string[] = [];
  
  // Convert input to lowercase for case-insensitive matching
  const inputLower = input.toLowerCase();
  
  // Break input into words for whole-word matching
  const words = inputLower.split(/\s+|[./-]|[^\w\s]/);
  
  // First, check for contextual pattern matches (phrases that together indicate violations)
  const hasContextualMatch = COC_CONTEXTUAL_PATTERNS.some(pattern => 
    pattern.every(term => inputLower.includes(term))
  );
  
  if (hasContextualMatch) {
    // Find which patterns matched to include them in the results
    COC_CONTEXTUAL_PATTERNS.forEach(pattern => {
      if (pattern.every(term => inputLower.includes(term))) {
        exactMatches.push(`"${pattern.join(' + ')}" phrase detected`);
      }
    });
  }
  
  // If the input contains any global whitelist term, we need to be extremely careful
  if (hasGlobalWhitelist) {
    // For whitelisted content, we need very strong evidence to flag it
    
    violationKeywords.forEach(keyword => {
      // Check if this is a contextual keyword (ends with :)
      const isContextualKeyword = keyword.endsWith(':');
      const cleanKeyword = isContextualKeyword ? keyword.slice(0, -1) : keyword;
      const lowerKeyword = cleanKeyword.toLowerCase();
      
      // For contextual keywords, only flag them if they appear with direct violation terms
      if (isContextualKeyword) {
        // Check if this contextual word appears with any direct violation term
        const directViolationTerms = violationKeywords.filter(k => !k.endsWith(':'));
        const hasViolationContext = directViolationTerms.some(violationTerm => 
          inputLower.includes(violationTerm.toLowerCase()) && inputLower.includes(lowerKeyword)
        );
        
        if (hasViolationContext && words.includes(lowerKeyword)) {
          exactMatches.push(cleanKeyword);
        }
      }
      // For direct violation keywords, process normally
      else if (words.includes(lowerKeyword)) {
        // Still consider context - is this a common word that might be used innocently?
        const isCommonWord = isCommonTerm(lowerKeyword);
        
        if (!isCommonWord) {
          exactMatches.push(keyword);
        } else {
          // For common words, check if they're used in a suspicious context
          const hasSuspiciousContext = checkSuspiciousContext(inputLower, lowerKeyword);
          if (hasSuspiciousContext) {
            exactMatches.push(keyword);
          }
        }
      } 
      // Check for partial matches (e.g., "ferrar" instead of "ferrari")
      else if (inputLower.includes(lowerKeyword) || 
              words.some(word => 
                word.includes(lowerKeyword) && 
                word.length > lowerKeyword.length * 0.75 && 
                !GLOBAL_WHITELIST.some(w => word.includes(w.toLowerCase()))
              )) {
        if (!isContextualKeyword) { // Don't add contextual keywords as partial matches
          partialMatches.push(keyword);
        }
      }
      // New check for case variations (like "AUD" or "AUDI" for "Audi")
      else {
        words.forEach(word => {
          // Check if the word is a case-insensitive match or contains the keyword
          if (!isContextualKeyword && (word.toLowerCase() === lowerKeyword.toLowerCase() || 
              (word.length >= 3 && lowerKeyword.toLowerCase().includes(word.toLowerCase())))) {
            exactMatches.push(keyword);
          }
        });
      }
    });
  } else {
    // Standard processing for non-whitelisted content
    violationKeywords.forEach(keyword => {
      // Check if this is a contextual keyword (ends with :)
      const isContextualKeyword = keyword.endsWith(':');
      const cleanKeyword = isContextualKeyword ? keyword.slice(0, -1) : keyword;
      const lowerKeyword = cleanKeyword.toLowerCase();
      
      // For contextual keywords, only flag them if they appear with direct violation terms
      if (isContextualKeyword) {
        const directViolationTerms = violationKeywords.filter(k => !k.endsWith(':'));
        const hasViolationContext = directViolationTerms.some(violationTerm => 
          inputLower.includes(violationTerm.toLowerCase()) && inputLower.includes(lowerKeyword)
        );
        
        if (hasViolationContext && words.some(word => word.toLowerCase() === lowerKeyword)) {
          exactMatches.push(cleanKeyword);
        }
      }
      // For direct violation keywords, process normally
      else {
        // Check for exact whole word matches or case variations
        if (words.some(word => word.toLowerCase() === lowerKeyword || 
            (word.length >= 3 && lowerKeyword === word.toLowerCase()))) {
          exactMatches.push(keyword);
        } 
        // Check for partial matches
        else if (inputLower.includes(lowerKeyword)) {
          // If it's a partial match, see if it's a significant portion of a word
          const partialMatchScore = getPartialMatchConfidence(inputLower, lowerKeyword);
          if (partialMatchScore > 0.8) {
            exactMatches.push(keyword);
          } else if (partialMatchScore > 0.6) {
            partialMatches.push(keyword);
          }
        }
        // Special case for car brands that might be in all caps or different cases
        else if (isCarBrand(keyword)) {
          const brandVariations = [
            keyword.toLowerCase(),
            keyword.toUpperCase(),
            keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase()
          ];
          
          if (brandVariations.some(variant => words.includes(variant) || inputLower.includes(variant))) {
            exactMatches.push(keyword);
          }
        }
      }
    });
  }
  
  return {
    exactMatches: [...new Set(exactMatches)],
    partialMatches: [...new Set(partialMatches)]
  };
};

// Helper function to check if a keyword is a car brand (common IP violation)
const isCarBrand = (term: string): boolean => {
  const commonCarBrands = ['audi', 'bmw', 'mercedes', 'ferrari', 'lamborghini', 'porsche', 'toyota', 'honda', 'ford'];
  return commonCarBrands.includes(term.toLowerCase());
};

// Helper function to determine if a term is commonly used in innocent contexts
const isCommonTerm = (term: string): boolean => {
  const commonTerms = ['school', 'young', 'child', 'children', 'kid', 'kids', 'teen', 'youth'];
  return commonTerms.includes(term.toLowerCase());
};

// Enhanced suspicious context check that uses the contextual patterns
const checkSuspiciousContext = (input: string, keyword: string): boolean => {
  // First check with predefined patterns
  const relevantPatterns = COC_CONTEXTUAL_PATTERNS.filter(pattern => 
    pattern.includes(keyword.toLowerCase())
  );
  
  // Check if any relevant pattern fully matches in the input
  const patternMatch = relevantPatterns.some(pattern => 
    pattern.every(term => input.includes(term))
  );
  
  if (patternMatch) return true;
  
  // Fallback to regex patterns for more complex detection
  const suspiciousPatterns = [
    /sex.*\b(school|young|child|kid|teen)\b/i,
    /\b(school|young|child|kid|teen)\b.*sex/i,
    /porn.*\b(school|young|child|kid|teen)\b/i,
    /\b(school|young|child|kid|teen)\b.*porn/i,
    /nude.*\b(school|young|child|kid|teen)\b/i,
    /\b(school|young|child|kid|teen)\b.*nude/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(input));
};

// Helper function to calculate confidence score for partial matches
const getPartialMatchConfidence = (input: string, keyword: string): number => {
  // Find the word containing the keyword
  const words = input.split(/\s+|[./-]|[^\w\s]/);
  const matchingWord = words.find(word => word.includes(keyword));
  
  if (!matchingWord) return 0;
  
  // Calculate how much of the matching word is covered by the keyword
  return keyword.length / matchingWord.length;
};

// Helper function to extract domain from URL
export const extractDomain = (url: string): string => {
  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    const domain = new URL(url).hostname.replace('www.', '');
    return domain;
  } catch (error) {
    // If parsing fails, return the original input
    // This handles cases where the input isn't a valid URL
    return url;
  }
};

// Helper function to determine severity class for UI
export const getSeverityClass = (severity?: string): string => {
  switch (severity) {
    case 'critical':
      return 'bg-red-500/20 border-red-500/30 text-red-500';
    case 'high':
      return 'bg-orange-500/20 border-orange-500/30 text-orange-500';
    case 'medium':
      return 'bg-amber-500/20 border-amber-500/30 text-amber-500';
    case 'low':
      return 'bg-blue-500/20 border-blue-500/30 text-blue-500';
    default:
      return 'bg-white/10 border-white/20 text-white';
  }
};
