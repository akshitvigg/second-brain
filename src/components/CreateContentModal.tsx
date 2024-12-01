import { useRef, useState } from "react";
import { InputComp } from "./input";
import { Button } from "./button";
import axios from "axios";
import { Loader } from "./loader";
import { X, PlusCircle } from "lucide-react";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  Image = "image",
  Audio = "audio",
  Medium = "medium",
  Instagram = "instagram",
}

export const CreateContentModal = ({ open, onClose }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    link?: string;
    type?: string;
  }>({});

  const validateInputs = () => {
    const newErrors: {
      title?: string;
      link?: string;
      type?: string;
    } = {};

    if (!titleRef.current?.value.trim()) {
      newErrors.title = "Title is required";
    }

    if (!linkRef.current?.value.trim()) {
      newErrors.link = "Link is required";
    } else {
      const urlPattern = new RegExp(
        "^(https?:\\/\\/)?" +
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
          "((\\d{1,3}\\.){3}\\d{1,3}))" +
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
          "(\\?[;&a-z\\d%_.~+=-]*)?" +
          "(\\#[-a-z\\d_]*)?$",
        "i"
      );
      if (!urlPattern.test(linkRef.current?.value.trim())) {
        newErrors.link = "Invalid URL format";
      }
    }

    if (!type) {
      newErrors.type = "Content type is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  async function addcontent() {
    if (!validateInputs()) {
      return;
    }

    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    setLoading(true);

    try {
      const newContent = { title, link, type };

      setContent([...content, newContent]);

      await axios.post(
        "https://secondbrain-5u8x.onrender.com/api/v1/content",
        newContent,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (titleRef.current) titleRef.current.value = "";
      if (linkRef.current) linkRef.current.value = "";
      setErrors({});
    } catch (error) {
      console.error("Error adding content:", error);
      alert("There was an error adding the content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative sm:w-full w-80 max-w-md bg-white rounded-xl shadow-2xl border border-gray-100 p-8 transform transition-all duration-300 ease-in-out">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full p-1 hover:bg-gray-100"
            >
              <X size={24}  />
            </button>
            
            <div className="flex flex-col items-center mb-6">
              <PlusCircle size={48} className="text-blue-500 mb-4" strokeWidth={1.5} />
              <h2 className="text-2xl font-semibold text-gray-800">Add New Content</h2>
              <p className="text-gray-500 text-sm mt-2">Share your resource</p>
            </div>

            <div className="space-y-4">
              <div className=" flex justify-center">
                <div>
                <InputComp
                  width="full"
                  modal={true}
                  reference={titleRef}
                  placeholder="Content Title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1 pl-1">{errors.title}</p>
                )}
                </div>
              </div>

              <div className=" flex justify-center">
                <div>
                <InputComp
                  width="full"
                  modal={true}
                  reference={linkRef}
                  placeholder="Paste Link Here"
                />
                {errors.link && (
                  <p className="text-red-500 text-xs mt-1 pl-1">{errors.link}</p>
                )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm text-gray-600 font-medium text-center mb-4">
                  Select Content Type
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.values(ContentType).map((contentType) => (
                    <Button
                      key={contentType}
                      size="sm"
                      text={contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                      variant={type === contentType ? "primary" : "secondary"}
                      onClick={() => {
                        setType(contentType);
                        if (errors.type) {
                          setErrors((prev) => ({ ...prev, type: undefined }));
                        }
                      }}
                    />
                  ))}
                </div>
                {errors.type && (
                  <p className="text-red-500 text-xs mt-2 text-center">
                    {errors.type}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                onClick={addcontent}
                modalwidth="full"
                center={true}
                variant="primary"
                size="lg"
                modal={true}
                text={loading ? <Loader /> : "Submit Content"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};