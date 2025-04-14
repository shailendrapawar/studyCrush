import toast from "react-hot-toast";

function getThumbnailFromURL(url, linkType) {

  console.log(linkType)
  switch (linkType) {
    case "youtube": { 
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

        toast.error("Invalid or not a video link")
        return null; 
        // Invalid or not a video link
      } catch (e) {
        toast.error("Not a valid URL")
        return null; // Not a valid URL
      }
      break;
    }

    case "google": {

      // Match Google Drive file ID from typical URLs
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = url.match(regex);
      const size = "w320"

      if (!match || !match[1]) {
        // console.warn("Invalid Google Drive link");
        toast.error("Invalid or private link")
        return null;
      }

      const fileId = match[1];
      return `https://drive.google.com/thumbnail?authuser=0&sz=${size}&id=${fileId}`;
      break;
    }

    default:null
  }
}
export default getThumbnailFromURL  