"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import from next/navigation
import { signIn } from "next-auth/react";
import { signInActionGoogle } from "@/components/utils/signInActionGoogle";
import { signInActionDiscord } from "@/components/utils/signInActionDiscord";
import { validatePassword } from "@/lib/passwordUtils";
import { validateEmail } from "@/lib/emailUtils";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string>("");
  const [verifyPasswordError, setVerifyPasswordError] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailValidationError = validateEmail(email);
    const passwordValidationErrors = validatePassword(password);

    if (emailValidationError || passwordValidationErrors.length > 0) {
      setEmailError(emailValidationError);
      setPasswordErrors(passwordValidationErrors);
    } else {
      setEmailError("");
      setPasswordErrors([]);

      if (password !== verifyPassword) {
        setVerifyPasswordError("Passwords do not match");
        return;
      }

      setVerifyPasswordError("");

      // Show a promise toast while waiting for the API response
      const promise = fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(async (response) => {
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to register user");
        }
        return response.json();
      });

      toast
        .promise(promise, {
          loading: "Registering user...",
          success: "User registered successfully!",
          error: (err) => err.message,
        })
        .then((data) => {
          console.log("Success:", data);
          router.push("/login"); // Redirect to the login page on success
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    const arePasswordsMatching = password === verifyPassword;
    setVerifyPasswordError(
      arePasswordsMatching ? "" : "Passwords do not match"
    );
    setIsButtonActive(email !== "" && password !== "" && arePasswordsMatching);
  }, [email, password, verifyPassword]);

  return (
    <>
      <Head>
        <title>Signup | GeeseHacks</title>
        <meta name="description" content="Sign up for GeeseHacks" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex h-screen">
        <div className="bg-gray-900 text-white flex flex-col justify-center items-start w-full sm:w-1/2 min-w-[300px] px-8 sm:px-12 lg:px-24 xl:px-40 2xl:px-[13%]">
          <h2 className="mt-2 mb-2 text-left text-4xl font-bold">Welcome</h2>
          <p className="mb-6 mt-3 text-left">
            Make an account with us to continue!
          </p>
          <div className="flex flex-col gap-4 w-full mb-6">
            <form
              className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
              action={signInActionGoogle}
            >
              <button className="flex gap-2">
                <img
                  src="/static/icons/google-icon.png"
                  alt="Sign in with Google"
                  className="h-6 w-6"
                />
                Sign Up with Google
              </button>
            </form>
            <form
              className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2"
              action={signInActionDiscord}
            >
              <button className="flex gap-2">
                <img
                  src="/static/icons/discord-icon.png"
                  alt="Sign in with Discord"
                  className="h-6 w-7"
                />
                Sign Up with Discord
              </button>
            </form>
          </div>
          <div className="flex items-center w-full mb-4">
            <div className="border-t border-gray-600 flex-grow mr-2"></div>
            <span className="text-gray-500">OR</span>
            <div className="border-t border-gray-600 flex-grow ml-2"></div>
          </div>
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit}
            noValidate
          >
            <label htmlFor="email" className="text-gray-400">
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
            <label htmlFor="password" className="text-gray-400">
              Password
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
            <label htmlFor="verify-password" className="text-gray-400">
              Verify Password
            </label>
            <input
              type="password"
              id="verify-password"
              name="verify-password"
              placeholder="Verify your password"
              required
              className="p-2 rounded-md bg-gray-800 text-white border border-gray-400"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
            {verifyPasswordError && (
              <p className="text-red-500 text-sm mt-2" role="alert">
                {verifyPasswordError}
              </p>
            )}
            <button
              type="submit"
              className={`py-2 rounded-md mt-4 ${
                isButtonActive
                  ? "bg-blue-600 text-white"
                  : "bg-gray-600 text-gray-400"
              }`}
              disabled={!isButtonActive}
              aria-label="sign up button"
            >
              Sign Up
            </button>
          </form>
          <div className="flex w-full">
            <p className="mt-4 text-gray-400 text-center text-sm w-full">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-400"
                aria-label="login link"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div
          className="bg-cover bg-center w-0 sm:w-1/2"
          style={{ backgroundImage: "url('/static/images/background.png')" }}
        ></div>
        <Toaster />
      </div>
    </>
  );
};

export default SignUp;
