import type { ReactNode } from "react";

type FormGroupProps = {
  children: ReactNode;
  title: string;
};

export function InputGroup({ children, title }: FormGroupProps) {
  return (
    <div>
      <h3 className="input-group-subtitle">{title}</h3>
      <div className="input-group-fields">{children}</div>
    </div>
  );
}
