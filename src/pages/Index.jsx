import React, { useState } from 'react';
import HackerNewsList from '../components/HackerNewsList';
import SavedStoriesList from '../components/SavedStoriesList';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from "@/components/ui/button";
import { BookmarkIcon, Newspaper } from 'lucide-react';

const Index = () => {
  const [showSaved, setShowSaved] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">HN Reader</h1>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost"
              onClick={() => setShowSaved(!showSaved)}
              className="text-sm font-medium"
            >
              {showSaved ? <Newspaper className="w-4 h-4 mr-2" /> : <BookmarkIcon className="w-4 h-4 mr-2" />}
              {showSaved ? 'Top Stories' : 'Saved Stories'}
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {showSaved ? <SavedStoriesList /> : <HackerNewsList />}
      </main>
    </div>
  );
};

export default Index;