
import React from 'react';

const WeatherIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M20 12h2" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M12 20v2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="M4 12H2" />
    <path d="m6.34 6.34-1.41-1.41" />
    <path d="M18 16.2A4.5 4.5 0 0 0 13.5 8H12a5 5 0 0 0 0 10h6a4.5 4.5 0 0 0 0-9.8Z" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <WeatherIcon className="w-8 h-8 text-blue-400" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          AI Weather Changer
        </h1>
      </div>
    </header>
  );
};

export default Header;
