"use client";
import React, { useState, useEffect } from "react";
import { authenticate } from "@lib/actions";
import Link from "next/link";
import { validatePassword } from "@/lib/passwordUtils";
import { validateEmail } from "@/lib/emailUtils";
import { signInActionGoogle } from "@/utils/signInActionGoogle";
import { signInActionDiscord } from "@/utils/signInActionDiscord";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationErrors = validatePassword(password);

    if (emailValidationError || passwordValidationErrors.length > 0) {
      setEmailError(emailValidationError);
      setPasswordErrors(passwordValidationErrors);
    } else {
      setEmailError("");
      setPasswordErrors([]);

      const promise = authenticate(email, password);

      toast
        .promise(promise, {
          loading: "Logging in...",
          success: "Logged in successfully!",
          error: (err) => err.message || "Failed to log in",
        })
        .then((data) => {
          console.log("Success:", data);
          // Redirect or other success actions
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    setIsButtonActive(email !== "" && password !== "");
  }, [email, password]);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-900 text-white flex flex-col justify-center items-start w-full sm:w-1/2 min-w-[300px] px-8 sm:px-12 lg:px-24 xl:px-40 2xl:px-[13%]">
        <h2 className="mt-2 mb-2 text-left text-4xl font-bold">Welcome</h2>
        <p className="mb-6 mt-3 text-left">Log in to GeeseHacks!</p>
        <div className="flex flex-col gap-4 w-full mb-6">
          <form
            className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
            action={signInActionGoogle}
          >
            <button className="flex gap-2">
              <img
                src="/static/icons/google-icon.png"
                alt="Google"
                className="h-6 w-6"
              />
              Log in with Google
            </button>
          </form>
          <form
            className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
            action={signInActionDiscord}
          >
            <button className="flex gap-2">
              <img
                src="/static/icons/discord-icon.png"
                alt="Google"
                className="h-6 w-7"
              />
              Log in with Discord
            </button>
          </form>
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="border-t border-gray-600 flex-grow mr-2"></div>
          <span>OR</span>
          <div className="border-t border-gray-600 flex-grow ml-2"></div>
        </div>
        <form className="flex flex-col gap-4 w-full" noValidate>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
          )}
          
          <div className="flex flex-row justify-between items-center">
            <Label
              htmlFor="password"
              >
              Password
            </Label>
            <Link href="/#">
              <Button type="button" variant="link" className="text-blue-400 p-0 h-auto">
                Forgot Password?
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Input
              type={passwordVisibility ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-11"
            />
            <div
              onClick={() => setPasswordVisibility((prev) => !prev)}
              className="password-toggle-icon absolute inset-y-0 right-3 flex items-center"
            >
              {passwordVisibility ?  <BiHide className="mr-1 text-xl"/> : <BiShow className="mr-1 text-xl"/>}
            </div>
          </div>
          {passwordErrors.length > 0 && (
            <ul className="text-red-500 text-sm mt-2 list-disc list-inside">
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <Button
            // ======= Handle form submit ========
            onClick={handleClick}
            aria-disabled={isButtonActive ? "false" : "true"}
            // ===================================
            type="submit"
            className={`py-2 mt-4`}
            disabled={!isButtonActive}
          >
            Log in
          </Button>
        </form>
        <div className="flex w-full">
          <p className="mt-4 text-gray-400 text-center text-sm w-full">
            Don't have an account?{" "}
            <Link href="/signup">
              <Button variant="link" className="text-blue-400 p-0 h-auto">
                Sign up
              </Button>
            </Link>
          </p>
        </div>
      </div>
      <div
        className="bg-cover bg-center w-0 sm:w-1/2"
        style={{ backgroundImage: "url('/static/images/background.png')" }}
      ></div>
    </div>
  );
};

export default Login;
