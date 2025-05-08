import React  from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
const ThemeToggle = (isDarkMode, onToggle) => {
  return (
    <button
      onClick={onToggle}
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}
export default ThemeToggle