"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const reset = async () => {
    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Reset token generated:", data.resetToken);
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <Input
        placeholder="Enter your email"
        onChange={handleInputChange}
      ></Input>
      <Button onClick={reset}>Reset Password</Button>
    </div>
  );
};

export default ResetPassword;
