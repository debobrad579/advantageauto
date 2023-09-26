import { useRef } from "react"

export function Member({ image, alt, children }) {
  const imgRef = useRef(null)

  return (
    <>
      <div className="photo">
        <img
          ref={imgRef}
          alt={alt}
          src={`./staff/${image}-800.jpg`}
          srcSet={`
            ./staff/${image}-400.jpg 400w,
            ./staff/${image}-600.jpg 600w,
            ./staff/${image}-800.jpg 800w`}
          sizes="(max-width: 830px) 100vw, (max-width: 1180px) 40vw, 20vw"
          onLoad={() => (imgRef.current.style.opacity = 1)}
        />
      </div>
      <p>{children}</p>
    </>
  )
}
