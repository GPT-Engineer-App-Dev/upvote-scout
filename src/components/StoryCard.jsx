import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare, ThumbsUp, Clock, User, Bookmark } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from '../hooks/useLocalStorage';

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

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="flex-grow pt-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 flex-grow">
            <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
          </h2>
          <Badge variant="secondary" className="ml-2 whitespace-nowrap">
            {story._tags[0]}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
          <User className="w-4 h-4 mr-1" /> {story.author}
        </p>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
          <span className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {story.points}
          </span>
          <span className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            {story.num_comments}
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {new Date(story.created_at).toLocaleDateString()}
          </span>
        </div>
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
        <Button
          variant={isSaved ? "secondary" : "outline"}
          size="sm"
          onClick={toggleSave}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoryCard;