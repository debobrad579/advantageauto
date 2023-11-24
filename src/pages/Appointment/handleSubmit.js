import { catchErrors } from "./catchErrors"

export async function handleSubmit(request) {
  const data = Object.fromEntries(await request.formData())
  data.services = [data.service1, data.service2, data.service3]

  return (
    catchErrors(data) ||
    (process.env.NODE_ENV === "production"
      ? await fetch("https://www.advantageauto.ca/api/email.js", {
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
      : { success: true })
  )
}
