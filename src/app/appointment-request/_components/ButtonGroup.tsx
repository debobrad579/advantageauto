"use client"

import { useFormStatus } from "react-dom"

export function ButtonGroup() {
  const { pending } = useFormStatus()

  return (
    <div className="form-btn-group">
      <button
        className={`btn ${pending ? "btn-submitting" : ""}`}
        type="submit"
        disabled={pending}
      >{pending ? "Submitting" : "Submit"}</button>
      <button className="btn" type="reset" disabled={pending}>Reset</button>
    </div>
  )
}
