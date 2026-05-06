// ExplorarScreen — lista de cafés com filtros (sem mapa)
function ExplorarScreen({ onOpenCafe, favorites, initialBairro, recentVariant = "broto" }) {
  const [activeBairro, setActiveBairro] = React.useState(initialBairro || null);
  const [activeTags, setActiveTags] = React.useState([]);
  const [search, setSearch] = React.useState("");

  const bairros = ["Santa Cecília", "Vila Buarque", "Higienópolis", "República", "Barra Funda", "Campos Elíseos"];
  const tags = ["trabalhar", "encontro", "leitura", "especialidade"];

  const filtered = CAFES_DATA.filter(c => {
    if (activeBairro && c.bairro !== activeBairro) return false;
    if (activeTags.length > 0 && !activeTags.some(t => c.tags.includes(t))) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleTag = (t) => {
    setActiveTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  };

  const bairroColors = {
    "Santa Cecília":  { bg: "#c8d8b0", text: "#4a6a30" },
    "Vila Buarque":   { bg: "#f2c4c4", text: "#8a3a3a" },
    "Higienópolis":   { bg: "#b8d4c8", text: "#2a5a48" },
    "República":      { bg: "#e8d8b0", text: "#7a5a20" },
    "Barra Funda":    { bg: "#b8d4b8", text: "#2a5a30" },
    "Campos Elíseos": { bg: "#d0c4e8", text: "#5a4a8a" },
  };

  const hasFilters = activeBairro || activeTags.length > 0 || search;

  return (
    <div style={explorStyles.container}>
      {/* Top bar */}
      <div style={explorStyles.topBar}>
        <h2 style={explorStyles.title}>Explorar</h2>
        <span style={explorStyles.countBadge}>{filtered.length}</span>
      </div>

      {/* Search */}
      <div style={explorStyles.searchWrap}>
        <svg style={explorStyles.searchIcon} viewBox="0 0 20 20" fill="none">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="#bbb" strokeWidth="1.8"/>
          <path d="M13 13l3.5 3.5" stroke="#bbb" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        <input
          style={explorStyles.searchInput}
          placeholder="buscar café..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button style={explorStyles.clearSearch} onClick={() => setSearch("")}>×</button>
        )}
      </div>

      {/* Bairro filters */}
      <div style={explorStyles.filtersWrap}>
        <div style={explorStyles.filterRow}>
          <button
            style={{ ...explorStyles.filterChip, ...(activeBairro === null ? explorStyles.filterChipActive : {}) }}
            onClick={() => setActiveBairro(null)}
          >todos</button>
          {bairros.map(b => {
            const bc = bairroColors[b];
            const isActive = activeBairro === b;
            return (
              <button key={b} onClick={() => setActiveBairro(isActive ? null : b)}
                style={{
                  ...explorStyles.filterChip,
                  background: isActive ? bc.bg : "transparent",
                  color: isActive ? bc.text : "#888",
                  border: `1.5px solid ${isActive ? bc.bg : "#ddd"}`,
                  fontWeight: isActive ? 700 : 500,
                }}
              >{b}</button>
            );
          })}
        </div>
        <div style={explorStyles.filterRow}>
          {tags.map(t => {
            const isActive = activeTags.includes(t);
            return (
              <button key={t} onClick={() => toggleTag(t)}
                style={{
                  ...explorStyles.filterChip,
                  background: isActive ? "#2a1f14" : "transparent",
                  color: isActive ? "#faf7f2" : "#888",
                  border: `1.5px solid ${isActive ? "#2a1f14" : "#ddd"}`,
                  fontWeight: isActive ? 600 : 400,
                }}
              >{t}</button>
            );
          })}
        </div>
      </div>

      {/* Clear filters */}
      {hasFilters && (
        <div style={explorStyles.clearRow}>
          <button style={explorStyles.clearBtn} onClick={() => { setActiveBairro(null); setActiveTags([]); setSearch(""); }}>
            limpar filtros
          </button>
        </div>
      )}

      {/* List */}
      <div style={explorStyles.listContainer}>
        {filtered.length === 0 && (
          <div style={explorStyles.empty}>
            <p style={explorStyles.emptyText}>nenhum café encontrado.</p>
            <p style={explorStyles.emptySub}>tente outros filtros.</p>
          </div>
        )}
        {filtered.map(cafe => {
          const bc = bairroColors[cafe.bairro] || { bg: "#f0ebe3", text: "#555" };
          return (
            <button key={cafe.id} style={explorStyles.listCard} onClick={() => onOpenCafe(cafe)}>
              <div style={{ ...explorStyles.listCardAccent, background: bc.bg }}></div>
              <div style={explorStyles.listCardBody}>
                <div style={explorStyles.listCardTop}>
                  <p style={explorStyles.listCardName}>{cafe.name}</p>
                  <span style={{ ...explorStyles.listBairroTag, background: bc.bg, color: bc.text }}>
                    {cafe.bairro}
                  </span>
                </div>
                <p style={explorStyles.listCardAddr}>{cafe.address}</p>
                <div style={explorStyles.listTags}>
                  {isRecentlyUpdated(cafe.updatedAt) && (
                    <RecentBadge updatedAt={cafe.updatedAt} variant={recentVariant} compact />
                  )}
                  {cafe.tags.map(t => (
                    <span key={t} style={explorStyles.listTag}>{t}</span>
                  ))}
                  {cafe.petFriendly && <span style={explorStyles.listTag}>pet friendly</span>}
                </div>
                <p style={explorStyles.listVibe}>"{cafe.vibe}"</p>
              </div>
              <span style={explorStyles.listArrow}>›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const explorStyles = {
  container: { flex: 1, overflowY: "auto", background: "#faf7f2", paddingBottom: 80 },
  topBar: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "20px 20px 8px",
  },
  title: {
    fontFamily: "'DM Serif Display', serif", fontSize: 26,
    color: "#2a1f14", margin: 0,
  },
  countBadge: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600,
    background: "#2a1f14", color: "#faf7f2",
    padding: "2px 8px", borderRadius: 20,
  },
  searchWrap: {
    margin: "0 20px 12px", position: "relative",
    display: "flex", alignItems: "center",
  },
  searchIcon: {
    position: "absolute", left: 12, width: 16, height: 16, flexShrink: 0,
  },
  searchInput: {
    width: "100%", padding: "10px 36px 10px 36px",
    background: "#f0ebe3", border: "1.5px solid #e8e0d4",
    borderRadius: 12, fontFamily: "'DM Sans', sans-serif",
    fontSize: 13, color: "#2a1f14", outline: "none",
  },
  clearSearch: {
    position: "absolute", right: 10, background: "none", border: "none",
    fontSize: 18, color: "#bbb", cursor: "pointer", padding: "0 4px",
  },
  filtersWrap: { padding: "0 20px", display: "flex", flexDirection: "column", gap: 8 },
  filterRow: { display: "flex", gap: 6, flexWrap: "wrap" },
  filterChip: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    border: "1.5px solid #ddd", borderRadius: 20, padding: "5px 12px",
    cursor: "pointer", background: "transparent", color: "#888",
    transition: "all 0.15s ease",
  },
  filterChipActive: { background: "#2a1f14", color: "#faf7f2", border: "1.5px solid #2a1f14" },
  clearRow: { padding: "8px 20px 0", display: "flex", justifyContent: "flex-end" },
  clearBtn: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 12,
    color: "#9a8878", background: "none", border: "none", cursor: "pointer",
    textDecoration: "underline",
  },
  listContainer: { padding: "12px 20px 0", display: "flex", flexDirection: "column", gap: 10 },
  listCard: {
    display: "flex", alignItems: "stretch",
    background: "#fff", borderRadius: 14,
    border: "1.5px solid #ece8e0", cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)", textAlign: "left",
    width: "100%", overflow: "hidden",
  },
  listCardAccent: {
    width: 5, flexShrink: 0,
  },
  listCardBody: { flex: 1, padding: "12px 10px 12px 12px" },
  listCardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2, gap: 8 },
  listCardName: {
    fontFamily: "'DM Serif Display', serif", fontSize: 16,
    color: "#2a1f14", margin: 0, lineHeight: 1.2,
  },
  listBairroTag: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
    padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0,
  },
  listCardAddr: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    color: "#aaa", margin: "0 0 6px",
  },
  listTags: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 6 },
  listTag: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 10,
    border: "1px solid #ddd", borderRadius: 20,
    padding: "2px 8px", color: "#888",
  },
  listVibe: {
    fontFamily: "'DM Sans', sans-serif", fontSize: 11,
    color: "#b8a898", margin: 0, fontStyle: "italic",
  },
  listArrow: { fontSize: 22, color: "#ddd", alignSelf: "center", paddingRight: 12, flexShrink: 0 },
  empty: { textAlign: "center", paddingTop: 40 },
  emptyText: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#ccc" },
  emptySub: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#bbb" },
};

Object.assign(window, { ExplorarScreen });
