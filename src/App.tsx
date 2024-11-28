import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/signup";
import { SignIn } from "./components/signin";
import { CreateContentModal } from "./components/CreateContentModal";
import { ShareBrain } from "./components/ShareBrain";
import { SideBar } from "./components/sidebar";
import { Loader } from "./components/loader";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sharemodalOpen, setshareModalOpen] = useState(false);
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
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
