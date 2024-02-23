"use client"

import React, { useId, useRef, useState } from "react"
import Select, { type SelectInstance } from "react-select"
import { useErrorHandling } from "../useErrorHandling"
import type { FormError } from "../types"

export const options = [
  { value: "Abarth", label: "Abarth" },
  { value: "Acura", label: "Acura" },
  { value: "Alfa_Romeo", label: "Alfa Romeo" },
  { value: "Aston_Martin", label: "Aston Martin" },
  { value: "Audi", label: "Audi" },
  { value: "Bentley", label: "Bentley" },
  { value: "BMW", label: "BMW" },
  { value: "Bugatti", label: "Bugatti" },
  { value: "Cadillac", label: "Cadillac" },
  { value: "Chevrolet", label: "Chevrolet" },
  { value: "Chrysler", label: "Chrysler" },
  { value: "Citroën", label: "Citroën" },
  { value: "Dacia", label: "Dacia" },
  { value: "Daewoo", label: "Daewoo" },
  { value: "Daihatsu", label: "Daihatsu" },
  { value: "Dodge", label: "Dodge" },
  { value: "Donkervoort", label: "Donkervoort" },
  { value: "DS", label: "DS" },
  { value: "Ferrari", label: "Ferrari" },
  { value: "Fiat", label: "Fiat" },
  { value: "Fisker", label: "Fisker" },
  { value: "Ford", label: "Ford" },
  { value: "Honda", label: "Honda" },
  { value: "Hummer", label: "Hummer" },
  { value: "Hyundai", label: "Hyundai" },
  { value: "Infiniti", label: "Infiniti" },
  { value: "Iveco", label: "Iveco" },
  { value: "Jaguar", label: "Jaguar" },
  { value: "Jeep", label: "Jeep" },
  { value: "Kia", label: "Kia" },
  { value: "KTM", label: "KTM" },
  { value: "Lada", label: "Lada" },
  { value: "Lamborghini", label: "Lamborghini" },
  { value: "Lancia", label: "Lancia" },
  { value: "Land Rover", label: "Land Rover" },
  { value: "Landwind", label: "Landwind" },
  { value: "Lexus", label: "Lexus" },
  { value: "Lotus", label: "Lotus" },
  { value: "Maserati", label: "Maserati" },
  { value: "Maybach", label: "Maybach" },
  { value: "Mazda", label: "Mazda" },
  { value: "McLaren", label: "McLaren" },
  { value: "Mercedes-Benz", label: "Mercedes-Benz" },
  { value: "MG", label: "MG" },
  { value: "Mini", label: "Mini" },
  { value: "Mitsubishi", label: "Mitsubishi" },
  { value: "Morgan", label: "Morgan" },
  { value: "Nissan", label: "Nissan" },
  { value: "Opel", label: "Opel" },
  { value: "Peugeot", label: "Peugeot" },
  { value: "Porsche", label: "Porsche" },
  { value: "Renault", label: "Renault" },
  { value: "Rolls-Royce", label: "Rolls-Royce" },
  { value: "Rover", label: "Rover" },
  { value: "Saab", label: "Saab" },
  { value: "Seat", label: "Seat" },
  { value: "Skoda", label: "Skoda" },
  { value: "Smart", label: "Smart" },
  { value: "SsangYong", label: "SsangYong" },
  { value: "Subaru", label: "Subaru" },
  { value: "Suzuki", label: "Suzuki" },
  { value: "Tesla", label: "Tesla" },
  { value: "Toyota", label: "Toyota" },
  { value: "Volkswagen", label: "Volkswagen" },
  { value: "Volvo", label: "Volvo" },
]

export function MakeSelect({ error }: { error?: FormError }) {
  const id = useId()
  const [menuIsOpened, setMenuIsOpened] = useState(false)
  const selectRef = useRef<SelectInstance>(null)
  const { showError, showErrorPopup, handleChange, handleBlur, handleFocus } =
    useErrorHandling(selectRef, error)

  return (
    <div className="form-input">
      <label htmlFor={id} className={showError ? "error" : undefined}>
        Make:
      </label>
      <div>
        <Select
          ref={selectRef}
          inputId={id}
          instanceId={`${id}-instance`}
          name="make"
          unstyled
          isClearable
          isSearchable={true}
          placeholder="Select a Make"
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
            menu: () => "select-menu",
            option: (state) =>
              state.isSelected
                ? "select-option select-option-selected"
                : state.isFocused
                ? "select-option select-option-focused"
                : "select-option",
          }}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMenuOpen={() => setMenuIsOpened(true)}
          onMenuClose={() => setMenuIsOpened(false)}
        />
        {error != null && showError && showErrorPopup && !menuIsOpened && (
          <div className="error-popup">{error.message}</div>
        )}
      </div>
    </div>
  )
}
