"use client";
import React, { useState } from 'react';

interface LanguageButtonProps {
  label: string;
}

const LanguageButton: React.FC<LanguageButtonProps> = ({ label }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={`px-2 py-1 border border-black rounded-md text-sm ${isActive ? 'bg-FDA567' : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default LanguageButton;
