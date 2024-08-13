import React from 'react';
import { useQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import StoryStats from './StoryStats';
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, ArrowUpCircle, ArrowDownCircle, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const ITEMS_PER_PAGE = 12;

const fetchTopStories = async () => {
  const response = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=100');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const HackerNewsList = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [sortOrder, setSortOrder] = React.useState('desc');
  const [sortBy, setSortBy] = React.useState('points');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['topStories'],
    queryFn: fetchTopStories,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  });

  const filteredAndSortedStories = React.useMemo(() => {
    let stories = data?.hits.filter(story =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    
    if (selectedCategory !== 'all') {
      stories = stories.filter(story => 
        story.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (story._tags && story._tags.includes(selectedCategory.toLowerCase()))
      );
    }
    
    return stories.sort((a, b) => {
      if (sortBy === 'points') {
        return sortOrder === 'asc' ? a.points - b.points : b.points - a.points;
      } else if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });
  }, [data, searchTerm, sortOrder, sortBy, selectedCategory]);

  const totalPages = Math.ceil(filteredAndSortedStories.length / ITEMS_PER_PAGE);
  const paginatedStories = filteredAndSortedStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOrder, sortBy, selectedCategory]);

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white mb-4 md:mb-0">Hacker News Top Stories</h1>
        <div className="flex flex-wrap items-center space-x-2 space-y-2 md:space-y-0">
          <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}>
            {sortOrder === 'desc' ? (
              <ArrowDownCircle className="w-4 h-4 mr-2" />
            ) : (
              <ArrowUpCircle className="w-4 h-4 mr-2" />
            )}
            {sortOrder === 'desc' ? 'Descending' : 'Ascending'}
          </Button>
          <Button onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(9)].map((_, index) => (
            <StoryCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {paginatedStories.length > 0 ? (
              paginatedStories.map(story => <StoryCard key={story.objectID} story={story} />)
            ) : (
              <p className="col-span-full text-center text-lg text-gray-500 dark:text-gray-400">No stories found matching your search and category.</p>
            )}
          </div>
          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
      {!isLoading && <StoryStats stories={data?.hits || []} />}
    </div>
  );
};

export default HackerNewsList;