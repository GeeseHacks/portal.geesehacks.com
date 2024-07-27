import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "@/components/ui/input"

interface InputFieldProps {
  id: string;
  label: string;
  registerOptions: UseFormRegisterReturn;
  placeholder?: string;
  type?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  registerOptions,
  placeholder,
  type = "text",
  error,
}) => (
  <div className="col-span-1">
    <label className="block my-4 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <Input
      id={id}
      type={type}
      {...registerOptions}
      // className={`w-full p-2 border ${error ? "border-red-500 border-2" : "border-gray-500"} rounded-lg text-white bg-transparent focus:outline-none`}
      className={`focus:border-transparent py-5`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-s italic mt-2">{error}</p>}
  </div>
);

export default InputField;
