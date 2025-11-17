/**
 * Application configuration based on environment
 * Provides type-safe access to environment variables and environment-specific settings
 */

export type Environment = 'development' | 'staging' | 'production'

export const getEnvironment = (): Environment => {
  const env = process.env.NODE_ENV
  const vercelEnv = process.env.VERCEL_ENV

  // In Vercel, use VERCEL_ENV for more granular control
  if (vercelEnv === 'production') return 'production'
  if (vercelEnv === 'preview') return 'staging'
  
  // Fallback to NODE_ENV
  if (env === 'production') return 'production'
  if (env === 'test') return 'staging'
  
  return 'development'
}

export const isDevelopment = () => getEnvironment() === 'development'
export const isStaging = () => getEnvironment() === 'staging'
export const isProduction = () => getEnvironment() === 'production'

interface AppConfig {
  env: Environment
  isDev: boolean
  isStaging: boolean
  isProd: boolean
  
  // App URLs
  appUrl: string
  apiUrl: string
  
  // Features
  features: {
    analytics: boolean
    errorReporting: boolean
    demoLogin: boolean
    debugMode: boolean
    maintenanceMode: boolean
  }
  
  // API Configuration
  api: {
    timeout: number
    retryAttempts: number
  }
  
  // Security
  security: {
    enableRateLimiting: boolean
    strictCsp: boolean
  }
  
  // Logging
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error'
    enableConsole: boolean
  }
}

export const config: AppConfig = {
  env: getEnvironment(),
  isDev: isDevelopment(),
  isStaging: isStaging(),
  isProd: isProduction(),
  
  // App URLs - dynamically determined
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 
    (isProduction() ? 'https://binso.ch' : 
     isStaging() ? process.env.VERCEL_URL || 'https://staging.binso.ch' : 
     'http://localhost:3000'),
  
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 
    (isProduction() ? 'https://binso.ch/api' : 
     isStaging() ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : 'https://staging.binso.ch/api') : 
     'http://localhost:3000/api'),
  
  // Feature flags per environment
  features: {
    analytics: isProduction() || isStaging(),
    errorReporting: isProduction() || isStaging(),
    demoLogin: !isProduction(), // Only in dev and staging
    debugMode: isDevelopment(),
    maintenanceMode: process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true',
  },
  
  // API Configuration
  api: {
    timeout: isDevelopment() ? 30000 : 10000, // 30s dev, 10s prod
    retryAttempts: isDevelopment() ? 1 : 3,
  },
  
  // Security settings
  security: {
    enableRateLimiting: !isDevelopment(),
    strictCsp: isProduction(),
  },
  
  // Logging configuration
  logging: {
    level: isDevelopment() ? 'debug' : isProduction() ? 'error' : 'info',
    enableConsole: !isProduction(),
  },
}

/**
 * Get a required environment variable
 * Throws error if not found (only in production)
 */
export const getRequiredEnv = (key: string): string => {
  const value = process.env[key]
  
  if (!value && isProduction()) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  
  return value || ''
}

/**
 * Get an optional environment variable with a default
 */
export const getOptionalEnv = (key: string, defaultValue: string = ''): string => {
  return process.env[key] || defaultValue
}

/**
 * Check if feature is enabled
 */
export const isFeatureEnabled = (feature: keyof typeof config.features): boolean => {
  return config.features[feature]
}

/**
 * Log with environment-aware level
 */
export const log = {
  debug: (...args: any[]) => {
    if (config.logging.level === 'debug' && config.logging.enableConsole) {
      console.log('[DEBUG]', ...args)
    }
  },
  info: (...args: any[]) => {
    if (['debug', 'info'].includes(config.logging.level) && config.logging.enableConsole) {
      console.info('[INFO]', ...args)
    }
  },
  warn: (...args: any[]) => {
    if (['debug', 'info', 'warn'].includes(config.logging.level) && config.logging.enableConsole) {
      console.warn('[WARN]', ...args)
    }
  },
  error: (...args: any[]) => {
    if (config.logging.enableConsole) {
      console.error('[ERROR]', ...args)
    }
  },
}

export default config
