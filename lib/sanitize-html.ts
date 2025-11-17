/**
 * Sanitize HTML content to prevent XSS attacks
 * Removes dangerous tags and attributes while preserving safe formatting
 */
export function sanitizeHTML(html: string): string {
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")

  // Remove event handlers (onclick, onerror, etc.)
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "")
  sanitized = sanitized.replace(/\s*on\w+\s*=\s*[^\s>]*/gi, "")

  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, "")

  // Remove data: URLs (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, "")

  // Remove iframe tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")

  // Remove object and embed tags
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")

  // Remove form tags
  sanitized = sanitized.replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "")

  // Remove meta tags
  sanitized = sanitized.replace(/<meta\b[^>]*>/gi, "")

  // Remove link tags (except for relative links)
  sanitized = sanitized.replace(/<link\b[^>]*>/gi, "")

  // Remove base tags
  sanitized = sanitized.replace(/<base\b[^>]*>/gi, "")

  // Remove style tags with javascript
  sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, (match) => {
    if (/javascript|expression|behavior|import/i.test(match)) {
      return ""
    }
    return match
  })

  return sanitized
}

/**
 * Strict sanitization for user-generated content
 * Only allows basic formatting tags
 */
export function sanitizeUserHTML(html: string): string {
  // First apply basic sanitization
  let sanitized = sanitizeHTML(html)

  // Define allowed tags
  const allowedTags = [
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "a",
    "blockquote",
    "code",
    "pre",
  ]

  // Remove all tags except allowed ones
  sanitized = sanitized.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, (match, tag) => {
    if (allowedTags.includes(tag.toLowerCase())) {
      // For anchor tags, ensure href is safe
      if (tag.toLowerCase() === "a") {
        return match.replace(/href\s*=\s*["']([^"']*)["']/gi, (m, url) => {
          // Only allow http, https, and relative URLs
          if (/^(https?:\/\/|\/)/i.test(url)) {
            return `href="${url}" rel="noopener noreferrer" target="_blank"`
          }
          return ""
        })
      }
      return match
    }
    return ""
  })

  return sanitized
}
