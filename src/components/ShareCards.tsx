import { NoteIcon } from "../icons/note";
import { useEffect } from "react";
import { format } from "date-fns";
import { YTIcon } from "../icons/ytIcons";
import { TwitterIcon } from "../icons/twittericon";
import { ImageIcon } from "../icons/image";
import { AudioIcons } from "../icons/audio";
import { InstaIcons } from "../icons/instagram";

interface CardProps {
  title: string;
  link: string;
  type: string;
  contentId: string;
}
enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Image = "image",
  Audio = "audio",
  Medium = "medium",
  Instagram = "instagram",
}
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export const ShareCard = (props: CardProps) => {
  const currentDate = new Date();
  const formattedDate = format(new Date(currentDate), "dd/MM/yy");

  const renderIcon = () => {
    switch (props.type) {
      case ContentType.Youtube:
        return <YTIcon size="cards" />;
      case ContentType.Twitter:
        return <TwitterIcon size="cards" />;
      case ContentType.Image:
        return <ImageIcon size="md" />;
      case ContentType.Audio:
        return <AudioIcons size="md" />;
      case ContentType.Medium:
        return <NoteIcon size={18} />;
      case ContentType.Instagram:
        return <InstaIcons size="cards" />;
      default:
    }
  };

  useEffect(() => {
   
    const addTwitterTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const twitterScriptElement = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      
      if (twitterScriptElement) {
        window.twttr?.widgets.load();
        const twitterEmbeds = document.querySelectorAll('.twitter-tweet');
        twitterEmbeds.forEach((embed) => {
          embed.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        });
      }
    };

    if (props.link.includes("twitter.com") || props.link.includes("x.com")) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = addTwitterTheme;


      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            addTwitterTheme();
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      return () => {
        document.body.removeChild(script);
        observer.disconnect();
      };
    }
  }, [props.link]);

  useEffect(() => {

    const addInstagramTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      const instaEmbeds = document.querySelectorAll('.instagram-media');
      instaEmbeds.forEach((embed) => {
        embed.classList.toggle('dark-theme', isDarkMode);
      });
    };

    if (props.link.includes("instagram.com")) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        window.instgrm?.Embeds.process();
        addInstagramTheme();
      };

      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            addInstagramTheme();
          }
        });
      });

      observer.observe(document.documentElement, { attributes: true });

      return () => {
        document.body.removeChild(script);
        observer.disconnect();
      };
    }
  }, [props.link]);

  const renderContent = () => {
    let adjustedLink = props.link;
    if (props.link.includes("x.com")) {
      adjustedLink = props.link.replace("x.com", "twitter.com");
    }

    if (adjustedLink.includes("twitter.com")) {
      return (
        <div
          className="overflow-hidden mt-4 w-full max-w-full dark:bg-[#1A1E24] bg-gray-50"
          style={{
            maxWidth: "400px",
            height: "250px",
            overflowY: "scroll",
            overflowX: "hidden",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <blockquote
            className="twitter-tweet w-full"
            data-theme="light"
            style={{
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <a href={adjustedLink}></a>
          </blockquote>
        </div>
      );
    }

    if (
      adjustedLink.includes("youtube.com") ||
      adjustedLink.includes("youtu.be")
    ) {
      const videoId = adjustedLink.includes("youtube.com")
        ? new URL(adjustedLink).searchParams.get("v")
        : adjustedLink.split("/").pop();

      if (videoId) {
        return (
          <iframe
            className="w-full mt-5 h-48 rounded-lg shadow-md dark:border dark:border-gray-800"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      }
      return <p>Invalid YouTube link</p>;
    }

    if (adjustedLink.includes("medium.com")) {
      return (
        <div className="pt-4 dark:text-gray-300">
          <p>Read the full article on Medium:</p>
          <a 
            href={adjustedLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {adjustedLink}
          </a>
        </div>
      );
    }

    if (adjustedLink.includes(".mp3") || adjustedLink.includes(".ogg")) {
      return (
        <div className="pt-6 rounded-lg w-full mt-4 dark:bg-[#1A1E24]">
          <audio controls className="rounded-lg w-full max-w-full dark:bg-gray-800">
            <source src={adjustedLink} type="audio/ogg" />
            <source src={adjustedLink} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    if (adjustedLink.includes("instagram.com")) {
      return (
        <div
          className="overflow-hidden mt-4 w-full max-w-full dark:bg-[#1A1E24]"
          style={{
            maxWidth: "400px",
            height: "250px",
            overflowY: "scroll",
            overflowX: "hidden",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <blockquote
            className="instagram-media w-full"
            data-instgrm-permalink={adjustedLink}
            data-instgrm-version="14"
            style={{
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          ></blockquote>
        </div>
      );
    }

    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    if (imageExtensions.some((ext) => adjustedLink.endsWith(ext))) {
      const imageUrl = adjustedLink.split("?")[0];

      return (
        <div className="mt-4 rounded-lg overflow-hidden w-full max-w-full">
          <img
            src={imageUrl}
            alt="Image content"
            className="w-full max-h-80 object-cover"
          />
        </div>
      );
    }

    return <p>Unsupported link type</p>;
  };

  return (
    <>
      <div className="p-4 h-auto font-poppins dark:bg-[#1A1E24] dark:border-gray-800 border-gray-200 border shadow-md bg-white rounded-lg w-full transition duration-200 hover:scale-105 hover:shadow-lg dark:hover:bg-gray-900 hover:bg-gray-100">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="pr-2 ml-3  ">{renderIcon()}</div>
            <p className="text-lg dark:text-gray-200 text-gray-800">{props.title}</p>
          </div>
          <div className="flex items-center">
            
          
          </div>
        </div>
        <div>{renderContent()}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400 pt-2 flex items-end">
          Added on {formattedDate}
        </div>
      </div>
    </>
  );
};