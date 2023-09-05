import { useId } from "react"

export function Input({ label, name, type = "text" }) {
  const id = useId()

  return (
    <tr>
      <td>
        <label htmlFor={id}>{label}</label>
      </td>
      <td>
        <input id={id} name={name} type={type} />
      </td>
    </tr>
  )
}
