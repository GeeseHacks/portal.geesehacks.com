"use client";
import React, { useState, useEffect } from "react";
import { authenticate } from "@lib/actions";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { validatePassword } from "@/lib/passwordUtils";
import { validateEmail } from "@/lib/emailUtils";
import { signInActionGoogle } from "@/components/utils/signInActionGoogle";
import { signInActionDiscord } from "@/components/utils/signInActionDiscord";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <>
      <Head>
        <title>Login | GeeseHacks</title>
        <meta
          name="description"
          content="Login to the GeeseHacks registration portal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex h-screen">
        <div className="bg-gray-900 text-white flex flex-col justify-center items-start w-full sm:w-1/2 min-w-[300px] px-8 sm:px-12 lg:px-24 xl:px-40 2xl:px-[13%]">
          <h1 className="mt-2 mb-2 text-left text-4xl font-bold">Welcome</h1>
          <p className="mb-6 mt-3 text-left">Log in to GeeseHacks!</p>
          <div className="flex flex-col gap-4 w-full mb-6">
            <form
              className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
              action={signInActionGoogle}
            >
              <button className="flex gap-2">
                <img
                  src="/static/icons/google-icon.png"
                  alt="Google icon"
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
                  alt="Discord icon"
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
            <label htmlFor="email" className="text-gray-400 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              required
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {emailError}
              </p>
            )}
            <label
              htmlFor="password"
              className="text-gray-400 flex justify-between items-center"
            >
              Password
              <a href="#" className="text-blue-400 text-sm">
                Forget password?
              </a>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password"
              required
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordErrors.length > 0 && (
              <ul
                className="text-red-500 text-sm mt-2 list-disc list-inside"
                role="alert"
              >
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
            <button
              // ======= Handle form submit ========
              onClick={handleClick}
              aria-disabled={isButtonActive ? "false" : "true"}
              // ===================================
              type="submit"
              className={`py-2 rounded-md mt-4 ${
                isButtonActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-400"
              }`}
              disabled={!isButtonActive}
            >
              Log in
            </button>
          </form>
          <div className="flex w-full">
            <p className="mt-4 text-gray-400 text-center text-sm w-full">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        <div
          className="bg-cover bg-center w-0 sm:w-1/2"
          style={{ backgroundImage: "url('/static/images/background.png')" }}
          aria-label="background image"
        ></div>
        <Toaster />
      </div>
    </>
  );
};

export default Login;
