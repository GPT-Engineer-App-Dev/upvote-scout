import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import StoryCard from './StoryCard';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const SavedStoriesList = () => {
  const [savedStories, setSavedStories] = useLocalStorage('savedStories', []);

  const removeStory = (storyId) => {
    setSavedStories(savedStories.filter(story => story.objectID !== storyId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Saved Stories</h2>
      {savedStories.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No saved stories yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedStories.map(story => (
            <div key={story.objectID} className="relative">
              <StoryCard story={story} />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => removeStory(story.objectID)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedStoriesList;