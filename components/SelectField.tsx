import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
    <Label htmlFor={id} className="block my-4 text-xl font-semibold">
      {label}
    </Label>
    <Controller
      name={id}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Select onValueChange={onChange} defaultValue={value?.toString()}>
          <SelectTrigger className="w-full truncate focus:border-transparent py-2 font-normal">
            <SelectValue className="truncate" placeholder="Select an option..."/>
          </SelectTrigger>
          <SelectContent className="w-fit absolute">
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value.toString()}
                  className="whitespace-normal break-words"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
    {error && <p className="text-red-500 text-s italic mt-2">{error.message}</p>}
  </div>
);

export default SelectField;
