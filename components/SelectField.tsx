import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import Select from "react-select";
import { customInputStyles } from "../styles/customInputStyles";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  id: string;
  label: string;
  control: Control<any>;
  options: SelectOption[];
  className?: string;
  error?: FieldError | undefined;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  control,
  options,
  className,
  error,
}) => (
  <div className={className}>
    <label className="block my-4 text-xl font-semibold" htmlFor={id}>
      {label}
    </label>
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value, name, ref } }) => (
        <Select
          styles={customInputStyles}
          // className={`text-red ${error ? "border-red-500 border-2" : "border-gray-700"}`}
          classNamePrefix="react-select"
          placeholder=""
          options={options}
          value={options.find((c) => c.value === value)}
          onChange={(val) => onChange(val?.value)}
        />
      )}
    />
    {error && <p className="text-red-500 text-s italic mt-2">{error.message}</p>}
  </div>
);

export default SelectField;
