import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ExternalLink, User, Clock, MessageSquare, Link as LinkIcon, Bookmark, Share2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const StoryCard = ({ story }) => {
  const [savedStories, setSavedStories] = useLocalStorage('savedStories', []);

  const isSaved = savedStories.some(savedStory => savedStory.objectID === story.objectID);

  const toggleSave = () => {
    if (isSaved) {
      setSavedStories(savedStories.filter(savedStory => savedStory.objectID !== story.objectID));
    } else {
      setSavedStories([...savedStories, story]);
    }
  };
  const formattedDate = new Date(story.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const domain = story.url ? new URL(story.url).hostname : '';

  return (
    <Card className="h-full flex flex-col dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex-grow pt-6">
        <h2 className="text-xl font-semibold mb-3 dark:text-white line-clamp-2">{story.title}</h2>
        {domain && (
          <Badge variant="secondary" className="mb-3">
            <LinkIcon className="w-3 h-3 mr-1" />
            {domain}
          </Badge>
        )}
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <ArrowUpCircle className="w-4 h-4 mr-1 text-orange-500" />
                  <span>{story.points} points</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upvotes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{story.author}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Author</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-green-500" />
                  <span>{formattedDate}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Posted on</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex items-center">
                  <MessageSquare className="w-4 h-4 mr-1 text-purple-500" />
                  <span>{story.num_comments} comments</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Number of comments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          className="flex-1 mr-2 dark:text-gray-300 dark:hover:text-white hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => window.open(story.url, '_blank')}
        >
          Read More <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <Button
          variant="outline"
          className="flex-1 mx-2 dark:text-gray-300 dark:hover:text-white hover:bg-secondary hover:text-white transition-colors duration-300"
          onClick={() => window.open(`https://news.ycombinator.com/item?id=${story.objectID}`, '_blank')}
        >
          Comments <MessageSquare className="w-4 h-4 ml-2" />
        </Button>
        <Button
          variant={isSaved ? "secondary" : "outline"}
          className="flex-1 mx-2 dark:text-gray-300 dark:hover:text-white hover:bg-accent hover:text-white transition-colors duration-300"
          onClick={toggleSave}
        >
          {isSaved ? 'Saved' : 'Save'} <Bookmark className="w-4 h-4 ml-2" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 ml-2 dark:text-gray-300 dark:hover:text-white hover:bg-primary hover:text-white transition-colors duration-300">
              Share <Share2 className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(story.title)}&url=${encodeURIComponent(story.url)}`, '_blank')}>
              Share on Twitter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(story.url)}`, '_blank')}>
              Share on Facebook
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(story.url)}&title=${encodeURIComponent(story.title)}`, '_blank')}>
              Share on LinkedIn
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;