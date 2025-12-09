import React from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ videoId, title = "YouTube video player" }) => {
  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200 group">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      {/* Overlay to prevent interaction, making it a background video */}
      <div className="absolute inset-0 bg-transparent z-10"></div> 
    </div>
  );
};
