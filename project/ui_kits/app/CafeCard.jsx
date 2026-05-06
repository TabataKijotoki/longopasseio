// CafeCard — detail modal/sheet with Google Maps embed

// Curated Unsplash photos — stable IDs, each matched to the café's vibe
const CAFE_PHOTOS = {
  1:  "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&q=80", // FFV — vintage/film
  2:  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", // Zud — minimalist bar
  3:  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", // Fioca — cozy corner
  4:  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80", // Aresta — specialty
  5:  "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&q=80", // Sofá — plants/couch
  6:  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", // Takkø — design
  7:  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80", // Lógico — art
  8:  "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", // Mug.SP — neighbourhood
  9:  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80", // Biblioteca — books
  10: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80", // Cozinha Matilde — homey
  11: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=800&q=80", // Santa Clara — bright
  12: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // Café Hotel — historic
  13: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80", // Casa Café — garden
  14: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=800&q=80", // Sterna — methods
  15: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80", // Coa — intimate
  16: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80", // Na Fila do Pão — bakery bread
  17: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80", // Café Colombiano — warm
  18: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", // Corada — sidewalk
  19: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80", // Livraria — books
};

function CafeHeroPhoto({ cafe, bc }) {
  const [error, setError] = React.useState(false);
  const src = CAFE_PHOTOS[cafe.id];

  if (!src || error) {
    return (
      <div style={{
        width: "100%", height: "100%",
        background: `linear-gradient(135deg, ${bc.border} 0%, ${bc.bg} 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 48, opacity: 0.35 }}>☕</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={cafe.name}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      onError={() => setError(true)}
    />
  );
}

const TAG_LABELS = {
  trabalhar: { label: "trabalhar" },
  encontro:  { label: "encontro" },
  leitura:   { label: "leitura" },
  especialidade: { label: "especialidade" },
};

const BAIRRO_COLORS = {
  "Santa Cecília":  { bg: "#e8f0dc", text: "#4a6a30", border: "#c8d8b0" },
  "Vila Buarque":   { bg: "#fce8e8", text: "#8a3a3a", border: "#f2c4c4" },
  "Higienópolis":   { bg: "#dceee8", text: "#2a5a48", border: "#b8d4c8" },
  "República":      { bg: "#f4eddc", text: "#7a5a20", border: "#e8d8b0" },
  "Barra Funda":    { bg: "#dceedd", text: "#2a5a30", border: "#b8d4b8" },
  "Campos Elíseos": { bg: "#ece8f8", text: "#5a4a8a", border: "#d0c4e8" },
};

function CafeCard({ cafe, onClose, onToggleFavorite, isFavorite, recentVariant = "broto" }) {
  if (!cafe) return null;
  const bc = BAIRRO_COLORS[cafe.bairro] || { bg: "#f5f0e8", text: "#555", border: "#ddd" };

  // Build Google Maps URLs
  const query = encodeURIComponent(`${cafe.name}, ${cafe.address}, São Paulo`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  // Static map embed URL (no API key needed for iframe embed)
  const embedUrl = `https://maps.google.com/maps?q=${query}&z=16&output=embed&hl=pt-BR`;

  return (
    <div style={cafeCardStyles.overlay} onClick={onClose}>
      <div style={cafeCardStyles.sheet} onClick={e => e.stopPropagation()}>

        {/* Hero photo with gradient overlay */}
        <div style={cafeCardStyles.heroWrap}>
          <CafeHeroPhoto cafe={cafe} bc={bc} />
          {/* Gradient overlay — dark at bottom for text legibility */}
          <div style={cafeCardStyles.heroGradient}></div>

          {/* Handle on top of photo */}
          <div style={cafeCardStyles.handlePhoto}></div>

          {/* Fav button top-right */}
          <button
            style={{ ...cafeCardStyles.favBtnPhoto, color: isFavorite ? "#e05a5a" : "rgba(255,255,255,0.8)" }}
            onClick={() => onToggleFavorite(cafe.id)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>

          {/* Name + info over photo */}
          <div style={cafeCardStyles.heroText}>
            <div style={{ ...cafeCardStyles.bairroTagPhoto, background: bc.border + "cc", color: bc.text }}>
              {cafe.bairro}
            </div>
            <h2 style={cafeCardStyles.cafeNamePhoto}>{cafe.name}</h2>
            <p style={cafeCardStyles.addressPhoto}>{cafe.address}, São Paulo</p>
            {/* Tags */}
            <div style={cafeCardStyles.tagsRowPhoto}>
              {cafe.tags.map(t => (
                <span key={t} style={cafeCardStyles.tagPhoto}>
                  {TAG_LABELS[t]?.label || t}
                </span>
              ))}
              {cafe.petFriendly && (
                <span style={cafeCardStyles.tagPhoto}>pet friendly</span>
              )}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={cafeCardStyles.body}>
          {/* Vibe + description */}
          <p style={cafeCardStyles.vibe}>"{cafe.vibe}"</p>
          {isRecentlyUpdated(cafe.updatedAt) && (
            <div style={{ margin: "0 0 10px" }}>
              <RecentDetailPill updatedAt={cafe.updatedAt} variant={recentVariant} />
            </div>
          )}
          <p style={cafeCardStyles.description}>{cafe.description}</p>

          {/* Horário */}
          <div style={cafeCardStyles.infoRow}>
            <span style={cafeCardStyles.infoLabel}>horário</span>
            <span style={cafeCardStyles.infoValue}>{cafe.horario}</span>
          </div>

          {/* Google Maps embed */}
          <div style={cafeCardStyles.mapSection}>
            <div style={cafeCardStyles.mapLabelRow}>
              <span style={cafeCardStyles.mapLabel}>como chegar</span>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={cafeCardStyles.mapsLink}
              >
                abrir no Maps →
              </a>
            </div>
            <div style={cafeCardStyles.mapFrame}>
              <iframe
                src={embedUrl}
                style={cafeCardStyles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa — ${cafe.name}`}
                sandbox="allow-scripts allow-same-origin allow-popups"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button style={cafeCardStyles.closeBtn} onClick={onClose}>fechar</button>
      </div>
    </div>
  );
}

const cafeCardStyles = {
  overlay: {
    position: "absolute", inset: 0, background: "rgba(40,30,20,0.5)",
    zIndex: 100, display: "flex", alignItems: "flex-end",
    backdropFilter: "blur(3px)",
  },
  sheet: {
    width: "100%", background: "#faf7f2", borderRadius: "20px 20px 0 0",
    overflow: "hidden",
    boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
    maxHeight: "92%", overflowY: "auto",
    paddingBottom: 24,
  },

  // ── Hero photo ──────────────────────────────
  heroWrap: {
    position: "relative", width: "100%",
    height: 220, overflow: "hidden",
    background: "#2a1f14",
    borderRadius: "20px 20px 0 0",
  },
  heroImg: {
    width: "100%", height: "100%",
    objectFit: "cover", display: "block",
  },
  heroGradient: {
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.85) 100%)",
  },
  handlePhoto: {
    position: "absolute", top: 10, left: "50%",
    transform: "translateX(-50%)",
    width: 36, height: 4,
    background: "rgba(255,255,255,0.5)", borderRadius: 2,
  },
  favBtnPhoto: {
    position: "absolute", top: 12, right: 16,
    fontSize: 26, background: "none", border: "none",
    cursor: "pointer", padding: 4,
    textShadow: "0 1px 4px rgba(0,0,0,0.4)",
  },
  heroText: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    padding: "12px 16px 14px",
  },
  bairroTagPhoto: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", padding: "3px 8px",
    borderRadius: 20, display: "inline-block", marginBottom: 5,
    backdropFilter: "blur(4px)",
  },
  cafeNamePhoto: {
    fontFamily: "'DM Serif Display', serif", fontSize: 24,
    color: "#fff", margin: "0 0 2px", lineHeight: 1.1,
    textShadow: "0 1px 6px rgba(0,0,0,0.4)",
  },
  addressPhoto: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "rgba(255,255,255,0.75)", margin: "0 0 8px",
  },
  tagsRowPhoto: { display: "flex", gap: 5, flexWrap: "wrap" },
  tagPhoto: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 500,
    border: "1px solid rgba(255,255,255,0.45)",
    borderRadius: 20, padding: "2px 8px",
    color: "rgba(255,255,255,0.9)",
    background: "rgba(0,0,0,0.2)",
    backdropFilter: "blur(4px)",
  },

  // ── Body ────────────────────────────────────
  body: { padding: "16px 20px" },
  vibe: {
    fontFamily: "'DM Serif Display', serif", fontStyle: "italic",
    fontSize: 15, color: "#9a8878", margin: "0 0 10px", lineHeight: 1.4,
  },
  description: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#3a2e24",
    lineHeight: 1.65, margin: "0 0 16px",
  },
  infoRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 14px", background: "#f5f0e8", borderRadius: 10,
    marginBottom: 18,
  },
  infoLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa" },
  infoValue: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#3a2e24", fontWeight: 500 },

  // ── Map ─────────────────────────────────────
  mapSection: { marginBottom: 16 },
  mapLabelRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: 8,
  },
  mapLabel: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    textTransform: "uppercase", letterSpacing: "0.12em", color: "#aaa",
  },
  mapsLink: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
    color: "#4a6a30", textDecoration: "none",
  },
  mapFrame: {
    borderRadius: 14, overflow: "hidden",
    border: "1.5px solid #ece8e0",
    height: 200, background: "#e8e4dc",
  },
  mapIframe: { width: "100%", height: "100%", border: "none", display: "block" },

  // ── Close ───────────────────────────────────
  closeBtn: {
    display: "block", width: "calc(100% - 40px)", margin: "0 20px",
    padding: "12px", background: "none", border: "1.5px solid #ddd",
    borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#888", cursor: "pointer", letterSpacing: "0.04em",
  },
};

Object.assign(window, { CafeCard, BAIRRO_COLORS, TAG_LABELS });
