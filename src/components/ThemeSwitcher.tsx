import React from 'react';
import { Sun, Moon, EyeOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeMode } from '../types';

interface ThemeOption {
  value: ThemeMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: 'Light',
      icon: <Sun className="w-5 h-5" />,
      description: 'Standard light theme with soft colors'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <Moon className="w-5 h-5" />,
      description: 'Reduced brightness for low light conditions'
    },
    {
      value: 'high-contrast',
      label: 'High Contrast',
      icon: <EyeOff className="w-5 h-5" />,
      description: 'Maximum contrast for visual impairments'
    }
  ];

  return (
    <div className="theme-switcher" role="region" aria-label="Theme options">
      <h2 className="sr-only">Choose Theme</h2>
      <div className="flex flex-col space-y-2">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex items-center p-2 rounded-md transition-colors ${
              theme === option.value 
              ? 'bg-primary text-white' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
            aria-pressed={theme === option.value}
            aria-label={`${option.label} theme: ${option.description}`}
          >
            <span className="mr-2">{option.icon}</span>
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;