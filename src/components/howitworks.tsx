import { LogIn, PlusCircle, Share2, Users, FolderOpen } from "lucide-react";

const Step = ({ icon: Icon, title, description, index, isLast }: any) => (
  <div className="flex items-start gap-6">
    <div className="flex flex-col items-center">
      <div className="bg-purple-600 dark:bg-purple-700 p-3 rounded-full">
        <Icon size={24} className="text-white" />
      </div>
      {!isLast && (
        <div className="w-px h-24 bg-blue-200 dark:bg-neutral-700 my-2" />
      )}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-100 mb-2">
        {index}. {title}
      </h3>
      <p className="text-gray-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const HowItWorks = () => {
  const steps = [
    {
      icon: LogIn,
      title: "Sign Up & Sign In",
      description:
        "Get started by signing up with a simple form. Once registered, you'll have access to your personalized dashboard. If you're a returning user, simply sign in with your credentials to access your content and start sharing.",
    },
    {
      icon: PlusCircle,
      title: "Add Content",
      description:
        "Once you're logged in, you can add your thoughts, ideas, or content easily. Whether it's text, images, or links, our platform provides an intuitive interface to capture and organize your brainpower.",
    },
    {
      icon: Share2,
      title: "Share Your Brain",
      description:
        "Have an idea you want to share? Use the Share Brain feature to present your content to others, gather feedback, or collaborate. Sharing is made simple, allowing others to interact with and contribute to your content.",
    },
    {
      icon: Users,
      title: "Collaborate & Connect",
      description:
        "Interact with other users' shared content. Collaborate on ideas, discuss, and offer suggestions to help each other grow.",
    },
    {
      icon: FolderOpen,
      title: "Stay Organized",
      description:
        "With everything neatly organized, you can easily find and track your ideas, ensuring your creative process stays smooth and productive.",
    },
  ];

  return (
    <div className="py-16 mb-12 px-4 font-poppins bg-gray-50 dark:bg-[#0D1117] border border-gray-200 dark:border-neutral-800 rounded-md shadow-lg mr-5 ml-5 dark:mr-0 dark:ml-0 transition-colors duration-300 dark:rounded-none dark:mb-0">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold text-center text-gray-900 dark:text-neutral-100 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
          Our platform allows you to seamlessly create, manage, and share your
          ideas, making it easier to brainstorm and collaborate with others.
          Here's how it works:
        </p>
        <div className="space-y-8">
          {steps.map((step, index) => (
            <Step
              key={index}
              {...step}
              index={index + 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
        <p className="text-gray-600 dark:text-neutral-400 text-center mt-12">
          Whether you're sharing your ideas with the world or collaborating on a
          project, our platform ensures your ideas come to life in a simple,
          user-friendly environment.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
