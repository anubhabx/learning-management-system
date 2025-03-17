import React from "react";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

interface FormFieldProps {
  name: string;
  label: string;
  type?: "text" | "switch" | "select" | "email" | "number" | "textarea";
  placeholder?: string;
  options?: { label: string; value: string }[];
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  initialValue?: string | boolean | number;
  disabled?: boolean;
}

const CustomFormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  options,
  className,
  inputClassName,
  labelClassName,
  initialValue,
  disabled = false,
}) => {
  const { control } = useFormContext();

  const renderFormControl = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    const value = field.value !== undefined ? field.value : initialValue || "";

    switch (type) {
      case "textarea":
        return (
          <Textarea
            placeholder={placeholder}
            {...field}
            value={value}
            rows={3}
            className={`border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
          />
        );
      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id={name}
              className={cn("text-customgreys-dirtyGrey", inputClassName)}
            />
            <FormLabel htmlFor={name} className={labelClassName}>
              {label}
            </FormLabel>
          </div>
        );
      case "select":
        return (
          <Select
            value={field.value || (initialValue as string)}
            defaultValue={field.value || (initialValue as string)}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              className={cn(
                "w-full border-none bg-customgreys-primarybg p-4",
                inputClassName
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="w-full bg-customgreys-primarybg border-customgreys-dirtyGrey shadow">
              {options?.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer hover:bg-gray-100 hover:!text-white-100"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder={placeholder}
            {...field}
            value={value}
            className={`border-none bg-customgreys-darkGrey p-4 ${inputClassName}`}
            disabled={disabled}
          />
        );
      default:
        return (
          <Input
            type={type}
            placeholder={placeholder}
            {...field}
            value={value}
            className={cn(
              "border-none bg-customgreys-primarybg p-4",
              inputClassName
            )}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={initialValue}
      render={({ field }) => (
        <FormItem
          className={`${type !== "switch" && "rounded-md"} relative ${className}`}
        >
          {type !== "switch" && (
            <div className="flex justify-between items-center">
              <FormLabel className={`${labelClassName}`}>{label}</FormLabel>
            </div>
          )}

          <FormControl>
            {renderFormControl({
              ...field,
              value: field.value !== undefined ? field.value : initialValue,
            })}
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
