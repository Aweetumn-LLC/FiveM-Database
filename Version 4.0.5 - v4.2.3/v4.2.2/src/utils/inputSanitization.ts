/**
 * Utility functions for sanitizing user inputs to prevent XSS attacks and other vulnerabilities.
 */

export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  // Remove potential XSS patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>'"&]/g, (match) => {
      const entityMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return entityMap[match] || match;
    })
    .replace(/[\x00-\x1F\x7F-\x9F]/g, '') // Remove control characters
    .trim()
    .slice(0, 1000); // Limit length
};

export const sanitizeSearchQuery = (query: string): string => {
  if (!query || typeof query !== 'string') return '';

  // Remove potentially harmful characters and limit length
  return query
    .replace(/[<>'"&;]/g, '') // Remove XSS characters
    .trim()
    .slice(0, 255); // Limit length for search queries
};

export const sanitizeDescription = (description: string): string => {
  if (!description || typeof description !== 'string') return '';

  return description
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/[<>'"&]/g, (match) => {
      const entityMap: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '&': '&amp;'
      };
      return entityMap[match] || match;
    })
    .trim()
    .slice(0, 5000); // Limit description length
};
