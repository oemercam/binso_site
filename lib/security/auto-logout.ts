export class AutoLogoutManager {
  private timeoutId: NodeJS.Timeout | null = null
  private warningTimeoutId: NodeJS.Timeout | null = null
  private lastActivity: number = Date.now()
  private readonly TIMEOUT_MINUTES = 30
  private readonly WARNING_MINUTES = 5

  constructor(
    private onLogout: () => void,
    private onWarning?: (minutesLeft: number) => void,
  ) {
    this.startTracking()
  }

  private startTracking() {
    // Tracke Benutzer-Aktivität
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"]

    const updateActivity = () => {
      this.lastActivity = Date.now()
      this.resetTimers()
    }

    events.forEach((event) => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    this.resetTimers()
  }

  private resetTimers() {
    // Lösche bestehende Timer
    if (this.timeoutId) clearTimeout(this.timeoutId)
    if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId)

    // Setze Warning-Timer (5 Minuten vor Logout)
    const warningTime = (this.TIMEOUT_MINUTES - this.WARNING_MINUTES) * 60 * 1000
    this.warningTimeoutId = setTimeout(() => {
      if (this.onWarning) {
        this.onWarning(this.WARNING_MINUTES)
      }
    }, warningTime)

    // Setze Logout-Timer
    const logoutTime = this.TIMEOUT_MINUTES * 60 * 1000
    this.timeoutId = setTimeout(() => {
      this.onLogout()
    }, logoutTime)
  }

  public stop() {
    if (this.timeoutId) clearTimeout(this.timeoutId)
    if (this.warningTimeoutId) clearTimeout(this.warningTimeoutId)
  }

  public getTimeUntilLogout(): number {
    const elapsed = Date.now() - this.lastActivity
    const remaining = this.TIMEOUT_MINUTES * 60 * 1000 - elapsed
    return Math.max(0, Math.floor(remaining / 1000))
  }
}
