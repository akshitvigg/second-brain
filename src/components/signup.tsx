import { Link, useNavigate } from "react-router-dom";
import { InputComp } from "./input";
import { Button } from "./button";
import { useRef, useState } from "react";
import axios from "axios";
import { Loader } from "./loader";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("https://secondbrain-5u8x.onrender.com/api/v1/signup", {
        username,
        password,
      });
      alert("You have successfully signed up!");
      navigate("/signin");
    } catch (err) {
      setError("Signup failed. Please try again later.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex font-apple pt-24 justify-center bg-white min-h-screen p-8 bg-pattern">
      <div className="border-gray-200 border bg-white h-custom-h shadow-md rounded-lg w-full max-w-sm p-6">
        <div className="pt-4 flex justify-center">
          <p className="w-full text-3xl font-bold text-center">
            Sign Up and Sync Your Ideas!
          </p>
        </div>

        <div className="pt-5 flex justify-center">
          <InputComp reference={usernameRef} placeholder="Username" />
        </div>

        <div className="pt-4 flex justify-center">
          <InputComp reference={passwordRef} placeholder="Password" />
        </div>

        {error && (
          <div className="pt-4 flex justify-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        <div className="pt-6 flex justify-center">
          <Button
            onClick={signup}
            size="lg"
            variant="primary"
            center={true}
            width="full"
            text={loading ? <Loader /> : "Sign Up"}
            disabled={loading}
          />
        </div>

        <div className="pt-4 flex justify-center">
          <p className="text-sm text-gray-500 text-center">
            Already a member?{" "}
            <span className="text-[#414D5D] cursor-pointer">
              <Link to="/signin">
                <button>Sign In</button>
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
