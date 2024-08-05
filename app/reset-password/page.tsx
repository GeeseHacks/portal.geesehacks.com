// pages/reset-password.tsx
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatePassword } from "@/lib/passwordUtils";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  console.log(token);

  const handlePasswordChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    
    e.preventDefault();

    const passwordErrors = validatePassword(newPassword);

    if (passwordErrors.length > 0) {
      setPasswordErrors(passwordErrors);
      return;
    }

    if (!token || typeof token !== "string") {
      console.error("Invalid token");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Password reset successfully");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-white text-4xl font-bold my-6">Reset Password</h1>
      <Input
        placeholder="Enter new password"
        type="password"
        className="max-w-xl mb-4"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      {passwordErrors.length > 0 && (
        <ul className="text-red-500 text-sm list-disc list-inside">
          {passwordErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <Button onClick={handlePasswordChange}>Update Password</Button>
    </div>
  );
};

export default ResetPassword;
