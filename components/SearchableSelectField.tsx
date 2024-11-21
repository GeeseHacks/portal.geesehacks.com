"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Controller, Control, FieldError } from "react-hook-form";
import { VariableSizeList as List } from "react-window";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent as OriginalPopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SearchableSelectFieldProps {
  id: string;
  label: string;
  control: Control<any>;
  options: SelectOption[];
  className?: string;
  error?: FieldError | undefined;
}

// Custom PopoverContent without Portal
const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => (
  <OriginalPopoverContent
    ref={ref}
    style={{ ...style, width: "var(--radix-popover-trigger-width)" }}
    className={cn("max-w-full w-fit", className)}
    {...props}
  />
));

PopoverContent.displayName = "PopoverContent";

export const SearchableSelectField: React.FC<SearchableSelectFieldProps> = ({
  id,
  label,
  control,
  options,
  className,
  error,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);

  // Filter options based on the search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate item height dynamically
  const getItemSize = (index: number) => {
    const option = filteredOptions[index];
    // Estimate height based on the length of the label text and add extra padding
    const lineHeight = 20;
    const estimatedLines = Math.ceil(option.label.length / 30); // Adjust 30 based on average chars per line
    return Math.max(45, estimatedLines * lineHeight + 10); // 10px extra padding
  };

  return (
    <div className={className}>
      <Label htmlFor={id} className="block my-4 text-xl font-semibold">
        {label}
      </Label>
      <Controller
        name={id}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between truncate focus:border-transparent py-2 font-normal px-3"
                onClick={() => setOpen(!open)}
              >
                <span className="truncate">
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : "Select an option..."}
                </span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 overflow-hidden">
              <Command>
                <CommandInput
                  placeholder="Search..."
                  value={searchTerm}
                  onValueChange={setSearchTerm}
                />
                {filteredOptions.length === 0 ? (
                  <CommandEmpty>No options found.</CommandEmpty>
                ) : (
                  <CommandGroup>
                    <List
                      height={200} // Total height of the dropdown
                      itemCount={filteredOptions.length} // Total number of filtered items
                      itemSize={getItemSize} // Variable height for each item
                      width="100%" // Full width of the dropdown
                    >
                      {({ index, style }) => (
                        <CommandItem
                          key={filteredOptions[index].value}
                          value={filteredOptions[index].value.toString()}
                          style={{
                            ...style,
                            display: 'flex',
                            alignItems: 'center', // Centers text vertically
                            paddingTop: '8px', // Extra padding for multi-line items
                            paddingBottom: '8px',
                            lineHeight: '1.5',
                          }}
                          onSelect={() => {
                            field.onChange(filteredOptions[index].value); // Set selected value
                            setOpen(false); // Close the dropdown
                          }}
                          className="flex items-start space-x-2"
                        >
                          <Check
                            className={cn(
                              "h-4 w-4 flex-shrink-0",
                              field.value === filteredOptions[index].value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <span className="flex-grow">
                            {filteredOptions[index].label}
                          </span>
                        </CommandItem>
                      )}
                    </List>
                  </CommandGroup>
                )}
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />
      {error && (
        <p role="alert" className="text-red-500 text-s italic mt-2">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default SearchableSelectField;
