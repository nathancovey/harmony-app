import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface YouTubeEmbedProps {
  videoId: string;
}

export function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[400px] shadow-lg rounded-lg overflow-hidden bg-white dark:bg-zinc-900">
      <div className="flex justify-end p-2 bg-white dark:bg-zinc-900">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0" 
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="relative pb-[56.25%] h-0">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
}
