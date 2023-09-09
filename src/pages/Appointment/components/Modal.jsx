import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export function Modal({ error }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (error?.success != null) modalRef.current.showModal()
  }, [error])

  function handleClick(e) {
    const modalDimentions = modalRef.current.getBoundingClientRect()

    if (
      e.clientX < modalDimentions.left ||
      e.clientX > modalDimentions.right ||
      e.clientY < modalDimentions.top ||
      e.clientY > modalDimentions.bottom
    )
      modalRef.current.close()
  }

  return createPortal(
    <dialog className="modal" ref={modalRef} onClick={handleClick}>
      <p>
        {error?.success
          ? "Request Submitted Successfully"
          : "Request Submission Failed"}
      </p>
      <button onClick={() => modalRef.current.close()}>Close</button>
    </dialog>,
    document.getElementById("modal-container")
  )
}
