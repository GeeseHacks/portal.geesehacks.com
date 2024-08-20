// pages/reset-password.tsx
"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validatePassword } from "@/lib/passwordUtils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  console.log(token);

  const handlePasswordChange = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
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

    const promise = fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, newPassword }),
    }).then(async (response) => {
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update password");
      }
      return response.json();
    });

    toast
      .promise(promise, {
        loading: "Resetting password...",
        success: "Password has been reset!",
        error: (err) => err.message,
      })
      .then((data) => {
        console.log("Success", data);
        router.push("/login");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
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
