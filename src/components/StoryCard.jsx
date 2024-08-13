import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ExternalLink, User, Clock, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const StoryCard = ({ story }) => {
  const formattedDate = new Date(story.created_at).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="h-full flex flex-col dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex-grow pt-6">
        <h2 className="text-xl font-semibold mb-3 dark:text-white line-clamp-2">{story.title}</h2>
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
          className="flex-1 ml-2 dark:text-gray-300 dark:hover:text-white hover:bg-secondary hover:text-white transition-colors duration-300"
          onClick={() => window.open(`https://news.ycombinator.com/item?id=${story.objectID}`, '_blank')}
        >
          Comments <MessageSquare className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;