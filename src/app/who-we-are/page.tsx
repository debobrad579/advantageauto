import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Who We Are",
  description:
    "Advantage Auto started in 2004 when we purchased an existing business that had a history of dependable auto service since the 1950's.",
}

export default function WhoWeAre() {
  return (
    <>
      <h1>Who We Are</h1>
      <div className="column-container">
        <div>
          <p>
            Thanks for taking the time to research our business. Advantage Auto
            started in 2004 when we purchased an existing business that had a
            history of dependable auto service since the 1950's. We spent the
            first 5 years in the original business location until we out grew it
            and moved to our present facility in 2009. Our present location has
            offed us the ability to add more services such as alignments and
            expanded tire sales and services.
          </p>
          <p>
            Our goal is to keep your vehicle serviced and repaired in a timely
            manor. We schedule by appointment so we can get your vehicle back to
            you as soon as we are finished with it. We know your schedule is
            busy so the sooner we can you your wheels back to you, the better it
            is. Walk in service can only be accommodated if the schedule allows
            it.
          </p>
        </div>
        <div>
          <p>
            Our standard procedure is to use high quality parts for both
            reliability and longer service performance. As with everything in
            life, “you get what you pay for,” and automobile service is no
            different. We are not overly aggressive when it comes to sales: the
            car needs what it needs when it shows up here. We don't like
            repairing junk, and we have no problem telling you when your vehicle
            is nearing the end of its safe and useful life and that you need to
            go shopping. If it is unsafe, we will tell you and you will need to
            decide what to do about it. We constantly report vehicle condition
            to our regular customers so they can plan for a newer mode of
            transportation when necessary. We try and minimize surprise failures
            as much as possible.
          </p>
          <p>
            We are proud to allow{" "}
            <a
              href="https://organizedkaos.org/"
              target="_blank"
              rel="noreferrer"
            >
              Organized Kaos
            </a>{" "}
            to use our facility for hands on trade experience for youth. There
            is an upcoming shortage of trades people so we feel that it is
            important to promote and allow youth to get a feel for what this
            trade can offer.
          </p>
          <p>
            Our hours are Monday through Thursday 8 am through 5 pm, Fridays 8
            am though 1:30 pm. We are closed for all statutory holidays. As
            everybody has found out by living through COVID-19, life is busy and
            stressful, and our staff needs and appreciates time off to unwind
            and refresh.
          </p>
        </div>
      </div>
    </>
  )
}
