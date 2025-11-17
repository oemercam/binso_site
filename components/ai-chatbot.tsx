"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const knowledgeBase = {
  greetings: [
    "Hallo! Ich bin der Binso KI-Assistent. Wie kann ich Ihnen heute helfen?",
    "Willkommen bei Binso! Ich beantworte gerne Ihre Fragen zu unseren KI-Lösungen und Services.",
  ],
  services: [
    "Wir bieten umfassende KI-Dienstleistungen an:",
    "• KI-Chatbot Entwicklung",
    "• Workflow Automatisierung",
    "• Custom AI Lösungen",
    "• Datenanalyse & Insights",
    "• API Integration",
    "• KI-Beratung & Strategie",
    "\nMöchten Sie mehr über einen bestimmten Service erfahren?",
  ],
  chatbot: [
    "Unsere KI-Chatbots sind intelligent, mehrsprachig und rund um die Uhr verfügbar.",
    "Sie können Kundenanfragen automatisch beantworten, Termine buchen und vieles mehr.",
    "Interesse? Kontaktieren Sie uns für eine kostenlose Demo!",
  ],
  automation: [
    "Mit unseren Automatisierungslösungen optimieren wir Ihre Geschäftsprozesse.",
    "Von E-Mail-Automatisierung bis zu komplexen Workflow-Integrationen.",
    "Wir analysieren Ihre Prozesse und implementieren massgeschneiderte Lösungen.",
  ],
  pricing: [
    "Unsere Preise richten sich nach dem Projektumfang.",
    "Wir bieten flexible Abrechnungsmodelle: Festpreis, Zeit & Material oder Retainer.",
    "Kontaktieren Sie uns für ein unverbindliches Angebot!",
  ],
  contact: [
    "Sie erreichen uns über mehrere Kanäle:",
    "📧 E-Mail: info@binso.ch",
    "📱 Telefon: +41 79 261 95 87",
    "💬 WhatsApp Business: +90 530 910 37 08",
    "🔗 LinkedIn: Binso GmbH",
    "📅 Oder buchen Sie direkt ein Meeting!",
  ],
  default: [
    "Das ist eine interessante Frage! Für detaillierte Informationen empfehle ich:",
    "• Ein persönliches Gespräch mit unserem Team",
    "• Eine E-Mail an info@binso.ch",
    "• Oder buchen Sie direkt ein kostenloses Erstgespräch",
    "\nWas möchten Sie tun?",
  ],
}

const quickReplies = [
  "Welche Services bietet ihr an?",
  "Was kostet ein KI-Chatbot?",
  "Wie kann ich euch kontaktieren?",
  "Zeigt mir eure Projekte",
]

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage("Hallo! Ich bin der Binso KI-Assistent. Wie kann ich Ihnen heute helfen?")
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const getAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error("No response reader")
      }

      const decoder = new TextDecoder()
      let fullText = ""

      const botMessageId = Date.now().toString()
      const initialMessage: Message = {
        id: botMessageId,
        text: "",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, initialMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }

        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk

        setMessages((prev) => prev.map((msg) => (msg.id === botMessageId ? { ...msg, text: fullText } : msg)))
      }

      if (!fullText) {
        throw new Error("No response text received")
      }
    } catch (error) {
      console.error("Error fetching AI response:", error)
      addBotMessage(
        "Entschuldigung, es gab einen Fehler. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter info@binso.ch oder +41 79 261 95 87.",
      )
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    const messageToSend = inputValue
    setInputValue("")

    setIsTyping(true)
    await getAIResponse(messageToSend)
    setIsTyping(false)
  }

  const handleQuickReply = async (reply: string) => {
    addUserMessage(reply)
    setIsTyping(true)
    await getAIResponse(reply)
    setIsTyping(false)
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-[#7A7FEE] text-white rounded-full p-4 shadow-lg hover:bg-[#6B70DD] transition-all duration-300 hover:scale-110 group"
          aria-label="Chat öffnen"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[600px] bg-white dark:bg-[#1a1b1e] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
          <div className="bg-gradient-to-r from-[#7A7FEE] to-[#6B70DD] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Binso KI-Assistent</h3>
                <p className="text-xs text-white/80">Immer für Sie da</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Chat schliessen"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#272829]">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "bot" ? "bg-[#7A7FEE]" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {message.sender === "bot" ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      message.sender === "bot"
                        ? "bg-white dark:bg-[#1a1b1e] text-gray-900 dark:text-gray-100"
                        : "bg-[#7A7FEE] text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#7A7FEE]">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-[#1a1b1e] rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {messages.length <= 2 && !isTyping && (
              <div className="space-y-2 pt-2">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Schnellantworten:</p>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="w-full text-left text-sm bg-white dark:bg-[#1a1b1e] hover:bg-gray-50 dark:hover:bg-[#2a2b2e] text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 transition-colors border border-gray-200 dark:border-gray-700"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a1b1e]">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ihre Nachricht..."
                className="flex-1 bg-gray-100 dark:bg-[#272829] text-gray-900 dark:text-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7A7FEE]"
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-[#7A7FEE] hover:bg-[#6B70DD] text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
