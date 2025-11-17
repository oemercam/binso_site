/**
 * Custom Analytics Event Tracking
 */

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === "undefined") return

  // Vercel Analytics Custom Events
  if (window.va) {
    window.va("track", eventName, properties)
  }

  // Console log für Development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics Event]", eventName, properties)
  }
}

export const trackPageView = (url: string) => {
  trackEvent("pageview", { url })
}

export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent("form_submit", {
    form_name: formName,
    success,
  })
}

export const trackChatbotInteraction = (action: string) => {
  trackEvent("chatbot_interaction", {
    action,
  })
}

export const trackProjectView = (projectSlug: string) => {
  trackEvent("project_view", {
    project_slug: projectSlug,
  })
}

export const trackServiceClick = (serviceName: string) => {
  trackEvent("service_click", {
    service_name: serviceName,
  })
}

// TypeScript declarations für window.va
declare global {
  interface Window {
    va?: (command: string, ...args: any[]) => void
  }
}
