import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import StoryCard from './StoryCard';
import StoryCardSkeleton from './StoryCardSkeleton';
import SearchBar from './SearchBar';
import TrendingTopics from './TrendingTopics';
import CategoryFilter from './CategoryFilter';
import StoryStats from './StoryStats';
import { Button } from "@/components/ui/button";
import { ArrowUp } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const fetchStories = async ({ pageParam = 0, category }) => {
  const response = await fetch(`https://hn.algolia.com/api/v1/search?tags=front_page${category !== 'all' ? `,${category}` : ''}&page=${pageParam}`);
  if (!response.ok) throw new Error('Failed to fetch stories');
  return response.json();
};

const HackerNewsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadMoreRef = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['stories', selectedCategory],
    queryFn: ({ pageParam }) => fetchStories({ pageParam, category: selectedCategory }),
    getNextPageParam: (lastPage, pages) => lastPage.page + 1,
  });

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1.0 });
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleObserver]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredStories = React.useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap(page => page.hits).filter(story => 
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  if (status === 'error') return <div className="text-red-500 p-4">An error occurred while fetching stories.</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>
      <TrendingTopics />
      
      <StoryStats stories={filteredStories} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map(story => <StoryCard key={story.objectID} story={story} />)}
      </div>

      {isFetchingNextPage && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {Array(ITEMS_PER_PAGE).fill().map((_, index) => <StoryCardSkeleton key={index} />)}
        </div>
      )}

      <div ref={loadMoreRef} className="h-10" />
      {showScrollTop && (
        <Button
          className="fixed bottom-4 right-4 rounded-full p-2"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default HackerNewsList;