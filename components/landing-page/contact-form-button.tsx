"use client"

import type React from "react"

interface ContactFormButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function ContactFormButton({ className = "", children }: ContactFormButtonProps) {
  const bookingUrl = "https://outlook.office.com/bookwithme/user/6db7a69533a14cc4b119a0532f93fb77@binso.ch/meetingtype/R9jo1MFu0UShYzPR9_WyzA2?anonymous"
  
  return (
    <a 
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className || "btn-primary"}
    >
      {children || "Erstgespräch vereinbaren"}
    </a>
  )
}
