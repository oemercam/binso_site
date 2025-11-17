/**
 * Sentry Error Tracking Setup (Optional)
 * Uncomment and configure when ready to deploy
 */

/*
import * as Sentry from "@sentry/nextjs"

export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
      
      beforeSend(event, hint) {
        // Filter out development errors
        if (process.env.NODE_ENV === 'development') {
          return null
        }
        return event
      },
      
      ignoreErrors: [
        // Browser extensions
        'top.GLOBALS',
        // Random plugins/extensions
        'originalCreateNotification',
        'canvas.contentDocument',
        'MyApp_RemoveAllHighlights',
        // Facebook borked
        'fb_xd_fragment',
        // Chrome extensions
        'chrome-extension://',
        'moz-extension://',
      ],
    })
  }
}

export function captureError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context,
    })
  } else {
    console.error('[Error]', error, context)
  }
}
*/

// Simple console error tracking for now
export function captureError(error: Error, context?: Record<string, any>) {
  console.error("[Error Tracking]", {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  })

  // TODO: Implement proper error logging to database
  // You can send this to an API endpoint that logs to Supabase
}
