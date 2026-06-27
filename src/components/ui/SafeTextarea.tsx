"use client";

import {
  forwardRef,
  useCallback,
  type TextareaHTMLAttributes,
  type ChangeEvent,
} from "react";
import { sanitizeTextInput } from "@/lib/security";
import { cn } from "@/lib/utils";

interface SafeTextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  onValueChange?: (value: string) => void;
  maxInputLength?: number;
  onChange?: TextareaHTMLAttributes<HTMLTextAreaElement>["onChange"];
}

export const SafeTextarea = forwardRef<HTMLTextAreaElement, SafeTextareaProps>(
  function SafeTextarea(
    {
      onValueChange,
      maxInputLength = 2000,
      className,
      autoComplete = "off",
      onChange,
      maxLength,
      ...props
    },
    ref
  ) {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        const sanitized = sanitizeTextInput(event.target.value, {
          maxLength: maxInputLength,
          allowNewlines: true,
        });

        if (sanitized !== event.target.value) {
          event.target.value = sanitized;
        }

        onValueChange?.(sanitized);
        onChange?.(event);
      },
      [maxInputLength, onChange, onValueChange]
    );

    return (
      <textarea
        ref={ref}
        maxLength={maxLength ?? maxInputLength}
        autoComplete={autoComplete}
        onChange={handleChange}
        className={cn(className)}
        {...props}
      />
    );
  }
);
