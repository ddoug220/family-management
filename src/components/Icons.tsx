type IconProps = { className?: string };

export function ClipboardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect
        x="6"
        y="4"
        width="12"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <rect x="9" y="2.5" width="6" height="3" rx="1" fill="currentColor" />
      <path
        d="M9 10h6M9 13.5h6M9 17h4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WheelIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path
        d="M12 4v6M12 14v6M4 12h6M14 12h6M6.4 6.4l4.2 4.2M13.4 13.4l4.2 4.2M17.6 6.4l-4.2 4.2M10.6 13.4l-4.2 4.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function KeyIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8.5" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M11.6 12H20v2.2h-2.1V12h-1.6v2.4H14V12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12.5 10 17.5 19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TicketIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3.8 8.4c0-.8.6-1.4 1.4-1.4h13.6c.8 0 1.4.6 1.4 1.4v1.7a2.1 2.1 0 0 0 0 4.1v1.8c0 .8-.6 1.4-1.4 1.4H5.2c-.8 0-1.4-.6-1.4-1.4v-1.8a2.1 2.1 0 0 0 0-4.1z"
        fill="currentColor"
        opacity="0.18"
      />
      <path
        d="M3.8 8.4c0-.8.6-1.4 1.4-1.4h13.6c.8 0 1.4.6 1.4 1.4v1.7a2.1 2.1 0 0 0 0 4.1v1.8c0 .8-.6 1.4-1.4 1.4H5.2c-.8 0-1.4-.6-1.4-1.4v-1.8a2.1 2.1 0 0 0 0-4.1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M10.2 7.6v8.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="1.5 2.1"
      />
    </svg>
  );
}
