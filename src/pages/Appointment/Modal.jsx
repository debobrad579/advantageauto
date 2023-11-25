import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export function Modal({ error }) {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])

  useEffect(() => {
    if (error?.success != null) setIsOpen(true)
  }, [error])

  return createPortal(
    isOpen && (
      <div
        className="modal"
        onClick={e => {
          const modalDimentions = modalRef.current.getBoundingClientRect()

          if (
            e.clientX <= modalDimentions.left ||
            e.clientX >= modalDimentions.right ||
            e.clientY <= modalDimentions.top ||
            e.clientY >= modalDimentions.bottom
          )
            setIsOpen(false)
        }}
      >
        <div ref={modalRef}>
          <p>
            {error?.success
              ? "Request Submitted Successfully"
              : "Request Submission Failed"}
          </p>
          <button className="button" onClick={() => setIsOpen(false)} autoFocus>
            Close
          </button>
        </div>
      </div>
    ),
    document.getElementById("modal-container")
  )
}
