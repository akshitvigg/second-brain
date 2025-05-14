import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/brain.png";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";

export const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.querySelector("html")?.classList.toggle("dark");
  };

  return (
    <div className="font-poppins text-gray-900 dark:text-neutral-100 dark:bg-[#0D1117] min-h-screen transition-colors duration-300">
      <div className="bg-white/70  dark:bg-[#0D1117]/70 flex justify-between items-center rounded-md border border-gray-200 dark:border-neutral-700 backdrop-blur-lg sticky top-0 z-20 p-4 mx-4 md:mx-16 translate-y-4 shadow-sm dark:shadow-xl">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-8 md:w-[34px] dark:filter dark:brightness-110"
          />
          <p className="pl-2 text-xl md:text-2xl font-bold tracking-tight dark:text-neutral-200">
            SecondBrain
          </p>
        </div>

        <div className="hidden items-center md:flex pr-10">
          <button
            onClick={toggleDarkMode}
            className="hidden mr-2 sm:block p-2 rounded-full bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="text-yellow-400" size={20} />
            ) : (
              <Moon className="text-gray-600" size={20} />
            )}
          </button>
          <button className="pr-6 text-gray-500 dark:text-neutral-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            Home
          </button>
          <ScrollLink
            to="features"
            smooth={true}
            duration={500}
            className="pr-6 text-gray-500 dark:text-neutral-300 hover:cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Features
          </ScrollLink>
          <ScrollLink
            to="how-it-works"
            smooth={true}
            duration={500}
            className="pr-6 text-gray-500 dark:text-neutral-300 hover:cursor-pointer hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            How It Works
          </ScrollLink>
        </div>

        <button
          className="md:hidden p-2 dark:text-neutral-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed top-20 right-4 left-4 bg-white dark:bg-neutral-800 rounded-md border border-gray-200 dark:border-neutral-700 shadow-lg z-10 p-4">
          <div className="flex flex-col space-y-4">
            <button className="text-gray-500 dark:text-neutral-300 hover:cursor-pointer hover:text-gray-800 dark:hover:text-white text-left transition-colors">
              Home
            </button>
            <ScrollLink
              to="features"
              smooth={true}
              duration={500}
              className="text-gray-500 dark:text-neutral-300 hover:cursor-pointer hover:text-gray-800 dark:hover:text-white text-left transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </ScrollLink>
            <ScrollLink
              to="how-it-works"
              smooth={true}
              duration={500}
              className="text-gray-500 dark:text-neutral-300 hover:cursor-pointer hover:text-gray-800 dark:hover:text-white text-left transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </ScrollLink>
          </div>
        </div>
      )}

      <div>
        <div className="relative pl-16 md:pl-72 -translate-y-4">
          <img
            src={logo}
            className="w-6 md:w-[30px] dark:filter dark:brightness-110"
            alt="Logo decoration"
          />
        </div>
        <div className="flex justify-end pr-8 md:pr-16 relative -translate-y-16">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Purple%20Heart.png"
            alt="Purple Heart"
            className="w-8 md:w-[50px] dark:brightness-125"
          />
        </div>
        <div className="flex justify-center sm:-translate-y-32 -translate-y-28 ">
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Blue%20Heart.png"
            alt="Blue Heart"
            className="w-8 md:w-[50px] dark:brightness-125"
          />
        </div>

        <div data-aos="fade-up" className="px-4 md:px-0">
          <h1 className="text-center text-4xl md:text-[80px] font-bold leading-tight dark:text-neutral-100">
            Organize and Share Your
            <br />
            Brain with Ease!
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 text-lg md:text-xl text-center mt-4">
            A platform to structure your ideas, share your knowledge, and
            collaborate seamlessly.
          </p>
          <div className="pt-7 flex justify-center gap-4">
            <Link to="/signup">
              <Button
                space={true}
                text="Get Started"
                variant="primary"
                size="lg"
              />
            </Link>
            <ScrollLink to="features" smooth={true} duration={500}>
              <Button text="Learn More" variant="secondary" size="lg" />
            </ScrollLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
