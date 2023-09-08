import { useId, useRef } from "react"
import { useErrorHandling } from "../hooks/useErrorHandling"

export function Select({ label, defaultValue, name, options, error }) {
  const id = useId()
  const selectRef = useRef()
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(error, selectRef)

  return (
    <tr>
      <td>
        <label htmlFor={id} className={showError ? "error" : undefined}>
          {label}
        </label>
      </td>
      <td>
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
          <div className="error-popup">{error}</div>
        )}
      </td>
    </tr>
  )
}
