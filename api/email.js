import { createTransport } from "nodemailer"
import { catchErrors } from "../src/pages/Appointment/catchErrors.js"

export default function handler(request, response) {
  if (request.method != "POST")
    return response.status(405).json({ success: false })

  const data = request.body

  if (catchErrors(data)) return response.status(400).json({ success: false })

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: "bradydeboer195@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  const mailOptions = {
    from: "bradydeboer195@gmail.com",
    to: "thebradster7.bd@gmail.com",
    subject: "Online Appointment Request",
    text: `
Client Information:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}

Vehicle Information:
Year: ${data.year}
Make: ${data.make}
Model: ${data.model}

Service Information:
Services: ${formatServices(data.services)}
Date: ${formatDate(data.date)}
Time: ${formatTime(data.time)}

${data.additional ? "Additional Information:" : ""}
${data.additional}
    `,
    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <h2>Client Information</h2>
  <p>
    Name: ${data.name}
    <br>
    Phone: ${data.phone}
    <br>
    Email: ${data.email}
  </p>
  <h2>Vehicle Information</h2>
  <p>
    Year: ${data.year}
    <br>
    Make: ${data.make}
    <br>
    Model: ${data.model}
  </p>
  <h2>Service Information</h2>
  <p>
    Services: ${formatServices(data.services)}
    <br>
    Date: ${formatDate(data.date)}
    <br>
    Time: ${formatTime(data.time)}
  </p>
  ${data.additional ? "<h2>Additional Information</h2>" : ""}
  <p>${data.additional}</p>
</div>
    `,
  }

  transporter.sendMail(mailOptions, error => {
    if (error) return response.status(500).json({ success: false })
    else return response.status(200).json({ success: true })
  })
}

function formatServices(services) {
  return services
    .filter(i => i != null)
    .map(i => i.replace("+", " "))
    .join(", ")
}

function formatDate(date) {
  const [year, month, day] = date.split("-").map(Number)
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

function formatTime(time) {
  const [hour, minute] = time.split(":").map(Number)
  return `${hour % 12 !== 0 ? hour % 12 : 12}:${minute
    .toString()
    .padStart(2, "0")} ${hour < 12 ? "AM" : "PM"}`
}
