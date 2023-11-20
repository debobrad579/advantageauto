import { Helmet } from "react-helmet"

export default function VehiclesToAvoid() {
  return (
    <>
      <Helmet htmlAttributes>
        <title>Vehicles to Avoid | Advantage Auto</title>
        <meta
          name="description"
          content="We have some vehicles that we find are not reliable enough, are in need of constant repairs, or have premature major drive train failures."
        />
      </Helmet>
      <h1>Vehicles to Avoid</h1>
      <p>
        We have some vehicles that we find are not reliable enough, are in need
        of constant repairs or have premature major drive train failures.
        Vehicles that we recommend avoiding are the following:
      </p>
      <ul>
        <li>
          Any General Motors vehicle 2005 through present with a 2.4 L 4
          cylinder engine. Timing chains stretch and fail causing catastrophic
          engine damage and good used engines are almost impossible to find.
        </li>
        <li>
          Chevrolet Cruse with the 1.4 L turbo: high oil consumption, fluid
          leaks, turbo failures.
        </li>
        <li>
          Any older high end European vehicle (BMW, Mercedes, Audi, Mini). If
          you can't afford to purchase a new one then you definitely can't
          afford to repair and older one with high mileage.
        </li>
        <li>
          2009 through 2015 Hyundai/ Kia with the 2.4 L engine (timing chain
          failures)
        </li>
        <li>
          2012 Ford Focus with the dual clutch automatic transmission (high
          failure rates, one customers had three transmissions replaced while
          under warranty.
        </li>
        <li>
          VW and Audi with the 2.0 L DOHC engines: timing chain tensioner
          failures cause the engine to fail.
        </li>
        <li>
          Any new diesel equipped vehicles: the cost of maintaining the
          emissions systems, higher cost of fuel in the winter and general cold
          winter issues do not justify the higher purchase prices and slight
          better fuel economy over gas engines. If you want a true diesel, buy
          something pre 2002 if you can find something worthy of rebuilding and
          maintaining.
        </li>
        <li>
          Any vehicle with a CVT transmission if you are going to tow with it.
          While CVT's have received bad press, we have many that have gone over
          240,000 kms with proper maintenance.
        </li>
        <li>
          Mid 2010 Nissan Quest: there are not enough of them on the road to
          have aftermarket parts available. Many parts are dealer only.
        </li>
      </ul>
    </>
  )
}
