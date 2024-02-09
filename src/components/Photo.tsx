import type { StaticImageData } from "next/image"
import Image from "next/image"

export function Photo({
  src,
  alt,
  sizes = "(max-width: 830px) 100vw, (max-width: 1150px) 40vw, 20vw",
}: {
  src: StaticImageData
  alt: string
  sizes?: string
}) {
  return (
    <div
      className="image-container"
      style={{ aspectRatio: `${src.width} / ${src.height}` }}
    >
      <Image src={src} alt={alt} sizes={sizes} fill />
    </div>
  )
}
