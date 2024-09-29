import * as React from "react";

interface EmailTemplateProps {
  resetLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resetLink,
}) => (
  <div>
    <div className="max-w-lg mx-auto bg-[#15182c] rounded-lg p-6">
      <div className="mt-6 text-center text-gray-300">
        <p>Hello,</p>
        <p className="mt-2">
          You recently requested to reset your password for your GeeseHacks
          account. Click the button below to reset it.
        </p>
        <a
          href={resetLink}
          target="_blank"
          className="inline-block mt-6 bg-[#8b00ff] text-white py-2 px-4 rounded-lg text-base"
        >
          Reset Password
        </a>
        <p className="mt-6 text-sm">
          This password reset link will expire in 1 hour.
        </p>
        <p className="mt-2 text-sm">
          If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    </div>
  </div>
);
