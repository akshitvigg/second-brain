import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../assets/brain.png";
import { MainLogo } from "./logo";
import { Moon, Sun } from "lucide-react";
import { SideItems } from "./sideitems";
import { ShareCard } from "./ShareCards";

const SharedContent = () => {
  const { sharelink } = useParams();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [name, setName] = useState<any>(null);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleContentSelection = (contentType: string | null) => {
    setSelectedContent(contentType);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector("html")?.classList.toggle("dark");
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
    <div className="flex font-poppins">
      <div className="transition-all duration-500 dark:bg-[#1A1E24] dark:text-gray-200 bg-[#F5F7FA] border-r dark:border-gray-800 border-gray-200 shadow-lg sm:w-80 min-h-screen w-0">
        <div className="flex justify-center">
          <div className="mt-5">
            <MainLogo src={logo} size={40} />
          </div>
          <p className="text-2xl  mt-6 ml-3 font-bold">
            Second Brain
          </p>
        </div>
        <div className="mt-7">
          <SideItems onItemClick={handleContentSelection} />
        </div>
      </div>
      <div className="bg-white dark:bg-[#0D1117] dark:text-gray-300 w-full">
        <div className="flex justify-between mt-8">
          <p className="flex items-center  font-bold ml-10 text-2xl">
            {`${name}'s Brain`}
          </p>
          <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

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
              <ShareCard
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
