"use client"

import { useEffect, useId, useRef, useState } from "react"
import type { FormError } from "../types"
import ReactSelect, {
  type SingleValue,
  type MultiValue,
  type SelectInstance,
} from "react-select"

type SelectProps = {
  labelText: string
  name: string
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  isMulti?: boolean
  isSearchable?: boolean
  error?: FormError
}

export function Select({
  labelText,
  name,
  options,
  placeholder,
  isMulti = false,
  isSearchable = false,
  error,
}: SelectProps) {
  const id = useId()
  const ref = useRef<SelectInstance>(null)
  const [menuIsOpened, setMenuIsOpened] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<
    | MultiValue<{ value: string; label: string }>
    | SingleValue<{ value: string; label: string }>
  >()
  const [showError, setShowError] = useState(false)
  const [showErrorPopup, setShowErrorPopup] = useState(false)

  useEffect(() => {
    if (ref.current != null && error != null) {
      setShowError(true)
      ref.current.focus()
    }

    return () => setShowError(false)
  }, [ref, error])

  return (
    <div className="form-input">
      <label htmlFor={id} className={showError ? "error" : undefined}>
        {labelText}
      </label>
      <div>
        <ReactSelect
          unstyled
          ref={ref}
          inputId={id}
          instanceId={`${id}-instance`}
          isClearable
          isSearchable={isSearchable}
          isMulti={isMulti}
          placeholder={placeholder}
          options={options}
          menuPosition="fixed"
          classNames={{
            container: (state) =>
              `select ${state.isFocused ? "select-focused" : ""} ${
                showError ? "error" : ""
              }`,
            control: () => "select-control",
            indicatorSeparator: () => "select-separator",
            dropdownIndicator: () => "select-dropdown-indicator",
            clearIndicator: () => "select-clear-indicator",
            multiValue: () => "select-multi-value",
            multiValueRemove: () => "select-multi-value-remove",
            menu: () => "select-menu",
            option: (state) =>
              state.isSelected
                ? "select-option select-option-selected"
                : state.isFocused
                ? "select-option select-option-focused"
                : "select-option",
          }}
          onChange={(e) => {
            setSelectedOptions(
              e as
                | MultiValue<{ value: string; label: string }>
                | SingleValue<{ value: string; label: string }>
            )

            setShowError(false)
          }}
          value={selectedOptions}
          onFocus={() => setShowErrorPopup(true)}
          onBlur={() => setShowErrorPopup(false)}
          onMenuOpen={() => setMenuIsOpened(true)}
          onMenuClose={() => setMenuIsOpened(false)}
        />
        <input
          hidden
          name={name}
          value={
            selectedOptions == null
              ? ""
              : "value" in selectedOptions
              ? selectedOptions.value
              : JSON.stringify(selectedOptions.map((option) => option.value))
          }
          onChange={() => undefined}
        />
        {error != null && showError && showErrorPopup && !menuIsOpened && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </div>
  )
}
