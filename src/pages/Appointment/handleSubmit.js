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

  return await fetch("https://www.advantageauto.ca/api/email", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .catch(() => {
      return { success: false }
    })
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
