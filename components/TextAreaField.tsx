import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError | undefined;
  maxLength?: number; // optional prop to define max character length
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  error,
  maxLength = 1000, // default max length
}) => {
  const [charCount, setCharCount] = useState(0);
  <div className="col-span-1">
    <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <Textarea
      id={id}
      {...registerOptions}
      // className={`w-full p-2 border ${error ? "border-red-500 border-2" : "border-gray-800"} rounded-lg text-white  h-48 focus:outline-none`}
      className={`mt-4 h-48 focus:border-transparent`}
      placeholder={placeholder}
    />
    {error && <p role="alert" className="text-red-500 text-s italic mt-2">{error.message}</p>}
  </div>
);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCharCount(e.target.value.length);
  };

  return (
    <div className="col-span-1">
      <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
        {label}
      </label>
      <Textarea
        id={id}
        {...registerOptions}
        onChange={handleInputChange}
        className={`mt-4 h-48 focus:border-transparent`}
        placeholder={placeholder}
        maxLength={maxLength} // optional maxLength attribute
      />
      <div className="text-right text-sm mt-1">
        {charCount}/{maxLength} characters
      </div>
      {error && <p className="text-red-500 text-s italic mt-2">{error.message}</p>}
    </div>
  );
};

export default TextAreaField;