import { useId, useRef } from "react"
import { useErrorHandling } from "../hooks/useErrorHandling"

export function Input({ label, name, type = "text", error }) {
  const id = useId()
  const inputRef = useRef(null)
  const {
    showError,
    showErrorPopup,
    handleChange,
    handleKeyDown,
    handleBlur,
    handleFocus,
  } = useErrorHandling(error, inputRef)

  return (
    <tr>
      <td>
        <label htmlFor={id} className={showError ? "error" : undefined}>
          {label}
        </label>
      </td>
      <td>
        <input
          id={id}
          name={name}
          type={type}
          ref={inputRef}
          className={`input-field ${showError ? "error" : ""}`}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {showError && showErrorPopup && (
          <div className="error-popup">{error}</div>
        )}
      </td>
    </tr>
  )
}
