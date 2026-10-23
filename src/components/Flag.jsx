import { useId } from 'react';

export function Flag({ code }) {
  const rawId = useId().replace(/:/g, '');

  if (code === 'lv') {
    return (
      <span className="flag" aria-hidden="true">
        <svg viewBox="0 0 18 12">
          <rect width="18" height="12" fill="#9E3039" />
          <rect y="4.8" width="18" height="2.4" fill="#ffffff" />
        </svg>
      </span>
    );
  }

  return (
    <span className="flag" aria-hidden="true">
      <svg viewBox="0 0 60 30">
        <clipPath id={rawId}>
          <rect width="60" height="30" />
        </clipPath>
        <g clipPath={`url(#${rawId})`}>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#ffffff" strokeWidth="8" />
          <path d="M0 0 L60 30 M60 0 L0 30" stroke="#C8102E" strokeWidth="5" />
          <path d="M30 0 V30 M0 15 H60" stroke="#ffffff" strokeWidth="14" />
          <path d="M30 0 V30 M0 15 H60" stroke="#C8102E" strokeWidth="8" />
        </g>
      </svg>
    </span>
  );
}
