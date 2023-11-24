import { useId, useRef } from "react"
import { useErrorHandling } from "./useErrorHandling"

export function Select({ label, defaultValue, name, options, error }) {
  const id = useId()
  const selectRef = useRef()
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(error, selectRef)

  return (
    <>
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {label}
      </label>
      <div>
        <select
          id={id}
          name={name}
          defaultValue="0"
          ref={selectRef}
          className={`input-field ${showError ? "error" : ""}`}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        >
          <option value="0" disabled hidden>
            {defaultValue}
          </option>
          {options.map(option => (
            <option
              key={option.replace(" ", "+")}
              value={option.replace(" ", "+")}
            >
              {option}
            </option>
          ))}
        </select>
        {showError && showErrorPopup && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </>
  )
}
