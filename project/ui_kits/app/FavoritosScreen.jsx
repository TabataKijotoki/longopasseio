// FavoritosScreen
function FavoritosScreen({ favorites, onOpenCafe, onToggleFavorite }) {
  const favCafes = CAFES_DATA.filter(c => favorites.includes(c.id));

  const bairroColors = {
    "Santa Cecília": { bg: "#c8d8b0", text: "#4a6a30" },
    "Vila Buarque":  { bg: "#f2c4c4", text: "#8a3a3a" },
    "Higienópolis":  { bg: "#b8d4c8", text: "#2a5a48" },
    "República":     { bg: "#e8d8b0", text: "#7a5a20" },
  };

  if (favCafes.length === 0) {
    return (
      <div style={favStyles.container}>
        <div style={favStyles.topBar}>
          <h2 style={favStyles.pageTitle}>Favoritos</h2>
          <p style={favStyles.pageSub}>sua lista pessoal</p>
        </div>
        <div style={favStyles.empty}>
          <div style={favStyles.emptyIcon}>♡</div>
          <p style={favStyles.emptyTitle}>ainda sem favoritos</p>
          <p style={favStyles.emptySub}>
            explore o mapa e salve os cafés<br />que chamarem sua atenção.
          </p>
        </div>
      </div>
    );
  }

  // Group by bairro
  const grouped = {};
  favCafes.forEach(c => {
    if (!grouped[c.bairro]) grouped[c.bairro] = [];
    grouped[c.bairro].push(c);
  });

  return (
    <div style={favStyles.container}>
      <div style={favStyles.topBar}>
        <h2 style={favStyles.pageTitle}>Favoritos</h2>
        <p style={favStyles.pageSub}>{favCafes.length} {favCafes.length === 1 ? "café salvo" : "cafés salvos"}</p>
      </div>

      <div style={favStyles.content}>
        {Object.entries(grouped).map(([bairro, cafes]) => {
          const bc = bairroColors[bairro] || { bg: "#f0ebe3", text: "#555" };
          return (
            <div key={bairro} style={favStyles.group}>
              <div style={{ ...favStyles.groupHeader, background: bc.bg }}>
                <span style={{ ...favStyles.groupTitle, color: bc.text }}>{bairro}</span>
                <span style={{ ...favStyles.groupCount, color: bc.text }}>
                  {cafes.length} {cafes.length === 1 ? "café" : "cafés"}
                </span>
              </div>

              {cafes.map(cafe => (
                <div key={cafe.id} style={favStyles.favCard}>
                  <button style={favStyles.favCardMain} onClick={() => onOpenCafe(cafe)}>
                    <div style={{ ...favStyles.favNum, background: bc.bg, color: bc.text }}>
                      {cafe.id}
                    </div>
                    <div style={favStyles.favInfo}>
                      <p style={favStyles.favName}>{cafe.name}</p>
                      <p style={favStyles.favAddr}>{cafe.address}</p>
                      <p style={favStyles.favVibe}>"{cafe.vibe}"</p>
                    </div>
                    <span style={favStyles.favArrow}>›</span>
                  </button>
                  <button
                    style={favStyles.removeBtn}
                    onClick={() => onToggleFavorite(cafe.id)}
                    title="remover dos favoritos"
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>
          );
        })}

        {/* Rota sugerida hint */}
        {favCafes.length >= 2 && (
          <div style={favStyles.hintBox}>
            <p style={favStyles.hintText}>
              ✦ com {favCafes.length} cafés na lista, você já tem um roteiro!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const favStyles = {
  container: { flex: 1, overflowY: "auto", background: "#faf7f2", paddingBottom: 80 },
  topBar: { padding: "20px 20px 16px" },
  pageTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 26,
    color: "#2a1f14", margin: "0 0 2px",
  },
  pageSub: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9a8878", margin: 0, fontStyle: "italic" },

  empty: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", padding: "60px 40px",
  },
  emptyIcon: {
    fontSize: 52, color: "#e0d8d0", marginBottom: 16,
    fontFamily: "'DM Serif Display', serif",
  },
  emptyTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 20,
    color: "#c8b8a8", margin: "0 0 8px",
  },
  emptySub: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
    color: "#b8a898", textAlign: "center", lineHeight: 1.55, margin: 0,
  },

  content: { padding: "0 20px", display: "flex", flexDirection: "column", gap: 16 },
  group: { display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", border: "1.5px solid #ece8e0" },
  groupHeader: {
    padding: "10px 14px", display: "flex",
    justifyContent: "space-between", alignItems: "center",
  },
  groupTitle: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
  },
  groupCount: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
  },

  favCard: {
    display: "flex", background: "#fff",
    borderTop: "1px solid #f0ebe3", alignItems: "stretch",
  },
  favCardMain: {
    flex: 1, display: "flex", alignItems: "center", gap: 12,
    padding: "12px 14px", cursor: "pointer", background: "none",
    border: "none", textAlign: "left",
  },
  favNum: {
    width: 30, height: 30, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif",
  },
  favInfo: { flex: 1 },
  favName: {
    fontFamily: "'DM Serif Display', serif", fontSize: 15,
    color: "#2a1f14", margin: "0 0 1px",
  },
  favAddr: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    color: "#aaa", margin: "0 0 4px",
  },
  favVibe: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    color: "#b8a898", margin: 0, fontStyle: "italic",
  },
  favArrow: { fontSize: 20, color: "#ddd" },
  removeBtn: {
    background: "none", border: "none", cursor: "pointer",
    padding: "12px 14px", fontSize: 18, color: "#e05a5a",
    borderLeft: "1px solid #f0ebe3",
  },

  hintBox: {
    background: "#f5f0e6", borderRadius: 14, padding: "14px 16px",
    border: "1.5px solid #e8d8b0",
  },
  hintText: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#7a5a30", margin: 0, lineHeight: 1.5,
  },
};

Object.assign(window, { FavoritosScreen });
