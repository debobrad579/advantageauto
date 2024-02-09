import type { ReactNode } from "react"

type FormGroupProps = {
  children: ReactNode
  title: string
}

export function InputGroup({ children, title }: FormGroupProps) {
  return (
    <div className="form-group">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}
