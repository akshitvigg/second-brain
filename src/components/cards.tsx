import { Bin } from "../icons/bin";
import { NoteIcon } from "../icons/note";
import { Share } from "../icons/share";
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
export const Card = (props: CardProps) => {
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
    if (props.link.includes("twitter.com") || props.link.includes("x.com")) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
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
          className="overflow-hidden mt-4 w-full max-w-full"
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
            className="w-full mt-5 h-48 rounded-lg"
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
        <div className="pt-4">
          <p>Read the full article on Medium:</p>
          <a href={adjustedLink} target="_blank" rel="noopener noreferrer">
            {adjustedLink}
          </a>
        </div>
      );
    }

    if (adjustedLink.includes(".mp3") || adjustedLink.includes(".ogg")) {
      return (
        <div className=" pt-6 rounded-lg w-full mt-4">
          <audio controls className="rounded-lg w-full max-w-full">
            <source src={adjustedLink} type="audio/ogg" />
            <source src={adjustedLink} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
    if (adjustedLink.includes("instagram.com")) {
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      }, [adjustedLink]);

      return (
        <div
          className="overflow-hidden mt-4 w-full max-w-full"
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
      <div className="p-4 h-auto font-apple border-gray-200 border shadow-md bg-white rounded-lg w-full transition duration-200 hover:scale-105 hover:shadow-lg hover:bg-gray-100">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="pr-2 ml-3">{renderIcon()}</div>
            <p className=" font-apple text-lg">{props.title}</p>
          </div>
          <div className="flex items-center">
            <div className="pr-4 text-gray-600">
              <Share size="md" />
            </div>
            <div className="pr-3 text-gray-600">
              <Bin contentId={props.contentId} size="md" />
            </div>
          </div>
        </div>
        <div>{renderContent()}</div>
        <div className=" text-sm text-gray-500 pt-2 flex items-end">
          Added on {`${formattedDate} " `}
          {props.contentId}
        </div>
      </div>
    </>
  );
};
