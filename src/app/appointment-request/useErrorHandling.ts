import { RefObject, useEffect, useState } from "react"
import { ERROR_PREDICATES } from "./errors"
import type { FormError } from "./types"

export function useErrorHandling(
  ref: RefObject<HTMLInputElement | HTMLSelectElement>,
  error?: FormError
) {
  const [showError, setShowError] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  useEffect(() => {
    if (ref.current != null && error != null) {
      setShowError(true)
      ref.current.focus()
    }

    return () => {
      setShowError(false)
    }
  }, [ref, error])

  function handleChange() {
    if (ref.current == null || error == null) return

    if (ERROR_PREDICATES[error.predicate](ref.current.value))
      return setShowError(true)

    setShowError(false)
  }

  function handleBlur() {
    setShowErrorPopup(false)
  }

  function handleFocus() {
    setShowErrorPopup(true)
  }

  return {
    showError,
    showErrorPopup,
    handleChange,
    handleBlur,
    handleFocus,
  }
}
