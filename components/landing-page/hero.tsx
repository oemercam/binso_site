import { createClient } from '@/lib/supabase/client'
import ContactFormButton from "./contact-form-button"

export default async function Hero() {
  const settings = {
    hero_title: 'IT-Dienstleistungen für',
    hero_title_highlight: 'Ihr Unternehmen',
    hero_subtitle: 'binso – Ihr zuverlässiger IT-Partner für Azure M365, Cyber Security, Cloud-Lösungen, Website-Entwicklung und IT-Outsourcing. Professionell, sicher, zukunftsorientiert.',
    hero_cta_primary_text: 'Jetzt Kontakt aufnehmen',
    hero_cta_primary_link: '/kontakt',
    hero_cta_secondary_text: 'Unsere Services',
    hero_cta_secondary_link: '#dienstleistungen'
  }

  return (
    <section 
      id="hero" 
      className="relative -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden"
      aria-label="Hero Bereich"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1200 600"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <linearGradient id="matrixGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#7A7FEE', stopOpacity: 0 }} />
              <stop offset="50%" style={{ stopColor: '#7A7FEE', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#A78BFA', stopOpacity: 0.3 }} />
            </linearGradient>
            <filter id="matrixGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Falling code columns */}
          {[...Array(24)].map((_, colIndex) => {
            const x = colIndex * 50
            const chars = ['0', '1', '{', '}', '<', '>', 'AI', 'fn', 'if', '==', '!=', '++', 'var', 'let', 'def', 'ML', 'API']
            const numChars = 8 + Math.floor(Math.random() * 4)
            const animDuration = 4 + Math.random() * 3
            const delay = Math.random() * 4
            
            return (
              <g key={`col-${colIndex}`}>
                {[...Array(numChars)].map((_, charIndex) => {
                  const char = chars[Math.floor(Math.random() * chars.length)]
                  const yStart = -50 - charIndex * 40
                  const fontSize = 16 + Math.random() * 8
                  
                  return (
                    <text
                      key={`char-${colIndex}-${charIndex}`}
                      x={x}
                      y={yStart}
                      fill={charIndex === 0 ? "#ffffff" : "url(#matrixGrad)"}
                      fontSize={fontSize}
                      fontFamily="monospace"
                      fontWeight={charIndex === 0 ? "bold" : "normal"}
                      opacity={charIndex === 0 ? 1 : 0.8 - charIndex * 0.1}
                      filter={charIndex === 0 ? "url(#matrixGlow)" : undefined}
                    >
                      {char}
                      <animate
                        attributeName="y"
                        from={yStart}
                        to={700}
                        dur={`${animDuration}s`}
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values={charIndex === 0 ? "1;1;0" : `${0.8 - charIndex * 0.1};${0.8 - charIndex * 0.1};0`}
                        dur={`${animDuration}s`}
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                      />
                    </text>
                  )
                })}
              </g>
            )
          })}

          {/* Glowing particles */}
          {[...Array(30)].map((_, i) => {
            const cx = Math.random() * 1200
            const cy = Math.random() * 600
            const r = 2 + Math.random() * 3
            const duration = 2 + Math.random() * 3
            
            return (
              <circle
                key={`particle-${i}`}
                cx={cx}
                cy={cy}
                r={r}
                fill="#7A7FEE"
                opacity="0.6"
                filter="url(#matrixGlow)"
              >
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="r"
                  values={`${r};${r + 2};${r}`}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                />
              </circle>
            )
          })}

          {/* Horizontal data streams */}
          {[...Array(7)].map((_, i) => {
            const y = 80 + i * 80
            const duration = 5 + Math.random() * 3
            
            return (
              <g key={`stream-${i}`}>
                <line
                  x1="-200"
                  y1={y}
                  x2="200"
                  y2={y}
                  stroke="#7A7FEE"
                  strokeWidth="2"
                  opacity="0.4"
                  strokeDasharray="10 5"
                >
                  <animate
                    attributeName="x1"
                    from="-200"
                    to="1400"
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="x2"
                    from="200"
                    to="1800"
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                  />
                </line>
                <circle cx="0" cy={y} r="4" fill="#ffffff" filter="url(#matrixGlow)">
                  <animate
                    attributeName="cx"
                    from="0"
                    to="1400"
                    dur={`${duration}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })}

          {/* Central AI icon */}
          <g opacity="0.12">
            <circle cx="700" cy="300" r="80" fill="none" stroke="#7A7FEE" strokeWidth="2">
              <animate attributeName="r" values="80;90;80" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="300" r="100" fill="none" stroke="#7A7FEE" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" values="100;110;100" dur="4s" repeatCount="indefinite" />
            </circle>
            <text x="700" y="320" fill="#7A7FEE" fontSize="56" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
              AI
            </text>
          </g>
        </svg>
      </div>

      <div className="container relative z-10 py-12 md:py-16 lg:py-20">
        <div className="flex flex-col md:flex-row items-start relative">
          <div className="w-full md:w-3/5 z-10">
            <h1 className="text-black dark:text-white text-[2rem] leading-[1.2] sm:text-4xl md:text-5xl lg:text-6xl font-medium sm:leading-tight">
              {settings.hero_title}
              <span className="block text-[#7A7FEE]">{settings.hero_title_highlight}</span>
            </h1>
            <p className="my-4 md:my-6 text-base sm:text-base md:text-base leading-relaxed max-w-md text-gray-700 dark:text-gray-300">
              {settings.hero_subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-3 md:gap-4" role="group" aria-label="Call-to-Action Buttons">
              <ContactFormButton />
              <a 
                href={settings.hero_cta_secondary_link || '#dienstleistungen'} 
                className="btn-secondary"
                aria-label="Unsere IT-Services entdecken"
              >
                {settings.hero_cta_secondary_text || 'Unsere Services'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
