import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle, ExternalLink, User, Clock } from 'lucide-react';

const StoryCard = ({ story }) => {
  return (
    <Card className="h-full flex flex-col dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex-grow pt-6">
        <h2 className="text-xl font-semibold mb-3 dark:text-white line-clamp-2">{story.title}</h2>
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-4">
          <div className="flex items-center">
            <ArrowUpCircle className="w-4 h-4 mr-1 text-orange-500" />
            <span>{story.points} points</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-1 text-blue-500" />
            <span>{story.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-green-500" />
            <span>{new Date(story.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full dark:text-gray-300 dark:hover:text-white hover:bg-primary hover:text-white transition-colors duration-300"
          onClick={() => window.open(story.url, '_blank')}
        >
          Read More <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;