"use client"

import { ComponentProps, useId, useRef } from "react"
import { useErrorHandling } from "../useErrorHandling"
import type { FormError } from "../types"

type InputProps = {
  labelText: string
  error?: FormError
} & ComponentProps<"input">

export function Input({ labelText, error, ...props }: InputProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(inputRef, error)

  return (
    <div className="form-input">
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {labelText}
      </label>
      <div>
        <input
          id={id}
          ref={inputRef}
          className={`input ${showError ? "error" : ""}`}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
        />
        {error != null && showError && showErrorPopup && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </div>
  )
}
