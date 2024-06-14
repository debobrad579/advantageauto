import type { Metadata } from "next"
import { Photo } from "@/components/Photo"
import car from "@/img/car1.jpg"

export const metadata: Metadata = {
  title: "Services Offered",
  description:
    "Services we offer include brakes, suspension, alignment, exhaust, diagnostics, electrical, emissions, dripless undercoating, and more.",
}

export default function ServicesOffered() {
  return (
    <div className="grid-container">
      <div>
        <h1>Services Offered:</h1>
        <p>We offer the following services:</p>
        <ul>
          <li>
            Regularly scheduled maintenance including oil changes. We stock 12
            different oils and still order in specific oil for the application
            when necessary.
          </li>
          <li>Brakes</li>
          <li>Suspension</li>
          <li>Alignment</li>
          <li>Exhaust</li>
          <li>Air Conditioning for R134a and R1234</li>
          <li>Tire sales, repairs and Road Force balancing</li>
          <li>TPMS sensors and programming</li>
          <li>Diagnostics</li>
          <li>Electrical</li>
          <li>Emissions</li>
          <li>Hybrid car service (own a Chevy Volt)</li>
          <li>Engine and transmission replacement</li>
          <li>Pre-purchase inspection (inspect it before you pay for it)</li>
          <li>Dripless undercoating</li>
          <li>and more</li>
        </ul>
      </div>
      <Photo src={car} alt="Cody working on a car" sizes="(max-width: 830px) 100vw, 40vw" />
    </div>
  )
}
