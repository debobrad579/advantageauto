import shop from "./assets/shop.jpg"

export function Home() {
  return (
    <div className="grid-container">
      <div>
        <img className="photo" src={shop} alt="Advantage Auto Building" />
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
