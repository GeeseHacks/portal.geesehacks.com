"use client";
import React, { useState, useEffect } from "react";
import { authenticate } from '@/app/lib/actions';
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";
import { validatePassword } from '@/lib/passwordUtils';
import { validateEmail } from '@/lib/emailUtils';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string>("");

  // ======= login status =======
  const { pending } = useFormStatus();
  const [errorMessage, dispatch] = useFormState(() => authenticate(email, password), undefined);
  const [isButtonActive, setIsButtonActive] = useState(false);
  // ============================

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pending) {
      e.preventDefault();
      return;
    }

    const emailValidationError = validateEmail(email);
    const passwordValidationErrors = validatePassword(password);

    if (emailValidationError || passwordValidationErrors.length > 0) {
      setEmailError(emailValidationError);
      setPasswordErrors(passwordValidationErrors);
      e.preventDefault();  // Prevent form submission
    } else {
      setEmailError("");
      setPasswordErrors([]);
      // Call authenticate here if there are no errors
      await authenticate(email, password);
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
          <button
            onClick={() => signIn("google")}
            className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
          >
            <img
              src="/static/icons/google-icon.png"
              alt="Google"
              className="h-6 w-6"
            />
            Log in with Google
          </button>
          <button
            onClick={() => signIn("discord")}
            className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
          >
            <img
              src="/static/icons/discord-icon.png"
              alt="Discord"
              className="h-6 w-7"
            />
            Log in with Discord
          </button>
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="border-t border-gray-600 flex-grow mr-2"></div>
          <span>OR</span>
          <div className="border-t border-gray-600 flex-grow ml-2"></div>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
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
            <p className="text-red-500 text-sm mt-2">{emailError}</p>
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
            <ul className="text-red-500 text-sm mt-2 list-disc list-inside">
              {passwordErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
          <button
            // ======= Handle form submit ========
            onClick={handleClick}
            aria-disabled={pending}
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
        {/* Display Error Message if encountered error */}
        {errorMessage && (
          <p className="text-red-500 text-sm mt-4">{errorMessage}</p>
        )}
        
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
      ></div>
    </div>
  );
};

export default Login;
