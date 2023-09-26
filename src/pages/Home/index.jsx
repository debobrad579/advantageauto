import { useRef } from "react"

export default function Home() {
  const imgRef = useRef(null)

  return (
    <div className="grid-container">
      <div className="photo" style={{ paddingTop: "43.75%" }}>
        <img
          ref={imgRef}
          alt="Advantage Auto Building"
          src={`./home/shop-1200.jpg`}
          srcSet={`
            ./home/shop-400.jpg 400w,
            ./home/shop-600.jpg 600w,
            ./home/shop-800.jpg 800w,
            ./home/shop-1000.jpg 1000w`}
          sizes="(max-width: 830px) 100vw, 40vw"
          onLoad={() => (imgRef.current.style.opacity = 1)}
        />
      </div>
      <div>
        <h2>Hours:</h2>
        <ul>
          <li>Sunday: Closed</li>
          <li>Monday: 8 am - 5 pm</li>
          <li>Tuesday: 8 am - 5 pm</li>
          <li>Wednesday: 8 am - 5 pm</li>
          <li>Thursday: 8 am - 5 pm</li>
          <li>Friday: 8 am - 1:30 pm</li>
          <li>Saturday: Closed</li>
        </ul>
        <h2>Other Information:</h2>
        <strong>Address: </strong>
        <a
          href="https://goo.gl/maps/HB2616UgfmQ43Tcz6"
          target="_blank"
          rel="noreferrer"
        >
          576-D Elgin Street, Brantford, ON N3S 7X2
        </a>
        <br />
        <strong>Phone: </strong>
        <a href="tel:519-752-8629" target="_blank" rel="noreferrer">
          519-752-8629
        </a>
      </div>
    </div>
  )
}
