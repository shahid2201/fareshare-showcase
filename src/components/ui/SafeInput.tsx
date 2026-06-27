"use client";

import {
  forwardRef,
  useCallback,
  type InputHTMLAttributes,
  type ChangeEvent,
} from "react";
import { sanitizeTextInput } from "@/lib/security";
import { cn } from "@/lib/utils";

interface SafeInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onValueChange?: (value: string) => void;
  maxInputLength?: number;
  onChange?: InputHTMLAttributes<HTMLInputElement>["onChange"];
}

export const SafeInput = forwardRef<HTMLInputElement, SafeInputProps>(
  function SafeInput(
    {
      onValueChange,
      maxInputLength = 500,
      className,
      type = "text",
      autoComplete = "off",
      spellCheck,
      onChange,
      maxLength,
      ...props
    },
    ref
  ) {
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const sanitized = sanitizeTextInput(event.target.value, {
          maxLength: maxInputLength,
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
      <input
        ref={ref}
        type={type}
        maxLength={maxLength ?? maxInputLength}
        autoComplete={autoComplete}
        spellCheck={spellCheck ?? type !== "email"}
        onChange={handleChange}
        className={cn(className)}
        {...props}
      />
    );
  }
);
