/**
 * Rate Limiting Utility
 *
 * Provides IP-based rate limiting for form submissions and API endpoints.
 * Uses in-memory storage with automatic cleanup of expired entries.
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

// In-memory storage for rate limit records
const rateLimitStore = new Map<string, RateLimitRecord>()

// Cleanup interval to remove expired records (runs every 5 minutes)
const CLEANUP_INTERVAL = 5 * 60 * 1000

// Periodically clean up expired records to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of rateLimitStore.entries()) {
      if (record.resetAt < now) {
        rateLimitStore.delete(key)
      }
    }
  }, CLEANUP_INTERVAL)
}

/**
 * Check if a request should be rate limited
 *
 * @param identifier - Unique identifier for the rate limit (usually IP address)
 * @param limit - Maximum number of requests allowed in the time window (default: 5)
 * @param windowMs - Time window in milliseconds (default: 1 hour)
 * @returns Object with allowed status and remaining attempts
 */
export function checkRateLimit(
  identifier: string,
  limit = 5,
  windowMs = 3600000 // 1 hour default
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const record = rateLimitStore.get(identifier)

  // No record or expired - allow and create new record
  if (!record || record.resetAt < now) {
    const resetAt = now + windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return { allowed: true, remaining: limit - 1, resetAt }
  }

  // Check if limit exceeded
  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: record.resetAt }
  }

  // Increment count and allow
  record.count++
  return { allowed: true, remaining: limit - record.count, resetAt: record.resetAt }
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual override
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier)
}

/**
 * Get current rate limit status without incrementing
 */
export function getRateLimitStatus(
  identifier: string,
  limit = 5
): { remaining: number; resetAt: number | null } {
  const record = rateLimitStore.get(identifier)

  if (!record || record.resetAt < Date.now()) {
    return { remaining: limit, resetAt: null }
  }

  return {
    remaining: Math.max(0, limit - record.count),
    resetAt: record.resetAt,
  }
}

/**
 * Extract IP address from Next.js headers
 * Supports various proxy configurations
 */
export function getClientIP(headers: Headers): string {
  // Check common proxy headers
  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Take the first IP in the list (client IP)
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = headers.get('x-real-ip')
  if (realIP) {
    return realIP.trim()
  }

  // Fallback to a default identifier if no IP found
  return 'unknown'
}

/**
 * Validate request origin to prevent CSRF
 *
 * @param headers - Request headers
 * @param allowedOrigins - List of allowed origins (defaults to same-origin only)
 */
export function validateOrigin(
  headers: Headers,
  allowedOrigins?: string[]
): boolean {
  const origin = headers.get('origin')
  const referer = headers.get('referer')
  const host = headers.get('host')

  // If no origin/referer, allow (same-origin requests may not have these)
  if (!origin && !referer) {
    return true
  }

  // If allowedOrigins provided, check against the list
  if (allowedOrigins && allowedOrigins.length > 0) {
    if (origin && allowedOrigins.includes(origin)) {
      return true
    }
    if (referer) {
      const refererOrigin = new URL(referer).origin
      if (allowedOrigins.includes(refererOrigin)) {
        return true
      }
    }
    return false
  }

  // Default: validate same-origin
  if (origin) {
    const originHost = new URL(origin).host
    return originHost === host
  }

  if (referer) {
    const refererHost = new URL(referer).host
    return refererHost === host
  }

  return false
}
