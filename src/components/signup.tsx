import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { useRef, useState } from "react";
import axios from "axios";
import { Loader } from "./loader";
import { AuthInputcomp } from "./authinput";
import { z } from "zod";
import { EyeOff, Eye } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inputSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have at least 3 characters" })
    .max(10, { message: "Username can have at most 10 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" })
    .max(20, { message: "Password can have at most 20 characters" })
    .regex(/\W/, { message: "Password must contain a special character" })
    .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain a lowercase letter" }),
});

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const signup = async () => {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      inputSchema.parse({ username, password });
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        setError(validationError.errors[0].message);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("https://secondbrain-5u8x.onrender.com/api/v1/signup", {
        username,
        password,
      });
      // alert("You have successfully signed up!");
      toast.success("You have successfully signed up!");
      navigate("/signin");
    } catch (err) {
      setError("Signup failed. Please try again later.");
      toast.warning("Signup failed. Please try again later.");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-24 font-poppins justify-center bg-white min-h-screen p-8 bg-pattern">
      <div className="border-gray-200 border bg-white h-custom-h shadow-md rounded-lg w-full max-w-sm p-6">
        <div className="pt-4 flex justify-center">
          <p className="w-full text-3xl font-bold text-center">
            Sign Up and Sync Your Ideas!
          </p>
        </div>

        <div className="pt-5 flex justify-center">
          <AuthInputcomp reference={usernameRef} placeholder="Username" />
        </div>

        <div className="pt-4 flex justify-center relative">
          <AuthInputcomp
            reference={passwordRef}
            placeholder="Password"
            type={type}
          />
          <button
            onClick={handleToggle}
            className="absolute right-4 top-1/2 transform translate-y-1  sm:translate-x-6 translate-x-9"
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
