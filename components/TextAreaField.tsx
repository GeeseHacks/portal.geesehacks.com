import React, { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder?: string;
  error?: FieldError | undefined;
  maxLength?: number; // Make maxLength optional
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  error,
  maxLength = 1000, // Default to 1000
}) => {
  const [charCount, setCharCount] = useState(0);

  // Update character count on input change
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharCount(value.length); // Update character count
    registerOptions.onChange(e); // Call the original onChange function
  };

  return (
    <div className="col-span-1">
      <label className="block mb-2 text-xl font-semibold" htmlFor={id}>
        {label}
      </label>
      <Textarea
        id={id}
        {...registerOptions}
        onChange={handleChange} // Attach the custom handleChange function
        className={`mt-4 h-48 focus:border-transparent`}
        placeholder={placeholder}
        maxLength={maxLength} // Set maxLength to the default
      />
      <p className="text-gray-500 text-sm mt-1">
        {charCount}/{maxLength} characters
      </p>
      {error && <p role="alert" className="text-red-500 text-s italic mt-2">{error.message}</p>}
    </div>
  );
};

export default TextAreaField;