"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(email !== '' && password !== '' && password === verifyPassword);
  }, [email, password, verifyPassword]);

  return (
    <div className="flex h-screen">
      <div className="bg-gray-900 text-white flex flex-col justify-center items-start w-full sm:w-1/2 min-w-[300px] px-8 sm:px-12 lg:px-24 xl:px-48">
        <h2 className="mt-2 mb-2 text-left text-4xl font-bold">Welcome</h2>
        <p className="mb-6 mt-3 text-left">Make an account with us to continue!</p>
        <div className="flex flex-col gap-4 w-full mb-6">
          <button className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2">
            <img src="/static/icons/google-icon.png" alt="Google" className="h-6 w-6" />
            Sign Up with Google
          </button>
          <button className="bg-white text-black py-2 rounded-md flex items-center justify-center gap-2">
            <img src="/static/icons/apple-icon.png" alt="Apple" className="h-6 w-6" />
            Sign Up with Apple
          </button>
        </div>
        <div className="flex items-center w-full mb-4">
          <div className="border-t border-gray-600 flex-grow mr-2"></div>
          <span className='text-gray-500'>OR</span>
          <div className="border-t border-gray-600 flex-grow ml-2"></div>
        </div>
        <form className="flex flex-col gap-4 w-full">
          <label htmlFor="email" className="text-gray-400">Email</label>
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
          <label htmlFor="password" className="text-gray-400">Password</label>
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
          <label htmlFor="verify-password" className="text-gray-400">Verify Password</label>
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
          <button
            type="submit"
            className={`py-2 rounded-md mt-4 ${isButtonActive ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-400'}`}
            disabled={!isButtonActive}
          >
            Sign Up
          </button>
        </form>
        <div className='flex w-full'>
          <p className="mt-4 text-gray-400 text-center text-sm w-full">
            Already have an account? <Link href="/login" className="text-blue-400">Log in</Link>
          </p>
        </div>
      </div>
      <div className="bg-cover bg-center w-0 sm:w-1/2" style={{ backgroundImage: "url('/static/images/background.png')" }}></div>
    </div>
  );
}

export default SignUp;
