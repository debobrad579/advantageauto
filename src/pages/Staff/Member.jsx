export function Member({ image, alt, children }) {
  return (
    <>
      <img className="photo" src={image} alt={alt} />
      <p>{children}</p>
    </>
  )
}
