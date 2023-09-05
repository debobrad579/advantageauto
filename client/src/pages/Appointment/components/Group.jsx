export function Group({ title, children }) {
  return (
    <div>
      <h3>{title}</h3>
      <table>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}
