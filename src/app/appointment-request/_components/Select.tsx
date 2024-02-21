"use client";

import { ComponentProps, useId, useRef } from "react";
import { useErrorHandling } from "../useErrorHandling";
import type { FormError } from "../types";

type SelectProps = {
  labelText: string;
  options: string[];
  placeholder: string;
  error?: FormError;
} & ComponentProps<"select">;

export function Select({
  labelText,
  options,
  placeholder,
  error,
  ...props
}: SelectProps) {
  const id = useId();
  const selectRef = useRef<HTMLSelectElement>(null);
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(selectRef, error);

  return (
    <>
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {labelText}
      </label>
      <div>
        <select
          id={id}
          ref={selectRef}
          className={`input ${showError ? "error" : ""}`}
          defaultValue="0"
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        >
          <option value="0" hidden>
            {placeholder}
          </option>
          {options.map((option) => {
            const value = option.replace(" ", "_");
            return (
              <option key={value} value={value}>
                {option}
              </option>
            );
          })}
        </select>
        {error != null && showError && showErrorPopup && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </>
  );
}
