"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const reset = async () => {
    const promise = fetch("/api/auth/send-reset-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update password)");
      }
      return response.json();
    });
    toast
      .promise(promise, {
        loading: "Generating token...",
        success: "Reset link has been sent!",
        error: (err) => err.message,
      })
      .then((data) => {
        console.log("Success", data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-white text-4xl font-bold my-6">Forgot Password</h1>
      <Input
        placeholder="Enter your email"
        className="max-w-xl"
        onChange={handleInputChange}
      ></Input>
      <Button onClick={reset}>Reset Password</Button>
    </div>
  );
};

export default ResetPassword;
