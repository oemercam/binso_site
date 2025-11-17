// Session Manager für alle Admin-Seiten
class AdminSessionManager {
  constructor() {
    this.CHECK_INTERVAL = 60000 // Prüfe jede Minute
    this.WARNING_SHOWN = false
    this.init()
  }

  init() {
    this.startSessionCheck()
    this.setupActivityTracking()
    this.setupWarningModal()
  }

  startSessionCheck() {
    // Prüfe Session-Status regelmäßig
    setInterval(() => this.checkSession(), this.CHECK_INTERVAL)
  }

  async checkSession() {
    try {
      const {
        data: { session },
      } = await window.supabase.auth.getSession()

      if (!session) {
        this.handleLogout("Session abgelaufen")
        return
      }

      // Prüfe ob Session bald abläuft
      const expiresAt = new Date(session.expires_at * 1000)
      const now = new Date()
      const minutesLeft = (expiresAt - now) / 1000 / 60

      if (minutesLeft < 5 && !this.WARNING_SHOWN) {
        this.showWarning(Math.floor(minutesLeft))
      }
    } catch (error) {
      console.error("[v0] Session check failed:", error)
    }
  }

  setupActivityTracking() {
    let activityTimeout
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"]

    const updateActivity = () => {
      clearTimeout(activityTimeout)
      this.WARNING_SHOWN = false
      this.hideWarning()

      // Refresh Supabase Session
      window.supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // Session wird automatisch von Supabase verlängert
        }
      })
    }

    events.forEach((event) => {
      document.addEventListener(event, updateActivity, { passive: true })
    })
  }

  setupWarningModal() {
    const modal = document.createElement("div")
    modal.id = "session-warning-modal"
    modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"
    modal.innerHTML = `
      <div class="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 class="text-xl font-bold mb-2">⚠️ Session läuft ab</h3>
        <p class="text-gray-600 mb-4">
          Ihre Session läuft in <span id="minutes-left"></span> Minuten ab.
          Bewegen Sie die Maus oder klicken Sie, um die Session zu verlängern.
        </p>
        <button onclick="document.getElementById('session-warning-modal').classList.add('hidden')" 
                class="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
          Verstanden
        </button>
      </div>
    `
    document.body.appendChild(modal)
  }

  showWarning(minutesLeft) {
    this.WARNING_SHOWN = true
    const modal = document.getElementById("session-warning-modal")
    const minutesSpan = document.getElementById("minutes-left")

    if (modal && minutesSpan) {
      minutesSpan.textContent = minutesLeft
      modal.classList.remove("hidden")
    }
  }

  hideWarning() {
    const modal = document.getElementById("session-warning-modal")
    if (modal) {
      modal.classList.add("hidden")
    }
  }

  handleLogout(reason) {
    console.log("[v0] Auto-Logout:", reason)
    window.supabase.auth.signOut().then(() => {
      window.location.href = "/admin/login?reason=" + encodeURIComponent(reason)
    })
  }
}

// Initialisiere Session Manager wenn Seite geladen ist
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new AdminSessionManager()
  })
} else {
  new AdminSessionManager()
}
