"use client";

import { useFormStatus } from "react-dom";

export function ButtonGroup() {
  const { pending } = useFormStatus();

  return (
    <div className="form-buttons">
      <input
        className="btn"
        type="submit"
        value={pending ? "Submitting..." : "Submit"}
        disabled={pending}
      />
      <input className="btn" type="reset" value="Reset" disabled={pending} />
    </div>
  );
}
