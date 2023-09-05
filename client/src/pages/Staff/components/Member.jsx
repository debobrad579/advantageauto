export function Member({ image, alt, children }) {
  return (
    <>
      <div>
        <img className="photo" src={image} alt={alt} />
      </div>
      <p>{children}</p>
    </>
  )
}
