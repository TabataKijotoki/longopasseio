// HomeScreen — hero map + brand identity
function HomeScreen({ onNavigate, onOpenCafe, mapImage, activeCityId, onChangeCity, onOpenCitySheet }) {
  const [hoveredCafe, setHoveredCafe] = React.useState(null);

  return (
    <div style={homeStyles.container}>
      {/* Header */}
      <div style={homeStyles.header}>
        <div>
          <p style={homeStyles.curadoria}>curadoria por Tabata Kijotoki</p>
          <h1 style={homeStyles.logo}>
            Longo <span style={homeStyles.logoAccent}>Passeio</span>
          </h1>
        </div>
        <div style={homeStyles.headerRight}>
          <CitySelectorPill activeCityId={activeCityId} onOpen={onOpenCitySheet} />
        </div>
      </div>

      {/* Hero phrase */}
      <div style={homeStyles.heroPhraseWrap}>
        <p style={homeStyles.heroPhrase}>
          <em>...o mundo além</em><br />
          do seu quintal
        </p>
      </div>

      {/* Hero card — explorar CTA */}
      <div style={homeStyles.heroCard} onClick={() => onNavigate("explorar")}>
        {/* Bairro color strips */}
        <div style={homeStyles.heroStrips}>
          {[
            { color: "#c8d8b0" },
            { color: "#f2c4c4" },
            { color: "#b8d4c8" },
            { color: "#e8d8b0" },
            { color: "#b8d4b8" },
            { color: "#d0c4e8" },
          ].map((b, i) => (
            <div key={i} style={{ ...homeStyles.heroStrip, background: b.color }}></div>
          ))}
        </div>
        <div style={homeStyles.heroCardBody}>
          <p style={homeStyles.heroCardEyebrow}>19 cafés curados · 6 bairros</p>
          <p style={homeStyles.heroCardTitle}>o centro que<br /><em>nem todo mundo vê</em></p>
          <div style={homeStyles.heroCardCTA}>
            <span style={homeStyles.heroCardCTAText}>explorar cafés</span>
            <span style={homeStyles.heroCardArrow}>→</span>
          </div>
        </div>
      </div>

      {/* Bairros quick nav */}
      <div style={homeStyles.bairrosSection}>
        <p style={homeStyles.sectionLabel}>bairros</p>
        <div style={homeStyles.bairrosRow}>
          {[
            { name: "Santa Cecília",  color: "#c8d8b0", text: "#4a6a30" },
            { name: "Vila Buarque",   color: "#f2c4c4", text: "#8a3a3a" },
            { name: "Higienópolis",   color: "#b8d4c8", text: "#2a5a48" },
            { name: "República",      color: "#e8d8b0", text: "#7a5a20" },
            { name: "Barra Funda",    color: "#b8d4b8", text: "#2a5a30" },
            { name: "Campos Elíseos", color: "#d0c4e8", text: "#5a4a8a" },
          ].map(b => (
            <button
              key={b.name}
              style={{ ...homeStyles.bairroChip, background: b.color, color: b.text }}
              onClick={() => onNavigate("explorar", { bairro: b.name })}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Featured strip */}
      <div style={homeStyles.featuredSection}>
        <div style={homeStyles.featuredHeader}>
          <p style={homeStyles.sectionLabel}>hoje a gente sugere</p>
          <button style={homeStyles.verTodos} onClick={() => onNavigate("roteiros")}>
            ver roteiros →
          </button>
        </div>
        <div style={homeStyles.featuredCard} onClick={() => onNavigate("roteiros")}>
          <div style={homeStyles.featuredCardInner}>
            <span style={homeStyles.featuredEmoji}>☀️</span>
            <div>
              <p style={homeStyles.featuredTitle}>Tarde de Descoberta</p>
              <p style={homeStyles.featuredSub}>3 cafés · 4–5 horas · de bairro em bairro</p>
            </div>
          </div>
          <span style={homeStyles.featuredArrow}>→</span>
        </div>
      </div>

      {/* Dica de ouro */}
      <div style={homeStyles.dicaBox}>
        <span style={homeStyles.dicaStar}>★</span>
        <p style={homeStyles.dicaText}>
          <strong>dica de ouro:</strong> vá sem pressa, peça um bom café e se perca (só um pouquinho).
        </p>
      </div>
    </div>
  );
}

const homeStyles = {
  container: {
    flex: 1, overflowY: "auto", background: "#faf7f2",
    paddingBottom: 80,
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "20px 20px 8px",
  },
  curadoria: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.1em",
    color: "#aaa", margin: "0 0 2px",
  },
  logo: {
    fontFamily: "'DM Serif Display', serif", fontSize: 28,
    color: "#2a1f14", margin: 0, lineHeight: 1.1,
  },
  logoAccent: { fontStyle: "italic" },
  headerRight: { paddingTop: 8 },
  pill: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    background: "#2a1f14", color: "#faf7f2",
    padding: "4px 12px", borderRadius: 20,
    letterSpacing: "0.05em",
  },
  heroPhraseWrap: { padding: "12px 20px 16px" },
  heroPhrase: {
    fontFamily: "'DM Serif Display', serif", fontSize: 32,
    color: "#2a1f14", margin: "0 0 4px", lineHeight: 1.15,
  },
  heroSub: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#9a8878", margin: 0, fontStyle: "italic",
  },
  heroCard: {
    margin: "0 20px", borderRadius: 16, overflow: "hidden",
    cursor: "pointer", border: "1.5px solid #e8e0d4",
    boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
    background: "#fff",
  },
  heroStrips: { display: "flex", height: 8 },
  heroStrip: { flex: 1 },
  heroCardBody: { padding: "20px 20px 18px" },
  heroCardEyebrow: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "#aaa", margin: "0 0 8px",
  },
  heroCardTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 26,
    color: "#2a1f14", margin: "0 0 18px", lineHeight: 1.2,
  },
  heroCardCTA: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 14px", background: "#2a1f14", borderRadius: 10,
  },
  heroCardCTAText: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#faf7f2", fontWeight: 600, letterSpacing: "0.04em",
  },
  heroCardArrow: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#faf7f2",
  },
  bairrosSection: { padding: "20px 20px 0" },
  sectionLabel: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.12em",
    color: "#aaa", margin: "0 0 10px",
  },
  bairrosRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  bairroChip: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
    border: "none", borderRadius: 20, padding: "7px 14px",
    cursor: "pointer", letterSpacing: "0.03em",
  },
  featuredSection: { padding: "20px 20px 0" },
  featuredHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 10,
  },
  verTodos: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#9a8878", background: "none", border: "none",
    cursor: "pointer",
  },
  featuredCard: {
    background: "#fff", borderRadius: 14, padding: "14px 16px",
    border: "1.5px solid #e8e0d4", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  featuredCardInner: { display: "flex", alignItems: "center", gap: 12 },
  featuredEmoji: { fontSize: 28 },
  featuredTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 16,
    color: "#2a1f14", margin: "0 0 2px",
  },
  featuredSub: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#9a8878", margin: 0,
  },
  featuredArrow: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 18,
    color: "#ccc",
  },
  dicaBox: {
    margin: "20px", background: "#f5f0e6",
    borderRadius: 14, padding: "14px 16px",
    border: "1.5px solid #e8d8b0",
    display: "flex", gap: 10, alignItems: "flex-start",
  },
  dicaStar: { fontSize: 16, color: "#c8a84a", flexShrink: 0, marginTop: 1 },
  dicaText: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#5a4a30", margin: 0, lineHeight: 1.55,
  },
};

Object.assign(window, { HomeScreen });
