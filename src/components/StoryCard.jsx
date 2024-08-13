import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare } from 'lucide-react';

const StoryCard = ({ story }) => {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow pt-6">
        <h2 className="text-lg font-semibold mb-2 line-clamp-2">{story.title}</h2>
        <p className="text-sm text-gray-500 mb-2">By {story.author}</p>
        <p className="text-sm text-gray-500">
          {story.points} points | {story.num_comments} comments
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(story.url, '_blank')}
        >
          Read <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`https://news.ycombinator.com/item?id=${story.objectID}`, '_blank')}
        >
          Comments <MessageSquare className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;