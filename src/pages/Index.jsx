import React from 'react';
import HackerNewsList from '../components/HackerNewsList';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <HackerNewsList />
    </div>
  );
};

export default Index;