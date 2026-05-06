// RoteirosScreen — curated route cards
function RoteirosScreen({ onOpenCafe }) {
  const [activeRoteiro, setActiveRoteiro] = React.useState(null);

  const periodoColor = {
    manhã: { bg: "#fef3dc", text: "#9a6820", border: "#e8d8b0" },
    tarde: { bg: "#fce8e8", text: "#8a3a3a", border: "#f2c4c4" },
  };

  if (activeRoteiro) {
    const roteiro = ROTEIROS.find(r => r.id === activeRoteiro);
    const pc = periodoColor[roteiro.periodo] || periodoColor["manhã"];

    return (
      <div style={rotStyles.container}>
        {/* Back */}
        <button style={rotStyles.backBtn} onClick={() => setActiveRoteiro(null)}>
          ← roteiros
        </button>

        {/* Roteiro header */}
        <div style={{ ...rotStyles.rotHeader, background: pc.bg, borderBottom: `2px solid ${pc.border}` }}>
          <span style={rotStyles.rotEmoji}>{roteiro.emoji}</span>
          <div>
            <span style={{ ...rotStyles.rotPeriodoTag, color: pc.text }}>{roteiro.periodo}</span>
            <h2 style={rotStyles.rotTitle}>{roteiro.title}</h2>
            <p style={rotStyles.rotSubtitle}>{roteiro.subtitle}</p>
          </div>
        </div>

        <div style={rotStyles.rotBody}>
          <div style={rotStyles.duracaoRow}>
            <span style={rotStyles.duracaoLabel}>duração estimada</span>
            <span style={rotStyles.duracaoValue}>{roteiro.duracao}</span>
          </div>

          {/* Stops timeline */}
          <div style={rotStyles.timeline}>
            {roteiro.paradas.map((parada, idx) => {
              const cafe = CAFES_DATA.find(c => c.id === parada.cafeId);
              const bc = BAIRRO_COLORS[cafe.bairro] || { bg: "#f0ebe3", text: "#555", border: "#ddd" };
              const isLast = idx === roteiro.paradas.length - 1;

              return (
                <div key={idx} style={rotStyles.timelineItem}>
                  {/* Line connector */}
                  <div style={rotStyles.timelineLeft}>
                    <div style={{ ...rotStyles.timelineDot, background: bc.bg, border: `2px solid ${bc.text}` }}>
                      {idx + 1}
                    </div>
                    {!isLast && <div style={rotStyles.timelineLine}></div>}
                  </div>

                  {/* Content */}
                  <button style={rotStyles.timelineCard} onClick={() => onOpenCafe(cafe)}>
                    <div style={rotStyles.timelineCardTop}>
                      <div>
                        <span style={rotStyles.timelineHora}>{parada.hora}</span>
                        <p style={rotStyles.timelineCafeName}>{cafe.name}</p>
                        <p style={rotStyles.timelineAddr}>{cafe.address}</p>
                      </div>
                      <span style={rotStyles.timelineArrow}>›</span>
                    </div>
                    <p style={rotStyles.timelineMotivo}>{parada.motivo}</p>
                    <div style={rotStyles.timelineTags}>
                      {cafe.tags.map(t => (
                        <span key={t} style={{ ...rotStyles.timelineTag, borderColor: bc.border, color: bc.text }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dica */}
          <div style={rotStyles.dicaBox}>
            <span style={rotStyles.dicaStar}>★</span>
            <p style={rotStyles.dicaText}>{roteiro.dica}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={rotStyles.container}>
      <div style={rotStyles.topBar}>
        <h2 style={rotStyles.pageTitle}>Roteiros</h2>
        <p style={rotStyles.pageSub}>lugares pra ir sem pressa</p>
      </div>

      <div style={rotStyles.cardsList}>
        {ROTEIROS.map(r => {
          const pc = periodoColor[r.periodo] || periodoColor["manhã"];
          return (
            <button
              key={r.id}
              style={{ ...rotStyles.roteiroCard, background: pc.bg, border: `1.5px solid ${pc.border}` }}
              onClick={() => setActiveRoteiro(r.id)}
            >
              <div style={rotStyles.roteiroCardTop}>
                <span style={rotStyles.roteiroEmoji}>{r.emoji}</span>
                <div style={rotStyles.roteiroCardMeta}>
                  <span style={{ ...rotStyles.roteiroPeriodo, color: pc.text }}>{r.periodo}</span>
                  <span style={rotStyles.roteiroDuracao}>{r.duracao}</span>
                </div>
              </div>
              <h3 style={rotStyles.roteiroTitle}>{r.title}</h3>
              <p style={rotStyles.roteiroSub}>{r.subtitle}</p>
              <div style={rotStyles.roteiroCafes}>
                {r.paradas.map((p, i) => {
                  const cafe = CAFES_DATA.find(c => c.id === p.cafeId);
                  return (
                    <React.Fragment key={i}>
                      <span style={rotStyles.roteiroCafeName}>{cafe?.name}</span>
                      {i < r.paradas.length - 1 && <span style={rotStyles.roteiroDivider}>→</span>}
                    </React.Fragment>
                  );
                })}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom note */}
      <div style={rotStyles.bottomNote}>
        <p style={rotStyles.bottomNoteText}>
          o centro que nem todo mundo vê —<br />
          <em>explore em camadas.</em>
        </p>
      </div>
    </div>
  );
}

const rotStyles = {
  container: { flex: 1, overflowY: "auto", background: "#faf7f2", paddingBottom: 80 },
  topBar: { padding: "20px 20px 16px" },
  pageTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 26,
    color: "#2a1f14", margin: "0 0 2px",
  },
  pageSub: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#9a8878", margin: 0, fontStyle: "italic" },
  cardsList: { display: "flex", flexDirection: "column", gap: 12, padding: "0 20px" },
  roteiroCard: {
    borderRadius: 16, padding: "16px", cursor: "pointer",
    textAlign: "left", width: "100%",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },
  roteiroCardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  roteiroEmoji: { fontSize: 28 },
  roteiroCardMeta: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
  roteiroPeriodo: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
  },
  roteiroDuracao: { fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#aaa" },
  roteiroTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 20,
    color: "#2a1f14", margin: "0 0 2px",
  },
  roteiroSub: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#9a8878", margin: "0 0 12px", fontStyle: "italic",
  },
  roteiroCafes: { display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" },
  roteiroCafeName: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#5a4a30", fontWeight: 500,
  },
  roteiroDivider: { fontSize: 11, color: "#bbb" },
  bottomNote: { padding: "24px 20px", textAlign: "center" },
  bottomNoteText: {
    fontFamily: "'DM Serif Display', serif", fontSize: 17,
    color: "#b8a898", margin: 0, lineHeight: 1.5,
  },

  // Detail view
  backBtn: {
    display: "block", background: "none", border: "none",
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#9a8878", padding: "16px 20px 8px",
    cursor: "pointer", letterSpacing: "0.02em",
  },
  rotHeader: {
    display: "flex", gap: 14, alignItems: "flex-start",
    padding: "16px 20px 20px",
  },
  rotEmoji: { fontSize: 36, flexShrink: 0, marginTop: 4 },
  rotPeriodoTag: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.1em", display: "block", marginBottom: 4,
  },
  rotTitle: {
    fontFamily: "'DM Serif Display', serif", fontSize: 24,
    color: "#2a1f14", margin: "0 0 3px", lineHeight: 1.15,
  },
  rotSubtitle: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
    color: "#9a8878", margin: 0, fontStyle: "italic",
  },
  rotBody: { padding: "16px 20px" },
  duracaoRow: {
    display: "flex", justifyContent: "space-between",
    alignItems: "center", marginBottom: 20,
    paddingBottom: 16, borderBottom: "1px solid #ece8e0",
  },
  duracaoLabel: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    textTransform: "uppercase", letterSpacing: "0.1em", color: "#aaa",
  },
  duracaoValue: {
    fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#2a1f14",
  },
  timeline: { display: "flex", flexDirection: "column", gap: 0 },
  timelineItem: { display: "flex", gap: 12, alignItems: "stretch" },
  timelineLeft: { display: "flex", flexDirection: "column", alignItems: "center", width: 28, flexShrink: 0 },
  timelineDot: {
    width: 28, height: 28, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 11, fontWeight: 700, flexShrink: 0,
    fontFamily: "'DM Sans', sans-serif", zIndex: 1,
  },
  timelineLine: {
    flex: 1, width: 2, background: "#ece8e0", margin: "4px 0",
  },
  timelineCard: {
    flex: 1, background: "#fff", borderRadius: 14,
    border: "1.5px solid #ece8e0", padding: "12px 14px",
    marginBottom: 10, cursor: "pointer", textAlign: "left",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
  },
  timelineCardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  timelineHora: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    color: "#bbb", display: "block", marginBottom: 2,
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  timelineCafeName: {
    fontFamily: "'DM Serif Display', serif", fontSize: 16,
    color: "#2a1f14", margin: "0 0 2px",
  },
  timelineAddr: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    color: "#bbb", margin: 0,
  },
  timelineArrow: { fontSize: 20, color: "#ddd" },
  timelineMotivo: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#9a8878", margin: "8px 0 8px", fontStyle: "italic", lineHeight: 1.4,
  },
  timelineTags: { display: "flex", gap: 5 },
  timelineTag: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    border: "1.5px solid", borderRadius: 20, padding: "2px 8px",
  },
  dicaBox: {
    background: "#f5f0e6", borderRadius: 14, padding: "14px 16px",
    border: "1.5px solid #e8d8b0",
    display: "flex", gap: 10, alignItems: "flex-start", marginTop: 8,
  },
  dicaStar: { fontSize: 14, color: "#c8a84a", flexShrink: 0, marginTop: 1 },
  dicaText: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#5a4a30", margin: 0, lineHeight: 1.55,
  },
};

Object.assign(window, { RoteirosScreen });
