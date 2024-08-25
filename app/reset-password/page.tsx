// pages/reset-password.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validatePassword } from "@/lib/passwordUtils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    verifyPassword: false,
  });
  const [verifyPasswordError, setVerifyPasswordError] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  console.log(token);

  const handlePasswordChange = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const passwordValidationErrors = validatePassword(newPassword);

    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      return;
    } else {
      setPasswordErrors([]);
    }

    if (!token || typeof token !== "string") {
      console.error("Invalid token");
      return;
    }

    if (newPassword !== verifyPassword) {
      setVerifyPasswordError("Passwords do not match");
      return;
    }

    setVerifyPasswordError("");

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

  useEffect(() => {
    const arePasswordsMatching = newPassword === verifyPassword;
    setVerifyPasswordError(
      arePasswordsMatching ? "" : "Passwords do not match"
    );
    setIsButtonActive(newPassword !== "" && arePasswordsMatching);
  }, [newPassword, verifyPassword]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-white text-4xl font-bold my-6">Reset Password</h1>
      <Label htmlFor="password">Password</Label>
      <div className="relative">
        <Input
          placeholder="Enter new password"
          type={passwordVisibility.password ? "text" : "password"}
          required
          className="pr-11"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div
          onClick={() =>
            setPasswordVisibility((prev) => ({
              ...prev,
              password: !prev.password,
            }))
          }
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        >
          {passwordVisibility.password ? (
            <BiHide className="mr-1 text-xl" />
          ) : (
            <BiShow className="mr-1 text-xl" />
          )}
        </div>
      </div>

      {passwordErrors.length > 0 && (
        <ul
          role="alert"
          className="text-red-500 text-sm mt-2 list-disc list-inside"
        >
          {passwordErrors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <Label htmlFor="verify-password">Verify Password</Label>
      <div className="relative">
        <Input
          type={passwordVisibility.verifyPassword ? "text" : "password"}
          id="verify-password"
          name="verify-password"
          placeholder="Verify your password"
          required
          value={verifyPassword}
          onChange={(e) => setVerifyPassword(e.target.value)}
          className="pr-11"
        />
        <div
          onClick={() =>
            setPasswordVisibility((prev) => ({
              ...prev,
              verifyPassword: !prev.verifyPassword,
            }))
          }
          className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
        >
          {passwordVisibility.verifyPassword ? (
            <BiHide className="mr-1 text-xl" />
          ) : (
            <BiShow className="mr-1 text-xl" />
          )}
        </div>
      </div>
      {verifyPasswordError && (
        <p role="alert" className="text-red-500 text-sm mt-2">
          {verifyPasswordError}
        </p>
      )}
      <Button onClick={handlePasswordChange} disabled={!isButtonActive}>
        Update Password
      </Button>
    </div>
  );
};

export default ResetPassword;
