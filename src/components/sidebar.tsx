import { useState, useEffect, useRef } from "react";
import { Button } from "./button";
import { Plus } from "../icons/plus";
import { Share } from "../icons/share";
import { Menu, Moon, Sun, X } from "lucide-react";
import logo from "../assets/brain.png";
import { MainLogo } from "./logo";
import { Card } from "./cards";
import { SideItems } from "./sideitems";
import { useContent } from "../hooks/useContent";

export const SideBar = ({
  setModalOpen,
  setshareModalOpen,
}: {
  setModalOpen: (state: boolean) => void;
  setshareModalOpen: (state: boolean) => void;
}) => {
  const { content } = useContent();
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleContentSelection = (contentType: string | null) => {
    setSelectedContent(contentType);
    setIsMobileMenuOpen(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector("html")?.classList.toggle("dark");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`flex font-poppins ${isDarkMode ? "dark" : ""}`}>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed sm:relative transition-all duration-300 dark:bg-[#1A1E24] dark:text-gray-200 bg-[#F5F7FA] border-r dark:border-gray-800 border-gray-200 shadow-lg sm:w-80 min-h-screen z-40
          ${
            isMobileMenuOpen ? "w-64 left-0" : "w-0 -left-64"
          } sm:w-80 sm:left-0`}
      >
        <div className="flex items-center justify-center space-x-3 pt-6 pb-4">
          <MainLogo src={logo} size={40} />
          <p className="text-2xl font-bold dark:text-white text-gray-800">
            Second Brain
          </p>
        </div>
        <div className="mt-6">
          <SideItems onItemClick={handleContentSelection} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="bg-white h-screen dark:bg-[#0D1117] dark:text-gray-300 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 px-6">
          <p className="font-bold text-3xl sm:text-2xl text-gray-800 dark:text-white mb-4 sm:mb-0">
            All Notes
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className=" hidden sm:block p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {isDarkMode ? (
                <Sun className="text-yellow-500" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>
            <Button
              onClick={() => setshareModalOpen(true)}
              variant="secondary"
              text="Share Brains"
              size="md"
              startIcons={<Share size="lg" />}
            />
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Contents"
              size="md"
              startIcons={<Plus size="lg" />}
            />
          </div>
        </div>
        <div className="mt-6 mb-7 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-6">
          {content
            .filter(
              ({ type }) => selectedContent === null || type === selectedContent
            )
            .map(({ type, link, title, _id }) => (
              <Card
                key={link}
                contentId={_id}
                title={title}
                type={type}
                link={link}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
