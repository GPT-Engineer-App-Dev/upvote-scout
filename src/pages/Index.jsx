import React, { useState } from 'react';
import HackerNewsList from '../components/HackerNewsList';
import SavedStoriesList from '../components/SavedStoriesList';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from "@/components/ui/button";

const Index = () => {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white">Hacker News</h1>
          <Button onClick={() => setShowSaved(!showSaved)}>
            {showSaved ? 'Show Top Stories' : 'Show Saved Stories'}
          </Button>
        </div>
        {showSaved ? <SavedStoriesList /> : <HackerNewsList />}
      </div>
    </div>
  );
};

export default Index;