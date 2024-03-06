"use client"

import { ComponentProps, useEffect, useId, useRef, useState } from "react"
import type { FormError } from "../types"
import { ERROR_PREDICATES } from "../errors"

type InputProps = {
  labelText: string
  error?: FormError
} & ComponentProps<"input">

export function Input({ labelText, error, ...props }: InputProps) {
  const id = useId()
  const ref = useRef<HTMLInputElement>(null)
  const [showError, setShowError] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  useEffect(() => {
    if (ref.current != null && error != null) {
      setShowError(true)
      ref.current.focus()
    }

    return () => setShowError(false)
  }, [ref, error])

  return (
    <div className="form-input">
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {labelText}
      </label>
      <div>
        <input
          id={id}
          ref={ref}
          className={`input ${showError ? "error" : ""}`}
          onChange={() => {
            if (
              ref.current != null &&
              error != null &&
              ERROR_PREDICATES[error.predicate](ref.current.value)
            )
              return setShowError(true)
            setShowError(false)
          }}
          onBlur={() => setShowErrorPopup(false)}
          onFocus={() => setShowErrorPopup(true)}
          {...props}
        />
        {error != null && showError && showErrorPopup && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </div>
  )
}
