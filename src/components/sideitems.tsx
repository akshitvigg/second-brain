import { useNavigate } from "react-router-dom";
import { AllIcon } from "../icons/allicon";
import { AudioIcons } from "../icons/audio";
import { ImageIcon } from "../icons/image";
import { InstaIcons } from "../icons/instagram";
import { LogoutIcon } from "../icons/logout";
import { NoteIcon } from "../icons/note";
import { TwitterIcon } from "../icons/twittericon";
import { YTIcon } from "../icons/ytIcons";
import { toast } from "react-toastify";

interface SideItemsProps {
  onItemClick: (contentType: string | null) => void;
}

export const SideItems = ({ onItemClick }: SideItemsProps) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    toast.success("You have logged out successfully");
  };

  return (
    <div className="ml-5 font-poppins ">
      <div
        className="flex transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 items-center p-3 text-[#414D5D]"
        onClick={() => onItemClick(null)}
      >
        <AllIcon size={20} />
        <p className="pl-5 font-bold">All Content</p>
      </div>
      <div
        className="flex transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 items-center p-3 text-[#414D5D]"
        onClick={() => onItemClick("twitter")}
      >
        <TwitterIcon size="sidebar" />
        <p className="pl-5 font-bold">Tweets</p>
      </div>
      <div
        className="p-3 transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex items-center text-[#414D5D]"
        onClick={() => onItemClick("youtube")}
      >
        <YTIcon size="sidebar" />
        <p className="pl-5 font-bold">Videos</p>
      </div>
      <div
        className="p-3 transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex items-center text-[#414D5D]"
        onClick={() => onItemClick("instagram")}
      >
        <InstaIcons size="sidebar" />
        <p className="pl-5 font-bold">Instagram</p>
      </div>
      <div
        className="p-3 transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex items-center text-[#414D5D]"
        onClick={() => onItemClick("image")}
      >
        <ImageIcon size="lg" />
        <p className="pl-5 font-bold">Images</p>
      </div>
      <div
        className="p-3 transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex items-center text-[#414D5D]"
        onClick={() => onItemClick("audio")}
      >
        <AudioIcons size="lg" />
        <p className="pl-5 font-bold">Audios</p>
      </div>
      <div
        className="p-3 transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex items-center text-[#414D5D]"
        onClick={() => onItemClick("medium")}
      >
        <NoteIcon size={20} />
        <p className="pl-5 font-bold">Articles</p>
      </div>
      <div
        className="p-3 i transition duration-200 hover:cursor-pointer hover:bg-gray-200 w-48 flex  text-[#414D5D]"
        onClick={logout}
      >
        <LogoutIcon size={20} />
        <p className="pl-5 font-bold">Logout</p>
      </div>
    </div>
  );
};
