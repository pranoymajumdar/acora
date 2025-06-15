"use client";

import type { Control, FieldPath, FieldValues } from "react-hook-form";

import { LucideEye, LucideEyeOff, type LucideIcon } from "lucide-react";
import { type HTMLInputTypeAttribute, useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type IconInputFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
};

export function IconInputField<T extends FieldValues>({
  control,
  icon: Icon,
  label,
  name,
  placeholder,
  disabled = false,
  type,
}: IconInputFieldProps<T>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = (): void => setIsVisible(prevState => !prevState);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                className="peer ps-9"
                type={type === "password" ? (isVisible ? "text" : "password") : type}
                {...field}
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <Icon size={16} />
              </div>

              {type === "password" && (
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 end-0 flex items-center justify-center pe-3"
                >
                  {isVisible ? <LucideEyeOff size={16} /> : <LucideEye size={16} />}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
