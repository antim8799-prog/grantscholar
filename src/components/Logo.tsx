import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = 'w-9 h-9', size = 'md' }) => {
  return (
    <div
      className={`relative rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-900 text-white flex items-center justify-center shadow-sm overflow-hidden shrink-0 border border-indigo-500/20 ${className}`}
      aria-label="GRANTLY Logo"
    >
      {/* Dynamic Brand Vector Mark */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1.5"
      >
        <defs>
          <linearGradient id="grantlyGrad" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818CF8" />
            <stop offset="0.5" stopColor="#4F46E5" />
            <stop offset="1" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="20" y1="6" x2="34" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34D399" />
            <stop offset="1" stopColor="#059669" />
          </linearGradient>
          <filter id="glow" x="0" y="0" width="40" height="40" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient subtle back ring */}
        <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Stylized Modern 'G' & Uplifting Arch */}
        <path
          d="M28 13.5C25.8 11.3 23 10 20 10C14.477 10 10 14.477 10 20C10 25.523 14.477 30 20 30C25.523 30 29.5 25.8 29.8 20.5H20V16.8H34C34 23 29.8 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6C24.2 6 28 7.8 30.8 10.8L28 13.5Z"
          fill="url(#grantlyGrad)"
        />

        {/* Dynamic Forward Beam / Arrow */}
        <path
          d="M23 18.5L28.5 13L26 10.5L34 9.5L33 17.5L30.5 15L25 20.5L23 18.5Z"
          fill="url(#accentGrad)"
          filter="url(#glow)"
        />

        {/* Central Core Star Spark */}
        <circle cx="20" cy="20" r="2.2" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
