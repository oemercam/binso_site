"use client"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Offline</h1>
        <p className="text-muted-foreground mb-6">
          Sie sind momentan offline. Bitte überprüfen Sie Ihre Internetverbindung.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Erneut versuchen
        </button>
      </div>
    </div>
  )
}
