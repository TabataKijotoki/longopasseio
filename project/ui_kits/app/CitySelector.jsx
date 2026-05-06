// CitySelector — pill no header da home que abre seletor de cidade/região.
// Cidades futuras aparecem como "em breve" (desabilitadas) pra comunicar roadmap.

const CITIES = [
  {
    id: "sp-centro",
    state: "SP",
    city: "São Paulo",
    region: "Centro",
    pillLabel: "centro",          // o que aparece no pill (foco no bairro)
    available: true,
    cafeCount: 19,
  },
  {
    id: "rj-zona-sul",
    state: "RJ",
    city: "Rio de Janeiro",
    region: null,
    pillLabel: "rio",
    available: false,
    cafeCount: null,
  },
  {
    id: "mg-bh",
    state: "MG",
    city: "Belo Horizonte",
    region: null,
    pillLabel: "bh",
    available: false,
    cafeCount: null,
  },
  {
    id: "pr-curitiba",
    state: "PR",
    city: "Curitiba",
    region: null,
    pillLabel: "curitiba",
    available: false,
    cafeCount: null,
  },
  {
    id: "rs-poa",
    state: "RS",
    city: "Porto Alegre",
    region: null,
    pillLabel: "poa",
    available: false,
    cafeCount: null,
  },
];

function CitySelectorPill({ activeCityId, onOpen }) {
  const active = CITIES.find(c => c.id === activeCityId) || CITIES[0];

  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        background: "#2a1f14", color: "#faf7f2",
        padding: "5px 10px 5px 12px", borderRadius: 20,
        letterSpacing: "0.05em",
        border: "none", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 5,
      }}
      aria-label={`Cidade atual: ${active.city}${active.region ? " · " + active.region : ""}. Trocar.`}
    >
      <span>{active.pillLabel}</span>
      <span style={{ fontSize: 9, opacity: 0.7, marginTop: 1 }}>▾</span>
    </button>
  );
}

function CitySheet({ cities, activeId, onSelect, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 50,
        background: "rgba(42, 31, 20, 0.45)",
        display: "flex", alignItems: "flex-end",
        animation: "csFade 200ms ease-out",
      }}
    >
      <style>{`
        @keyframes csFade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes csSlide { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", background: "#faf7f2",
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          padding: "10px 0 24px",
          maxHeight: "75%", overflowY: "auto",
          animation: "csSlide 280ms cubic-bezier(.2,.8,.2,1)",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
        }}
      >
        {/* Grabber */}
        <div style={{ display: "flex", justifyContent: "center", paddingBottom: 8 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: "#d8cfc2" }}></div>
        </div>

        {/* Header */}
        <div style={{ padding: "4px 24px 14px" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#aaa", margin: "0 0 4px",
          }}>onde explorar</p>
          <h2 style={{
            fontFamily: "'DM Serif Display', serif", fontSize: 22,
            color: "#2a1f14", margin: 0, lineHeight: 1.2,
          }}>escolha sua cidade</h2>
        </div>

        {/* Available */}
        <div style={{ padding: "0 16px" }}>
          {cities.filter(c => c.available).map(c => (
            <CityRow
              key={c.id}
              city={c}
              isActive={c.id === activeId}
              onClick={() => onSelect(c.id)}
            />
          ))}
        </div>

        {/* Coming soon */}
        <div style={{ padding: "16px 24px 6px" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 10,
            textTransform: "uppercase", letterSpacing: "0.12em",
            color: "#aaa", margin: 0,
          }}>em breve</p>
        </div>
        <div style={{ padding: "0 16px" }}>
          {cities.filter(c => !c.available).map(c => (
            <CityRow key={c.id} city={c} isActive={false} onClick={null} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{ padding: "16px 24px 0" }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 12,
            color: "#9a8878", margin: 0, fontStyle: "italic", lineHeight: 1.5,
          }}>
            sugira uma cidade próxima — em SP exploramos por bairro, fora dele, cidade por cidade.
          </p>
        </div>
      </div>
    </div>
  );
}

function CityRow({ city, isActive, onClick }) {
  const disabled = !onClick;
  const subtitle = city.region
    ? `${city.region} · ${city.cafeCount} cafés curados`
    : disabled
      ? "em breve"
      : `${city.cafeCount} cafés curados`;

  return (
    <button
      type="button"
      onClick={onClick || undefined}
      disabled={disabled}
      style={{
        width: "100%", textAlign: "left",
        background: isActive ? "#f5f0e6" : "transparent",
        border: isActive ? "1.5px solid #e8d8b0" : "1.5px solid transparent",
        borderRadius: 12, padding: "12px 14px",
        marginBottom: 4,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.45 : 1,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "inherit",
      }}
    >
      <div>
        <p style={{
          fontFamily: "'DM Serif Display', serif", fontSize: 17,
          color: "#2a1f14", margin: "0 0 2px", lineHeight: 1.2,
        }}>{city.city}{city.region ? <span style={{ fontStyle: "italic" }}> · {city.region}</span> : null}</p>
        <p style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 11,
          color: "#9a8878", margin: 0,
        }}>{subtitle}</p>
      </div>
      {isActive && (
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: 10,
          background: "#2a1f14", color: "#faf7f2",
          padding: "3px 9px", borderRadius: 12,
          letterSpacing: "0.05em",
        }}>atual</span>
      )}
    </button>
  );
}

Object.assign(window, { CitySelectorPill, CITIES });
