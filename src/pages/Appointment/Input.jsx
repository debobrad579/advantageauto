import { useId, useRef } from "react"
import { useErrorHandling } from "./useErrorHandling"

export function Input({ label, name, type = "text", error }) {
  const id = useId()
  const inputRef = useRef(null)
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(error, inputRef)

  return (
    <>
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {label}
      </label>
      <div>
        <input
          id={id}
          name={name}
          type={type}
          ref={inputRef}
          className={`input-field ${showError ? "error" : ""}`}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {showError && showErrorPopup && (
          <div className="error-popup">{error}</div>
        )}
      </div>
    </>
  )
}
