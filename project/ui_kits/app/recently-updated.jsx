// Recently-updated badge — flags items refreshed within the last 15 days.
//
// updatedAt accepts two shapes:
//   "2026-04-28"                          → kind defaults to "novo" (assume new café)
//   { at: "2026-04-28", kind: "horario" } → explicit kind
//
// kinds: "novo" | "horario" | "endereco" | "geral"

const RECENT_WINDOW_DAYS = 15;

// Normalize updatedAt into { at: Date|null, kind: string }
function normalizeUpdate(updatedAt) {
  if (!updatedAt) return { at: null, kind: "novo" };
  if (typeof updatedAt === "string") {
    return { at: updatedAt, kind: "novo" };
  }
  return { at: updatedAt.at, kind: updatedAt.kind || "geral" };
}

function isRecentlyUpdated(updatedAt) {
  const { at } = normalizeUpdate(updatedAt);
  if (!at) return false;
  const updated = new Date(at + "T00:00:00");
  if (isNaN(updated)) return false;
  const now = new Date();
  const diffDays = Math.floor((now - updated) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= RECENT_WINDOW_DAYS;
}

function daysSinceUpdate(updatedAt) {
  const { at } = normalizeUpdate(updatedAt);
  if (!at) return null;
  const updated = new Date(at + "T00:00:00");
  if (isNaN(updated)) return null;
  return Math.floor((new Date() - updated) / (1000 * 60 * 60 * 24));
}

// Short label for the list-card badge
function shortLabelForKind(kind) {
  switch (kind) {
    case "novo":     return "novo";
    case "horario":  return "novo horário";
    case "endereco": return "novo endereço";
    case "geral":
    default:         return "atualizado";
  }
}

// Long label for the detail-screen pill
function detailLabelForKind(kind, days) {
  const when = days === 0 ? "hoje"
             : days === 1 ? "ontem"
             : `há ${days} dias`;
  switch (kind) {
    case "novo":     return `mapeado ${when}`;
    case "horario":  return `novo horário · atualizado ${when}`;
    case "endereco": return `novo endereço · atualizado ${when}`;
    case "geral":
    default:         return `atualizado ${when}`;
  }
}

// ── List badge ─────────────────────────────────────────────────────

// Broto / sage-leaf — fits brand-bairro pastels
function BrotoBadge({ label, size = 14, compact = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "#e8f0dc", color: "#4a6a30",
      border: "1px solid #c8d8b0",
      padding: compact ? "1px 6px 1px 5px" : "2px 8px 2px 6px",
      borderRadius: 20,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: compact ? 9 : 10, fontWeight: 600,
      letterSpacing: "0.04em", lineHeight: 1.2,
      whiteSpace: "nowrap",
    }}>
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="#4a6a30" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14 V 8" />
        <path d="M8 8 C 5 8, 3.5 6, 3.5 4 C 6 4, 8 5.5, 8 8 Z" fill="#c8d8b0"/>
        <path d="M8 9.5 C 11 9.5, 12.5 8, 12.5 6 C 10 6, 8 7.2, 8 9.5 Z" fill="#c8d8b0"/>
      </svg>
      <span>{label}</span>
    </span>
  );
}

// Estrela / star — fits the existing "dica de ouro" gold accent family
function EstrelaBadge({ label, compact = false }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: "#f5f0e6", color: "#7a5a20",
      border: "1px solid #e8d8b0",
      padding: compact ? "1px 6px 1px 5px" : "2px 8px 2px 6px",
      borderRadius: 20,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: compact ? 9 : 10, fontWeight: 600,
      letterSpacing: "0.04em", lineHeight: 1.2,
      whiteSpace: "nowrap",
    }}>
      <span style={{ color: "#c8a84a", fontSize: compact ? 11 : 12, lineHeight: 1 }}>✦</span>
      <span>{label}</span>
    </span>
  );
}

function RecentBadge({ updatedAt, variant = "estrela", compact = false }) {
  if (!isRecentlyUpdated(updatedAt)) return null;
  const { kind } = normalizeUpdate(updatedAt);
  const label = shortLabelForKind(kind);
  const Inner = variant === "broto" ? BrotoBadge : EstrelaBadge;
  return <Inner label={label} compact={compact} />;
}

// ── Detail-screen pill ────────────────────────────────────────────

function RecentDetailPill({ updatedAt, variant = "estrela" }) {
  if (!isRecentlyUpdated(updatedAt)) return null;
  const { kind } = normalizeUpdate(updatedAt);
  const days = daysSinceUpdate(updatedAt);
  const label = detailLabelForKind(kind, days);

  const palette = variant === "broto"
    ? { bg: "#e8f0dc", fg: "#4a6a30", border: "#c8d8b0", iconColor: "#4a6a30" }
    : { bg: "#f5f0e6", fg: "#7a5a20", border: "#e8d8b0", iconColor: "#c8a84a" };

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: palette.bg, color: palette.fg,
      border: `1px solid ${palette.border}`,
      padding: "4px 10px 4px 8px",
      borderRadius: 20,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>
      {variant === "broto" ? (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke={palette.iconColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 14 V 8" />
          <path d="M8 8 C 5 8, 3.5 6, 3.5 4 C 6 4, 8 5.5, 8 8 Z" fill="#c8d8b0"/>
          <path d="M8 9.5 C 11 9.5, 12.5 8, 12.5 6 C 10 6, 8 7.2, 8 9.5 Z" fill="#c8d8b0"/>
        </svg>
      ) : (
        <span style={{ color: palette.iconColor, fontSize: 13, lineHeight: 1 }}>✦</span>
      )}
      <span>{label}</span>
    </span>
  );
}

Object.assign(window, {
  isRecentlyUpdated, daysSinceUpdate, normalizeUpdate,
  shortLabelForKind, detailLabelForKind,
  RecentBadge, RecentDetailPill, RECENT_WINDOW_DAYS,
});
