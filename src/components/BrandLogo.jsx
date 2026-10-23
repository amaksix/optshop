function fillFor(brand) {
  if (brand.color) return brand.color;
  const hex = brand.icon.hex;
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
  if (luminance > 0.9) return '#111111';
  return `#${hex}`;
}

export function BrandLogo({ brand }) {
  return (
    <div className="brand-card">
      <span className="sr-only">{brand.name}</span>
      {brand.icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={brand.icon.path} fill={fillFor(brand)} />
        </svg>
      ) : (
        <span className="brand-card__word" style={{ color: brand.color }} aria-hidden="true">
          {brand.name}
        </span>
      )}
    </div>
  );
}
