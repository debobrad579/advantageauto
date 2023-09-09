import { useEffect, useState } from "react"

export function useErrorHandling(error, ref) {
  const [showError, setShowError] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  useEffect(() => {
    if (error != null) {
      setShowError(true)
      ref.current.focus()
    }

    return () => {
      setShowError(false)
    }
  }, [error])

  function handleChange() {
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
