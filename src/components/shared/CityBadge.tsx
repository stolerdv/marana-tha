const CITY_COLORS: Record<string, { bg: string; text: string }> = {
  "Prešov":   { bg: "#bea055", text: "#fdf5f2" },
  "Košice":   { bg: "#4a7c9b", text: "#ffffff" },
  "Bardejov": { bg: "#6b8a5e", text: "#ffffff" },
};

interface Props {
  city: string;
  size?: "sm" | "md";
}

export function CityBadge({ city, size = "sm" }: Props) {
  const colors = CITY_COLORS[city];
  if (!colors) return null;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: colors.bg,
      color: colors.text,
      borderRadius: "50px",
      padding: size === "sm" ? "2px 10px" : "4px 14px",
      fontFamily: "var(--font-commissioner)",
      fontSize: size === "sm" ? "12px" : "14px",
      fontWeight: 700,
      letterSpacing: "0.02em",
      flexShrink: 0,
    }}>
      {city}
    </span>
  );
}

export { CITY_COLORS };
