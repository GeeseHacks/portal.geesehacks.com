import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ComplexInputFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder: string;
  type?: string;
  error?: string;
}

const ComplexInputField: React.FC<ComplexInputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="col-span-1 md:col-span-2">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
      <div className="col-span-1">
        <label className="block my-4 text-xl font-bold" htmlFor={id}>
          {label}
        </label>
        <input
          id={id}
          type={type}
          {...registerOptions}
          className="w-full p-2 border bg-transparent border-gray-500 rounded-lg text-white focus:outline-none"
          placeholder={placeholder}
        />
        {error && <p className="text-red-500 text-s italic">{error}</p>}
      </div>
    </div>
  </div>
);

export default ComplexInputField;
