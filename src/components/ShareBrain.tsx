import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Loader } from "./loader";
import { Copy, Link, X } from "lucide-react";

export const ShareBrain = ({ open, onClose }: any) => {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [isLinkGenerated, setIsLinkGenerated] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  useEffect(() => {
    const storedLink = localStorage.getItem("shareLink");
    const storedFlag = localStorage.getItem("isLinkGenerated");

    if (storedLink) {
      setShareLink(storedLink);
      setIsLinkGenerated(storedFlag === "true");
    }
  }, []);

  const generateShareLink = async () => {
    setLoading(true);
    try {
      const response: any = await axios.post(
        "https://secondbrain-5u8x.onrender.com/api/v1/share",
        { share: true },
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      const link = `https://secondbrain-5u8x.onrender.com/api/v1/${response.data.message}`;
      setShareLink(link);
      setIsLinkGenerated(true);

      localStorage.setItem("shareLink", link);
      localStorage.setItem("isLinkGenerated", "true");
    } catch (error) {
      console.error("Error generating share link:", error);
    } finally {
      setLoading(false);
    }
  };

  const disableShareLink = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://secondbrain-5u8x.onrender.com/api/v1/share",
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
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink).then(() => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(null), 2000);
      });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed font-poppins  inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Link className="text-blue-500" size={48} />
          </div>

          {isLinkGenerated ? (
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-700 truncate mr-2">
                  {shareLink}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Copy size={20} />
                </button>
              </div>

              {copySuccess && (
                <p className="text-green-600 text-sm">{copySuccess}</p>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={disableShareLink}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      <X size={16} />
                      <span>Disable Share Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">
                Generate a shareable link for your second brain
              </p>
              <Button
                size="lg"
                text={loading ? <Loader /> : "Generate Share Link"}
                variant="primary"
                center={true}
                onClick={generateShareLink}
                disabled={loading}
                width="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
