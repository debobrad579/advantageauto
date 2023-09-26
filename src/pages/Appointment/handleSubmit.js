import emailjs from "@emailjs/browser"

export async function handleSubmit(request) {
  const data = Object.fromEntries(await request.formData())
  data.services = [data.service1, data.service2, data.service3]

  const errors = getPossibleErrors()
  for (const key in errors) {
    for (let i = 0; i < errors[key].length; i++) {
      if (errors[key][i].conditional(data[key]))
        return { [key]: errors[key][i].message }
    }
  }

  if (process.env.NODE_ENV !== "production") return { success: true }
  return await emailjs
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
        services: formatServices(
          data.services[0],
          data.services[1],
          data.services[2]
        ),
        date: formatDate(data.date),
        time: formatTime(data.time),
        additional: data.additional,
      },
      "z9wM1wbI41kkRotot"
    )
    .then(
      () => ({ success: true }),
      () => ({ success: false })
    )
}

function getPossibleErrors() {
  let dayOfWeek

  return {
    name: [
      {
        message: "Please enter a name.",
        conditional: name => name === "",
      },
    ],
    phone: [
      {
        message: "Please enter a phone number.",
        conditional: phone => phone === "",
      },
    ],
    email: [
      {
        message: "Please enter an email address.",
        conditional: email => email === "",
      },
      {
        message: "Please enter a valid email address.",
        conditional: email =>
          !email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
      },
    ],
    year: [
      {
        message: "Please enter a year.",
        conditional: year => year === "",
      },
      {
        message: "Please enter a numeric year.",
        conditional: year => !/^-?\d+$/.test(year),
      },
      {
        message: "Please enter a year after 1900.",
        conditional: year => parseInt(year) < 1900,
      },
      {
        message: "Please enter a year in the past.",
        conditional: year => parseInt(year) > new Date().getFullYear(),
      },
    ],
    make: [
      {
        message: "Please select a make.",
        conditional: make => make == null || make === "0",
      },
    ],
    model: [
      {
        message: "Please enter a model.",
        conditional: model => model === "",
      },
    ],
    services: [
      {
        message: "Please select at least one service.",
        conditional: services =>
          services.filter(service => service != null && service != "0")
            .length === 0,
      },
    ],
    date: [
      {
        message: "Please select a date.",
        conditional: date => date === "",
      },
      {
        message: "Please select a weekday.",
        conditional: date => {
          const [selectedYear, selectedMonth, selectedDay] = date
            .split("-")
            .map(Number)
          dayOfWeek =
            (selectedDay +
              Math.floor((13 * (selectedMonth + 1)) / 5) +
              selectedYear +
              Math.floor(selectedYear / 4) -
              Math.floor(selectedYear / 100) +
              Math.floor(selectedYear / 400)) %
            7
          return [0, 1].includes(dayOfWeek)
        },
      },
    ],
    time: [
      {
        message: "Please select a time.",
        conditional: time => time === "",
      },
      {
        message: "Please select a time between 8:00 AM and 1:30 PM.",
        conditional: time => {
          const numericTime =
            Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60
          return dayOfWeek === 6 && (numericTime < 8 || numericTime > 13.5)
        },
      },
      {
        message: "Please select a time between 8:00 AM and 5:00 PM.",
        conditional: time => {
          const numericTime =
            Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60
          return numericTime < 8 || numericTime > 17
        },
      },
    ],
  }
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
