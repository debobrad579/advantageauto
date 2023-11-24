export function catchErrors(data) {
  for (const key in ERRORS) {
    for (let i = 0; i < ERRORS[key].length; i++) {
      if (ERRORS[key][i].conditional(data[key]))
        return { [key]: { ...ERRORS[key][i] } }
    }
  }

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
  const numericTime =
    Number(data.time.slice(0, 2)) + Number(data.time.slice(3, 5)) / 60

  if (dayOfWeek === 6 && numericTime > 13.5)
    return {
      time: {
        message: "Please select a time before 1:30 PM on Fridays.",
        conditional: () => false,
      },
    }
}

const ERRORS = {
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
  service1: [
    {
      message: "Please select a service.",
      conditional: service => service == null || service === "0",
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
        const dayOfWeek =
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
      message: "Please select a time between 8:00 AM and 5:00 PM.",
      conditional: time => {
        const numericTime =
          Number(time.slice(0, 2)) + Number(time.slice(3, 5)) / 60
        return numericTime < 8 || numericTime > 17
      },
    },
  ],
}
