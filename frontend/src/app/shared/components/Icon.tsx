import React from 'react';

export type IconName =
  | 'dashboard'
  | 'accounts'
  | 'transactions'
  | 'budgets'
  | 'savings'
  | 'analytics'
  | 'settings'
  | 'user'
  | 'chevron-down'
  | 'plus'
  | 'menu';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = '',
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
  };

  const icons: Record<IconName, React.ReactNode> = {
    dashboard: (
      <svg {...commonProps}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    accounts: (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M 6 20 C 6 16.686 8.686 14 12 14 C 15.314 14 18 16.686 18 20" />
      </svg>
    ),
    transactions: (
      <svg {...commonProps}>
        <path d="M 12 5 L 19 12 L 12 19" />
        <line x1="19" y1="12" x2="5" y2="12" />
      </svg>
    ),
    budgets: (
      <svg {...commonProps}>
        <path d="M 3 7 L 3 17 C 3 18.657 4.343 20 6 20 L 18 20 C 19.657 20 21 18.657 21 17 L 21 7" />
        <line x1="3" y1="7" x2="21" y2="7" />
        <line x1="7" y1="7" x2="7" y2="12" />
        <line x1="12" y1="7" x2="12" y2="12" />
        <line x1="17" y1="7" x2="17" y2="12" />
      </svg>
    ),
    savings: (
      <svg {...commonProps}>
        <path d="M 12 2 C 13.104 2 14 2.896 14 4 L 14 6 L 10 6 L 10 4 C 10 2.896 10.896 2 12 2 Z" />
        <path d="M 3 6 L 3 18 C 3 19.657 4.343 21 6 21 L 18 21 C 19.657 21 21 19.657 21 18 L 21 6 L 3 6 Z" />
        <line x1="12" y1="11" x2="12" y2="17" />
      </svg>
    ),
    analytics: (
      <svg {...commonProps}>
        <line x1="12" y1="2" x2="12" y2="22" />
        <path d="M 5 9 L 5 16 C 5 17.105 5.895 18 7 18 L 7 18" />
        <path d="M 12 5 L 12 16 C 12 17.105 12.895 18 14 18 L 14 18" />
        <path d="M 19 8 L 19 16 C 19 17.105 19.895 18 21 18 L 21 18" />
      </svg>
    ),
    settings: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M 12 1 L 15.09 7.26 L 22 9.27 L 17.5 14.14 L 18.18 21.02 L 12 18.26 L 5.82 21.02 L 6.5 14.14 L 2 9.27 L 8.91 7.26 L 12 1 Z" />
      </svg>
    ),
    user: (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M 4 20 C 4 16.134 7.582 13 12 13 C 16.418 13 20 16.134 20 20" />
      </svg>
    ),
    'chevron-down': (
      <svg {...commonProps}>
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    plus: (
      <svg {...commonProps}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    menu: (
      <svg {...commonProps}>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
  };

  return <>{icons[name]}</>;
};
