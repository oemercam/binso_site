export default function AdminDashboard() {
  return (
    <html>
      <head>
        <title>Binso Admin Dashboard</title>
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#f3f4f6" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#111", margin: 0 }}>Binso Admin Dashboard</h1>
            <p style={{ marginTop: "8px", color: "#666" }}>Webseiten-Verwaltung</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <a
              href="/admin/dashboard/portfolio"
              style={{
                display: "block",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111", margin: 0 }}>📁 Portfolio</h3>
              <p style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>Projekte verwalten</p>
            </a>

            <a
              href="/admin/dashboard/services"
              style={{
                display: "block",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111", margin: 0 }}>⚙️ Dienstleistungen</h3>
              <p style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>Services bearbeiten</p>
            </a>

            <a
              href="/admin/dashboard/contacts"
              style={{
                display: "block",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111", margin: 0 }}>📧 Kontakte</h3>
              <p style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>Anfragen ansehen</p>
            </a>

            <a
              href="/admin/dashboard/faqs"
              style={{
                display: "block",
                backgroundColor: "white",
                padding: "24px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textDecoration: "none",
                border: "1px solid #e5e7eb",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#111", margin: 0 }}>❓ FAQs</h3>
              <p style={{ marginTop: "8px", color: "#666", fontSize: "14px" }}>Fragen verwalten</p>
            </a>
          </div>

          <div style={{ marginTop: "40px" }}>
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#4f46e5",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              ← Zurück zur Webseite
            </a>
            <a
              href="/admin/login"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                marginLeft: "16px",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Abmelden
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
