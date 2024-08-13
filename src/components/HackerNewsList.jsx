import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import SearchBar from './SearchBar';
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
  });

  const filteredStories = data?.hits.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-4">Error: {error.message}</h2>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Hacker News Top Stories</h1>
        <Button onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(9)].map((_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredStories.length > 0 ? (
            filteredStories.map(story => <StoryCard key={story.objectID} story={story} />)
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500 dark:text-gray-400">No stories found matching your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HackerNewsList;