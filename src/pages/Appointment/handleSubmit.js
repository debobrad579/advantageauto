import { track } from "@vercel/analytics/react"
import { catchErrors } from "./catchErrors"

export async function handleSubmit(request) {
  const data = Object.fromEntries(await request.formData())
  data.services = [data.service1, data.service2, data.service3]

  const error = catchErrors(data)

  if (error) return error

  return await fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      track("Submit Appointment Request", { status: res.status })

      if (res.ok) {
        return { success: true }
      }

      throw new Error(res.status)
    })
    .catch(e => {
      return {
        success: false,
        status: e instanceof TypeError ? 500 : e.message,
      }
    })
}
