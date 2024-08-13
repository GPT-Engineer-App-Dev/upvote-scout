import React from 'react';
import { Badge } from "@/components/ui/badge";

const TrendingTopics = () => {
  const topics = ['React', 'AI', 'Blockchain', 'Startups', 'Cybersecurity'];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Trending Topics</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <Badge key={topic} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
            {topic}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;