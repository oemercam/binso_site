"use client"

export default function FeatureHighlights() {
  return (
    <section className="my-8 md:my-12 lg:my-16 -mx-4 md:-mx-6 lg:-mx-8">
      <div className="bg-gradient-to-b from-muted/30 via-muted/50 to-muted/30 py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Content */}
            <div className="space-y-4 md:space-y-6">
              <div className="inline-block">
                <span className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-[#7A7FEE]/10 text-[#7A7FEE] text-xs md:text-sm font-semibold">
                  Professionelle IT-Services
                </span>
              </div>
              
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white">
                Moderne IT-Lösungen für Ihr Business
              </h2>
              
              <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                Wir bieten umfassende IT-Dienstleistungen von Cloud-Infrastruktur und Cyber Security 
                bis zu Website-Entwicklung und IT-Outsourcing. Von der Beratung bis zur Umsetzung 
                begleiten wir Sie mit modernster Technologie und langjähriger Erfahrung.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-2 md:pt-4">
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7A7FEE]" />
                    <span className="text-sm md:text-base font-semibold text-black dark:text-white">Azure & M365</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 pl-4">
                    Cloud-Lösungen und moderne Arbeitsplätze
                  </p>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7A7FEE]" />
                    <span className="text-sm md:text-base font-semibold text-black dark:text-white">Cyber Security</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 pl-4">
                    Umfassender Schutz für Ihre IT-Infrastruktur
                  </p>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7A7FEE]" />
                    <span className="text-sm md:text-base font-semibold text-black dark:text-white">24/7 Support</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 pl-4">
                    Zuverlässiger IT-Support rund um die Uhr
                  </p>
                </div>
                
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7A7FEE]" />
                    <span className="text-sm md:text-base font-semibold text-black dark:text-white">IT-Outsourcing</span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 pl-4">
                    Qualifizierte Fachkräfte für Ihr Unternehmen
                  </p>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#7A7FEE]/10 via-background to-[#A855F7]/10 p-6 md:p-8 border border-[#7A7FEE]/20 overflow-hidden">
                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-30">
                  <svg width="100%" height="100%">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7A7FEE" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>

                {/* Main Content */}
                <div className="relative space-y-4 md:space-y-6">
                  {/* Workflow Cards */}
                  <div className="space-y-3 md:space-y-4">
                    {/* Card 1 - Input */}
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-[#7A7FEE]/30 shadow-lg transform translate-x-0 hover:translate-x-1 transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#A855F7] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-black dark:text-white">Anforderungsanalyse</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Ihre IT-Bedürfnisse</div>
                        </div>
                        <div className="animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-6 h-6 text-[#7A7FEE] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-[#7A7FEE]/30 shadow-lg transform translate-x-0 hover:translate-x-1 transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#7A7FEE] flex items-center justify-center shrink-0 relative">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          <div className="absolute inset-0 rounded-lg animate-ping bg-[#A855F7] opacity-20"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-black dark:text-white">IT-Umsetzung</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Professionelle Implementierung</div>
                        </div>
                        <div className="flex gap-1">
                          <div className="w-1.5 h-6 bg-[#7A7FEE] rounded animate-pulse" style={{animationDelay: '0s'}}></div>
                          <div className="w-1.5 h-6 bg-[#7A7FEE] rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1.5 h-6 bg-[#7A7FEE] rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <svg className="w-6 h-6 text-[#7A7FEE] animate-bounce" style={{animationDelay: '0.2s'}} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    {/* Card 3 - Output */}
                    <div className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-[#7A7FEE]/30 shadow-lg transform translate-x-0 hover:translate-x-1 transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7A7FEE] to-[#6366F1] flex items-center justify-center shrink-0">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-black dark:text-white">Erfolgreiche Lösung</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Optimierte IT-Infrastruktur</div>
                        </div>
                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium">Aktiv</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3 pt-3 md:pt-4">
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#7A7FEE]/20">
                      <div className="text-xl md:text-2xl font-bold text-[#7A7FEE]">85%</div>
                      <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Effizienz</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#7A7FEE]/20">
                      <div className="text-xl md:text-2xl font-bold text-[#A855F7]">24/7</div>
                      <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Uptime</div>
                    </div>
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#7A7FEE]/20">
                      <div className="text-xl md:text-2xl font-bold text-[#6366F1]">100%</div>
                      <div className="text-[10px] md:text-xs text-gray-600 dark:text-gray-400">Sicher</div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#7A7FEE] animate-ping opacity-40"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[#A855F7] animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
