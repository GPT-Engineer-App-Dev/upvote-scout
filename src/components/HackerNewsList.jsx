import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import SearchBar from './SearchBar';
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 10;

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
  if (!response.ok) throw new Error('Failed to fetch stories');
  return response.json();
};

const HackerNewsList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const { data, isLoading, error } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    staleTime: 5 * 60 * 1000,
  });

  const filteredStories = React.useMemo(() => {
    if (!data?.hits) return [];
    return data.hits.filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const paginatedStories = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStories, currentPage]);

  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

  if (error) return <div className="text-red-500 p-4">An error occurred: {error.message}</div>;

  return (
    <div className="space-y-6">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array(ITEMS_PER_PAGE).fill().map((_, index) => <StoryCardSkeleton key={index} />)
          : paginatedStories.map(story => <StoryCard key={story.objectID} story={story} />)
        }
      </div>

      {!isLoading && (
        <div className="flex justify-center space-x-2 mt-4">
          <Button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="mx-2 self-center">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default HackerNewsList;