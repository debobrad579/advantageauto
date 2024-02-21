"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { FormState } from "../types";

export function Modal({ formState }: { formState: FormState }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    function keyboardHandler(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    function mouseHandler(e: MouseEvent) {
      if (modalRef.current == null) return;

      const modalDimentions = modalRef.current.getBoundingClientRect();

      if (
        e.clientX <= modalDimentions.left ||
        e.clientX >= modalDimentions.right ||
        e.clientY <= modalDimentions.top ||
        e.clientY >= modalDimentions.bottom
      )
        setIsOpen(false);
    }

    document.addEventListener("keydown", keyboardHandler);
    document.addEventListener("click", mouseHandler);
    setIsMounted(true);

    return () => {
      document.removeEventListener("keydown", keyboardHandler);
      document.removeEventListener("click", mouseHandler);
    };
  }, []);

  useEffect(() => {
    if (formState.status === "Success" || formState.status === "Server Error")
      setIsOpen(true);
  }, [formState]);

  return (
    isMounted &&
    createPortal(
      isOpen && (
        <div className="modal">
          <div ref={modalRef}>
            <h2>
              {formState.status === "Success"
                ? "Request Submitted Successfully"
                : `Request Submission Failed`}
            </h2>
            <button className="btn" onClick={() => setIsOpen(false)} autoFocus>
              Close
            </button>
          </div>
        </div>
      ),
      document.getElementById("modal-container")!
    )
  );
}
