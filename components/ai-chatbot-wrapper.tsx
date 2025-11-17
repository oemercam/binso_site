'use client'

import dynamic from 'next/dynamic'

const AIChatbot = dynamic(() => import('@/components/ai-chatbot'), {
  ssr: false,
  loading: () => null,
})

export function AIChatbotWrapper() {
  return <AIChatbot />
}
