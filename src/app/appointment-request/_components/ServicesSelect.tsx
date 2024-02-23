"use client"

import React, { useId, useRef, useState } from "react"
import Select, { MultiValue, SelectInstance } from "react-select"
import { FormError } from "../types"
import { useErrorHandling } from "../useErrorHandling"

const options = [
  { value: "Brakes", label: "Brakes" },
  { value: "Suspension", label: "Suspension" },
  { value: "Alignment", label: "Alignment" },
  { value: "Exhaust", label: "Exhaust" },
  { value: "Air_Conditioning", label: "Air Conditioning" },
  { value: "Tire_sale", label: "Tire sale" },
  { value: "Tire_repair", label: "Tire repair" },
  { value: "Road_Force_balancing", label: "Road Force balancing" },
  { value: "TPMS_programming", label: "TPMS programming" },
  { value: "Diagnostics", label: "Diagnostics" },
  { value: "Electrical", label: "Electrical" },
  { value: "Emissions", label: "Emissions" },
  { value: "Hybrid_car_service", label: "Hybrid car service" },
  { value: "Engine_replacement", label: "Engine replacement" },
  { value: "Transmission_replacement", label: "Transmission replacement" },
  { value: "Pre-purchase_inspection", label: "Pre-purchase inspection" },
  { value: "Dripless_undercoating", label: "Dripless undercoating" },
]

export function ServicesSelect({ error }: { error?: FormError }) {
  const id = useId()
  const selectRef = useRef<SelectInstance>(null)
  const [menuIsOpened, setMenuIsOpened] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<{
      value: string
      label: string
    }>
  >([])

  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(selectRef, error)

  return (
    <div className="form-input">
      <label htmlFor={id} className={showError ? "error" : undefined}>
        Services:
      </label>
      <div>
        <Select
          unstyled
          ref={selectRef}
          inputId={id}
          instanceId={`${id}-instance`}
          isClearable
          isSearchable={false}
          isMulti
          placeholder="Select Requested Services"
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
              e as MultiValue<{
                value: string
                label: string
              }>
            )
            handleChange()
          }}
          value={selectedOptions}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMenuOpen={() => setMenuIsOpened(true)}
          onMenuClose={() => setMenuIsOpened(false)}
        />
        {error != null && showError && showErrorPopup && !menuIsOpened && (
          <div className="error-popup">{error.message}</div>
        )}
        <input
          hidden
          name="services"
          defaultValue={JSON.stringify(
            selectedOptions.map((option) => option.value)
          )}
        />
      </div>
    </div>
  )
}
