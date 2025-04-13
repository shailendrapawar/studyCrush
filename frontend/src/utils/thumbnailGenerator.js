function getYoutubeThumbnailFromURL(url) {
    try {
      const parsed = new URL(url);
      let videoId = '';
  
      // Handle both formats
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.split('/')[1];
      } else if (parsed.hostname.includes('youtube.com')) {
        videoId = parsed.searchParams.get('v');
      }
  
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
      
      return null; // Invalid or not a video link
    } catch (e) {
      return null; // Not a valid URL
    }
  }
export default getYoutubeThumbnailFromURL  