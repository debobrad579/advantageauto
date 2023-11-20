import { Helmet } from "react-helmet"
import { Member } from "./Member"

export default function Staff() {
  return (
    <>
      <Helmet htmlAttributes>
        <title>Staff | Advantage Auto</title>
        <meta
          name="description"
          content="Meet our staff who have been working here reliably fo many years."
        />
      </Helmet>
      <h1>Staff:</h1>
      <div className="grid-container-4">
        <Member image="owen" alt="Owen DeBoer">
          Owen DeBoer started in the trade in 1991. He has been a certified Red
          Seal 310S Auto Service Technician as well as a 310T Truck and Coach
          since May 1996.
        </Member>
        <Member image="stuart" alt="Stuart Gillanders">
          Stuart Gillanders started in the trade in 1997 and started working
          here in August 2005. He has been a certified Red Seal 310S Auto
          Service Technician since October 2004.
        </Member>
        <Member image="ryan" alt="Ryan Boulton">
          Ryan Boulton started in the trade in 1999 and started working here in
          March 2015. He has been a certified Red Seal 310S Auto Service
          Technician since September 2004.
        </Member>
        <Member image="william" alt="William Dyer">
          William Dyer started as a co-op student with us in 2012. He has been a
          certified Red Seal 310S Auto Service Technician since May 2018.
        </Member>
        <Member image="cody" alt="Cody Summers">
          Cody Summers started as a co-op student with us in 2018. He is
          currently working through his apprenticeship program here.
        </Member>
      </div>
    </>
  )
}
