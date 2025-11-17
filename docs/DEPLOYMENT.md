# Deployment Guide

This document outlines the deployment process for different environments.

## Environments

### Development
- **URL**: http://localhost:3000
- **Purpose**: Local development and testing
- **Features**: 
  - Debug mode enabled
  - Demo login available
  - Extended API timeouts
  - Console logging enabled
  - No rate limiting

### Staging
- **URL**: https://staging.automaticai.ch (or Vercel preview URLs)
- **Purpose**: Pre-production testing and client reviews
- **Features**:
  - Analytics enabled
  - Error reporting enabled
  - Demo login available
  - Rate limiting enabled
  - Info-level logging

### Production
- **URL**: https://automaticai.ch
- **Purpose**: Live production environment
- **Features**:
  - All security features enabled
  - Analytics and error reporting
  - No demo login
  - Strict CSP
  - Error-level logging only

## Environment Variables

### Required for All Environments
\`\`\`bash
SUPABASE_URL
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_ANON_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
POSTGRES_URL
\`\`\`

### Production-Specific
\`\`\`bash
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
SENTRY_DSN
NEXT_PUBLIC_SENTRY_DSN
\`\`\`

### Development-Specific
\`\`\`bash
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

## Deployment Checklist

### Before Deploying to Staging
- [ ] All tests passing
- [ ] Code reviewed
- [ ] Environment variables configured in Vercel
- [ ] Database migrations executed
- [ ] RLS policies verified

### Before Deploying to Production
- [ ] Tested thoroughly in staging
- [ ] Client approval received
- [ ] Backup database
- [ ] Update DNS if needed
- [ ] Disable demo login (automatic)
- [ ] Enable analytics
- [ ] Configure error reporting
- [ ] Update monitoring alerts
- [ ] Prepare rollback plan

### Post-Deployment
- [ ] Verify all pages load
- [ ] Test critical user flows
- [ ] Check error rates in Sentry
- [ ] Monitor performance metrics
- [ ] Verify analytics tracking
- [ ] Test contact form
- [ ] Verify admin login

## Rolling Back

If issues occur in production:

1. **Immediate**: Use Vercel dashboard to rollback to previous deployment
2. **Database**: Restore from backup if schema changed
3. **Monitor**: Check error rates return to normal
4. **Investigate**: Review logs and fix issues
5. **Redeploy**: After fixes, follow deployment checklist again

## Environment-Specific Configuration

The app automatically adapts based on the environment using `lib/config.ts`:

\`\`\`typescript
import { config, isProduction } from '@/lib/config'

// Check environment
if (config.isDev) {
  // Development-only code
}

// Check feature flags
if (config.features.analytics) {
  // Analytics code
}

// Use environment-aware logging
import { log } from '@/lib/config'
log.debug('Debug message') // Only in development
log.error('Error message') // Always logged
\`\`\`

## Monitoring

### Development
- Console logs in browser
- Next.js dev server output

### Staging
- Vercel deployment logs
- Browser console (info level)
- Supabase logs

### Production
- Vercel Analytics
- Sentry error tracking
- Supabase monitoring
- Custom audit logs in database

## Support

For deployment issues, contact:
- **Development**: Check this documentation and logs
- **Urgent Production Issues**: Create incident ticket
- **General Questions**: Team Slack channel
