import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/brain.png";
import { MainLogo } from "./logo";
import { Card } from "./cards";
import { SideItems } from "./sideitems";

const SharedContent = () => {
  const { sharelink } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);

  const handleContentSelection = (contentType: string | null) => {
    setSelectedContent(contentType);
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `https://secondbrain-5u8x.onrender.com/api/v1/${sharelink}`
        );
        const data = await response.json();
        if (response.ok) {
          setContent(data.content);
          setName(data.username);
        } else {
          setError(data.message || "Error fetching content");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [sharelink]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <div className="transition-all duration-500 bg-white border border-gray-300 shadow-lg sm:w-80 min-h-screen w-0">
        <div className="flex justify-center">
          <div className="mt-5">
            <MainLogo src={logo} size={40} />
          </div>
          <p className="text-2xl font-apple mt-6 ml-3 font-bold">
            Second Brain
          </p>
        </div>
        <div className="mt-7">
          <SideItems onItemClick={handleContentSelection} />
        </div>
      </div>
      <div className="bg-slate-100 w-full">
        <div className="flex justify-between mt-8">
          <p className="flex items-center font-apple font-bold ml-10 text-2xl">
            {`${name}'s Brain`}
          </p>

          <div className="flex mr-6">
            <div className="mr-4"></div>
          </div>
        </div>
        <div className="mt-6 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-4">
          {content
            .filter(
              ({ type }: any) =>
                selectedContent === null || type === selectedContent
            )
            .map((item: any) => (
              <Card
                key={item.id}
                title={item.title}
                link={item.link}
                type={item.type}
                contentId={item.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SharedContent;
