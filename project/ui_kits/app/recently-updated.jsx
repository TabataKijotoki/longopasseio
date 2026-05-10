// Recently-updated badge — flags items refreshed within the last 15 days.
// updatedAt accepts a date string "2026-04-28" or an object { at: "2026-04-28" }.

const RECENT_WINDOW_DAYS = 15;

function normalizeUpdate(updatedAt) {
  if (!updatedAt) return { at: null };
  if (typeof updatedAt === "string") return { at: updatedAt };
  return { at: updatedAt.at || null };
}

function isRecentlyUpdated(updatedAt) {
  const { at } = normalizeUpdate(updatedAt);
  if (!at) return false;
  const updated = new Date(at + "T00:00:00");
  if (isNaN(updated)) return false;
  const diffDays = Math.floor((new Date() - updated) / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= RECENT_WINDOW_DAYS;
}

function daysSinceUpdate(updatedAt) {
  const { at } = normalizeUpdate(updatedAt);
  if (!at) return null;
  const updated = new Date(at + "T00:00:00");
  if (isNaN(updated)) return null;
  return Math.floor((new Date() - updated) / (1000 * 60 * 60 * 24));
}

// ── List badge ─────────────────────────────────────────────────────

function RecentBadge({ updatedAt, compact = false }) {
  if (!isRecentlyUpdated(updatedAt)) return null;
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
      <span>novo</span>
    </span>
  );
}

// ── Detail-screen pill ────────────────────────────────────────────

function RecentDetailPill({ updatedAt }) {
  if (!isRecentlyUpdated(updatedAt)) return null;
  const days = daysSinceUpdate(updatedAt);
  const when = days === 0 ? "hoje"
             : days === 1 ? "ontem"
             : `há ${days} dias`;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "#f5f0e6", color: "#7a5a20",
      border: "1px solid #e8d8b0",
      padding: "4px 10px 4px 8px",
      borderRadius: 20,
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
      whiteSpace: "nowrap",
    }}>
      <span style={{ color: "#c8a84a", fontSize: 13, lineHeight: 1 }}>✦</span>
      <span>atualizado {when}</span>
    </span>
  );
}

Object.assign(window, {
  isRecentlyUpdated, daysSinceUpdate, normalizeUpdate,
  RecentBadge, RecentDetailPill, RECENT_WINDOW_DAYS,
});
