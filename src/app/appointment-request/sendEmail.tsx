"use server"

import { checkForError } from "./errors"
import { createTransport } from "nodemailer"
import type { FormState } from "./types"
import { render } from "@react-email/render"
import Email from "@/emails/appointment"

export async function sendEmail(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const error = checkForError(formData)
  if (error != null) return { status: "Client Error", error: error }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "bradydeboer195@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const emailHtml = render(
    <Email
      name={formData.get("name")!.toString()}
      phone={formData.get("phone")!.toString()}
      email={formData.get("email")!.toString()}
      year={formData.get("year")!.toString()}
      make={formData.get("make")!.toString().replace("_", " ")}
      model={formData.get("model")!.toString()}
      services={formatServices(
        JSON.parse(formData.get("services")!.toString())
      )}
      date={formatDate(formData.get("date"))!}
      time={formatTime(formData.get("time"))!}
      additional={formData.get("additional")?.toString()}
    />
  )

  const mailOptions = {
    from: "Advantage Auto Appt.",
    to: "thebradster7.bd@gmail.com",
    subject: "Online Appointment Request",
    html: emailHtml,
  }

  let formState: FormState = {
    status: "Server Error",
  }

  await transporter
    .sendMail(mailOptions)
    .then(() => {
      formState = { status: "Success" }
    })
    .catch((error) => {
      console.error(error)
    })

  return formState
}

function formatServices(services: (FormDataEntryValue | null)[]) {
  return services
    .filter((i) => i != null && i !== "0")
    .map((i) => i!.toString().replace("_", " "))
    .join(", ")
}

function formatDate(date: FormDataEntryValue | null) {
  if (date == null) return
  const [year, month, day] = date.toString().split("-").map(Number)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return `${monthNames[month - 1]} ${day}, ${year}`
}

function formatTime(time: FormDataEntryValue | null) {
  if (time == null) return
  const [hour, minute] = time.toString().split(":").map(Number)
  return `${hour % 12 !== 0 ? hour % 12 : 12}:${minute
    .toString()
    .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`
}
