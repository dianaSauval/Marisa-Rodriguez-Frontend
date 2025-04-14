// src/utils/video.js

export const getEmbedUrl = (url) => {
    if (!url) return "";
  
    // 🎥 YouTube
    const ytMatch = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch && ytMatch[1]) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
  
    // 📁 Google Drive
    const driveMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)\//);
    if (driveMatch && driveMatch[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
  
    // Si no coincide con ningún formato conocido
    return "";
  };
  