import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useRef, useState } from "react";
import axios from "axios";
import { Loader } from "./loader";
import { AuthInputcomp } from "./authinput";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignIn = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState<any>(EyeOff);

  const handleToggle = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Username and password are required.");
      toast.warning("Username and password are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: any = await axios.post(
        "https://second-brain-backend-4.onrender.com/api/v1/signin",
        { username, password }
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      // alert("You have successfully signed in!");
      toast.success("You have successfully signed in!");
      navigate("/sidebar");
    } catch (err) {
      setError("Signin failed. Please check your credentials.");
      toast.warning("Signin failed. Please check your credentials.");
      console.error("Signin error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-poppins  pt-24 justify-center bg-white min-h-screen p-8 bg-pattern">
      <div className="border-gray-200 border bg-white h-custom-h shadow-md rounded-lg w-full max-w-sm p-6">
        <div className="pt-4 flex justify-center">
          <p className="w-full text-3xl  font-bold text-center">
            Welcome to Second Brain!
          </p>
        </div>

        <div className="pt-5 flex justify-center">
          <AuthInputcomp reference={usernameRef} placeholder="Username" />
        </div>

        <div className="pt-4 flex justify-center relative">
          <AuthInputcomp
            reference={passwordRef}
            type={type}
            placeholder="Password"
          />
          <button
            onClick={handleToggle}
            className="absolute right-4 top-1/2 transform translate-y-1  translate-x-9 sm:translate-x-6"
          >
            {type === "password" ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && (
          <div className="pt-4 flex justify-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="pt-6 flex justify-center">
          <Button
            onClick={signin}
            size="lg"
            variant="primary"
            center={true}
            width="full"
            text={loading ? <Loader /> : "Sign In"}
            disabled={loading}
          />
        </div>

        <div className="pt-4 flex justify-center">
          <p className="text-sm text-gray-500 text-center">
            Haven't registered yet?{" "}
            <span className="text-[#414D5D] cursor-pointer">
              <Link to={"/signup"}>
                <button>Sign Up</button>
              </Link>
            </span>
          </p>
        </div>
        <div className="pt-4 flex justify-center">
          <p className="text-sm text-gray-500 text-center">
            Before registering, read and agree with our{" "}
            <span className="text-[#414D5D]">
              Terms of Service and Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
