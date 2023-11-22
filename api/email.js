import { createTransport } from "nodemailer"

export default function handler(request, response) {
  try {
    if (request.method != "POST") return

    const data = request.body

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
      subject: "Test",
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

Additional Information:
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
  <h2>Additional Information</h2>
  <p>${data.additional}</p>
</div>
    `,
    }

    transporter.sendMail(mailOptions, error => {
      if (error) response.json({ success: false })
      else response.json({ success: true })
    })
  } catch {
    response.json({ success: false })
  }
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
