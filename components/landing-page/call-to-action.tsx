import ContactFormButton from "./contact-form-button"

export default function CallToAction() {
  return (
    <section id="contact" className="my-16 md:my-20 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="bg-[#7a7fee] py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content */}
          <div className="w-full md:w-3/5 z-10">
            <h2 className="text-white mb-4 md:mb-6 text-[1.75rem] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl font-medium sm:leading-tight">
              Bereit für die digitale <span className="text-white opacity-90">Transformation?</span>
            </h2>
            {/* Updated CTA Text */}
            <p className="my-4 md:my-6 text-base leading-relaxed max-w-md text-white/90">
              Lassen Sie uns gemeinsam herausfinden, wie professionelle IT-Services Ihr Unternehmen voranbringen können.
            </p>
            <p className="mb-5 md:mb-6 text-base leading-relaxed max-w-md text-white/90">
              Vereinbaren Sie jetzt ein kostenloses Erstgespräch – unverbindlich und ohne technisches Fachchinesisch.
            </p>
            <div>
              <ContactFormButton className="bg-white text-[#7a7fee] hover:bg-gray-100 px-8 py-3.5 rounded-full font-medium text-base transition-colors duration-200 inline-flex items-center gap-2 min-h-[44px]" />
            </div>
          </div>

          {/* Decorative circles for visual interest */}
          <div className="hidden md:block md:w-2/5 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
