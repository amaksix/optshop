import { Icon } from './Icon';

export function PhotoSlot({ id, label, src, alt, className = '' }) {
  if (src) {
    return (
      <div className={`photo-slot photo-slot--image ${className}`.trim()}>
        <img src={src} alt={alt || label} />
      </div>
    );
  }

  return (
    <div className={`photo-slot ${className}`.trim()} data-photo-slot={id} role="img" aria-label={`${label}. ${id}.jpg`}>
      <Icon name="Image" size={28} strokeWidth={1.5} aria-hidden="true" />
      <span className="photo-slot__label">{label}</span>
      <span className="photo-slot__file">{id}.jpg</span>
    </div>
  );
}
