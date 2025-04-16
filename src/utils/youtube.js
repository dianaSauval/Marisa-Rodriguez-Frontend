export const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";

  const videoIdMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};
