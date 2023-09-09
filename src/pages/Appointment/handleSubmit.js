import emailjs from "@emailjs/browser"

export async function handleSubmit({ request }) {
  const data = Object.fromEntries(await request.formData())
  const error = checkErrors(data)
  return (
    error ||
    (await emailjs
      .send(
        "service_ernk545",
        "template_n738fta",
        {
          name: data.name,
          phone: data.phone,
          email: data.email,
          year: data.year,
          make: data.make.replace("+", " "),
          model: data.model,
          services: formatServices(data.service1, data.service2, data.service3),
          date: formatDate(data.date),
          time: formatTime(data.time),
          additional: data.additional,
        },
        "z9wM1wbI41kkRotot"
      )
      .then(
        () => ({ success: true }),
        () => ({ success: false })
      ))
  )
}

function checkErrors(data) {
  if (data.name === "") return { name: "Please enter a name." }
  if (data.phone === "") return { phone: "Please enter a phone number." }
  if (data.email === "") return { email: "Please enter an email address." }
  if (
    !data.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    return { email: "Please enter a valid email address. " }
  if (data.year === "") return { year: "Please enter a year." }
  if (!/^-?\d+$/.test(data.year)) return { year: "Please enter an integer." }
  if (Number(data.year) < 1900)
    return { year: "Please enter a year after 1900." }
  if (Number(data.year) > new Date().getFullYear())
    return { year: "Please enter a year in the past." }
  if (data.make == null) return { make: "Please select a make." }
  if (data.model === "") return { model: "Please enter a model." }
  if (data.service1 == null && data.service2 == null && data.service3 == null)
    return { service: "Please select at least 1 service." }
  if (data.date === "") return { date: "Please select a date." }
  const [selectedYear, selectedMonth, selectedDay] = data.date
    .split("-")
    .map(Number)
  const dayOfWeek =
    (selectedDay +
      Math.floor((13 * (selectedMonth + 1)) / 5) +
      selectedYear +
      Math.floor(selectedYear / 4) -
      Math.floor(selectedYear / 100) +
      Math.floor(selectedYear / 400)) %
    7
  if ([0, 1].includes(dayOfWeek)) return { date: "Please select a weekday." }
  if (data.time === "") return { time: "Please select a time." }
  const numericTime =
    Number(data.time.slice(0, 2)) + Number(data.time.slice(3, 5)) / 60
  if (dayOfWeek === 6 && (numericTime < 8 || numericTime > 13.5))
    return { time: "Please select a time between 8:00 AM and 1:30 PM." }
  if (numericTime < 8 || numericTime > 17)
    return { time: "Please select a time between 8:00 AM and 5:00 PM." }
}

function formatServices(service1, service2, service3) {
  return [service1, service2, service3]
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
