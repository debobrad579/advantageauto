import type { Metadata } from "next"
import owen from "@/img/owen.jpg"
import stuart from "@/img/stuart.jpg"
import ryan from "@/img/ryan.jpg"
import william from "@/img/william.jpg"
import cody from "@/img/cody.jpg"
import { Photo } from "@/components/Photo"

export const metadata: Metadata = {
  title: "Staff",
  description:
    "Meet our staff who have been working here reliably fo many years.",
}

export default function Staff() {
  return (
    <>
      <h1>Staff:</h1>
      <div className="grid-container">
        <div className="staff-member">
          <Photo src={owen} alt="Owen DeBoer" />
          <p>
            Owen DeBoer started in the trade in 1991. He has been a certified
            Red Seal 310S Auto Service Technician as well as a 310T Truck and
            Coach since May 1996.
          </p>
        </div>
        <div className="staff-member">
          <Photo src={stuart} alt="Stuart Gillanders" />
          <p>
            Stuart Gillanders started in the trade in 1997 and started working
            here in August 2005. He has been a certified Red Seal 310S Auto
            Service Technician since October 2004.
          </p>
        </div>
        <div className="staff-member">
          <Photo src={ryan} alt="Ryan Boulton" />
          <p>
            Ryan Boulton started in the trade in 1999 and started working here
            in March 2015. He has been a certified Red Seal 310S Auto Service
            Technician since September 2004.
          </p>
        </div>
        <div className="staff-member">
          <Photo src={william} alt="William Dyer" />
          <p>
            William Dyer started as a co-op student with us in 2012. He has been
            a certified Red Seal 310S Auto Service Technician since May 2018.
          </p>
        </div>
        <div className="staff-member">
          <Photo src={cody} alt="Cody Summers" />
          <p>
            Cody Summers started as a co-op student with us in 2018. He is
            currently working through his apprenticeship program here.
          </p>
        </div>
      </div>
    </>
  )
}
