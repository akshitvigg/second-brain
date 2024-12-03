import { useRef, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/signup";
import { SignIn } from "./components/signin";
import { CreateContentModal } from "./components/CreateContentModal";
import { ShareBrain } from "./components/ShareBrain";
import { SideBar } from "./components/sidebar";
import SharedContent from "./components/sharesidebar";
import { LandingPage } from "./components/landingPage";
import Features from "./components/features";
import HowItWorks from "./components/howitworks";
import { Footer } from "./components/footer";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharemodalOpen, setshareModalOpen] = useState(false);

  const Homecontent = () => {
    const featuresRef = useRef(null);
    const howItWorksRef = useRef(null);
    return (
      <>
        <LandingPage />
        <div ref={featuresRef} id="features">
          <Features />
        </div>
        <div ref={howItWorksRef} id="how-it-works">
          <HowItWorks />
        </div>
        <Footer />
      </>
    );
  };

  return (
    <>
      <CreateContentModal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
      />
      <ShareBrain
        onClose={() => setshareModalOpen(false)}
        open={sharemodalOpen}
      />

      <BrowserRouter>
        <Routes>
          <Route
            path="/sidebar"
            element={
              <SideBar
                setshareModalOpen={setshareModalOpen}
                setModalOpen={setModalOpen}
              />
            }
          />
          <Route path="/" element={<Homecontent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/shared/:sharelink" element={<SharedContent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
