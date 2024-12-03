import { Pen, Users, Brain } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="bg-white dark:bg-[#1A1E24] p-6 rounded-lg shadow-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-full mb-4">
      <Icon size={24} className="text-purple-600 dark:text-purple-400" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-neutral-100">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-neutral-400">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: Pen,
      title: "Create Content",
      description: "Effortlessly structure your ideas with intuitive tools.",
    },
    {
      icon: Users,
      title: "Collaborate",
      description:
        "Share your brain with others and work together effectively.",
    },
    {
      icon: Brain,
      title: "Stay Organized",
      description: "Keep all your ideas in one place, accessible anytime.",
    },
  ];

  return (
    <div className="py-12 px-4 font-poppins bg-gray-50 dark:bg-[#0D1117] transition-colors duration-300">
      <h2 className="text-4xl font-semibold text-center mb-12 text-gray-900 dark:text-neutral-100">
        Features
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default Features;
