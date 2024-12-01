import { useRef, useState } from "react";

import { InputComp } from "./input";
import { Button } from "./button";
import axios from "axios";
import { Loader } from "./loader";
import { X } from "lucide-react";

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
        <div className=" font-apple fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative h-[700] w-full max-w-md bg-white rounded-md p-6 flex flex-col">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">Add Content</h2>

            <div className="flex-grow">
              <div className="mb-4 flex justify-center">
                <InputComp
                  width="full"
                  reference={titleRef}
                  placeholder="title"
                />
                
              </div>

              <div className="mb-4 flex justify-center  ">
                <InputComp
                  width="full"
                  reference={linkRef}
                  placeholder="link"
                />
                
              </div>

              <div className="mt-6">
                <h3 className="text-xl text-gray-600 font-bold text-center mb-4">
                  Content Type  
                </h3>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.values(ContentType).map((contentType) => (
                    <Button
                      key={contentType}
                      size="sm"
                      text={contentType}
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
                  <p className="text-red-500 text-sm mt-2 text-center">
                    {errors.type}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <Button
                onClick={addcontent}
                modalwidth="full"
                center={true}
                variant="primary"
                size="lg"
                text={loading ? <Loader /> : "Submit"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
