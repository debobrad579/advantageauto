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
    if (error?.success) setIsOpen(true)
  }, [error])

  return createPortal(
    isOpen && (
      <div
        className="modal-overlay"
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
        <div className="modal" ref={modalRef}>
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

// export function Modal({ error }) {
//   const modalRef = useRef(null)

//   useEffect(() => {
//     if (error?.success != null && process.env.NODE_ENV !== "test") {
//       modalRef.current.showModal()
//     }
//   }, [error])

//   function handleClick(e) {
//     const modalDimentions = modalRef.current.getBoundingClientRect()

//     if (
//       e.clientX < modalDimentions.left ||
//       e.clientX > modalDimentions.right ||
//       e.clientY < modalDimentions.top ||
//       e.clientY > modalDimentions.bottom
//     )
//       modalRef.current.close()
//   }

//   return createPortal(
//     <dialog className="modal" ref={modalRef} onClick={handleClick}>
//       <p>
//         {error?.success
//           ? "Request Submitted Successfully"
//           : "Request Submission Failed"}
//       </p>
//       <button onClick={() => modalRef.current.close()}>Close</button>
//     </dialog>,
//     document.getElementById("modal-container")
//   )
// }
