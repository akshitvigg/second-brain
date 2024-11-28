import { Close } from "../icons/close";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "./button";

export const ShareBrain = ({ open, onClose }: any) => {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLinkGenerated, setIsLinkGenerated] = useState<boolean>(false);

  useEffect(() => {
    const storedLink = localStorage.getItem("shareLink");
    const storedFlag = localStorage.getItem("isLinkGenerated");

    if (storedLink) {
      setShareLink(storedLink);
      setIsLinkGenerated(storedFlag === "true");
    }
  }, []);

  const generateShareLink = async () => {
    try {
      const response: any = await axios.post(
        "http://localhost:3000/api/v1/share",
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      setShareLink(`http://localhost:3000/api/v1/${response.data.message}`);
      setIsLinkGenerated(true);

      localStorage.setItem("shareLink", response.data.message);
      localStorage.setItem("isLinkGenerated", "true");
    } catch (error) {
      console.error("Error generating share link:", error);
    }
  };

  const disableShareLink = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/share",
        { share: false },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      setShareLink(null);
      setIsLinkGenerated(false);

      localStorage.removeItem("shareLink");
      localStorage.removeItem("isLinkGenerated");
    } catch (error) {
      console.error("Error disabling share link:", error);
    }
  };

  return (
    <>
      {open && (
        <div className="h-screen font-apple w-screen top-0 left-0 bg-opacity-50 fixed bg-slate-500 flex justify-center items-center">
          <span className="h-custom-h w-custom-h bg-white opacity-100 p-4 rounded-md">
            <div onClick={onClose} className="flex justify-end">
              <Close size="lg" />
            </div>

            <div className="text-center">
              {isLinkGenerated ? (
                <div>
                  <p className="mb-4 text-lg text-green-500">{shareLink}</p>{" "}
                  <button
                    className=" transition-all duration-300 ease-in-out active:scale-95 bg-red-500 hover:bg-red-400 active:bg-red-700 text-white px-4 py-2 rounded-md"
                    onClick={disableShareLink}
                  >
                    Disable Share Link
                  </button>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-lg">No share link generated yet.</p>
                  <Button
                    size="lg"
                    text="Generate Share Link"
                    variant="primary"
                    onClick={generateShareLink}
                  />
                </div>
              )}
            </div>
          </span>
        </div>
      )}
    </>
  );
};
