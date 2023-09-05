import { useId } from "react"

export function Select({ label, name, options }) {
  const id = useId()

  return (
    <tr>
      <td>
        <label htmlFor={id}>{label}</label>
      </td>
      <td>
        <select id={id} name={name} defaultValue="0">
          <option value="0" disabled hidden>
            Select a Make
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
      </td>
    </tr>
  )
}
