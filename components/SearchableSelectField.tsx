"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Controller, Control, FieldError } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Popover,
  PopoverContent as OriginalPopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

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
const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <OriginalPopoverContent
      ref={ref}
      style={{ ...style, width: 'var(--radix-popover-trigger-width)' }} // Set width dynamically
      className={cn(
        "max-w-full w-fit",
        className
      )}
      {...props}
    />
  )
);


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

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={className}>
      <Label htmlFor={id} className="block my-4 text-xl font-semibold">
        {label}
      </Label>
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange, value } }) => (
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
                    {value
                      ? options.find((option) => option.value === value)?.label
                      : "Select an option..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>

              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput
                    placeholder="Search..."
                    value={searchTerm}
                    onValueChange={setSearchTerm} 
                    />
                  <ScrollArea className="max-h-48 overflow-auto">
                    {filteredOptions.length === 0 ? (
                      <CommandEmpty>No options found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {filteredOptions.map((option) => (
                          <CommandItem
                          key={option.value}
                          value={option.value.toString()}
                          onSelect={() => {
                            onChange(option.value); // Set the selected value
                            setOpen(false); // Close the dropdown
                          }}
                          className="flex items-start space-x-2"
                          >
                            <Check
                              className={cn(
                                "h-4 w-4 flex-shrink-0",
                                value === option.value ? "opacity-100" : "opacity-0"
                              )}
                              />
                            <span className="flex-grow">{option.label}</span>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </ScrollArea>
                </Command>
              </PopoverContent>
          </Popover>
        )}
      />
      {error && <p className="text-red-500 text-s italic mt-2">{error.message}</p>}
    </div>
  );
};




export default SearchableSelectField;
