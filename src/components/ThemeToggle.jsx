import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="rounded-full w-10 h-10 bg-gray-200 dark:bg-gray-700 border-2 border-gray-400 dark:border-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-blue-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;