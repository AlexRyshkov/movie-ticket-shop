import React, { useId } from "react";
import ReactSelect, { DropdownIndicatorProps, components } from "react-select";
import Image from "next/image";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";

export interface SelectOption {
  label: string;
  value: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image
        alt="dropdown-indicator"
        src="/icons/arrow.svg"
        width={20}
        height={20}
        style={{
          ...(props.selectProps.menuIsOpen && { transform: "rotate(180deg)" }),
        }}
      />
    </components.DropdownIndicator>
  );
};

const styles = {
  fontSize: "14px",
  lineHeight: "20px",
  padding: 0,
  margin: 0,
};

function Select(props: StateManagerProps<SelectOption>) {
  return (
    <ReactSelect
      isClearable
      instanceId={useId()}
      components={{
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderRadius: 8,
          padding: "10px 16px",
          borderColor: state.menuIsOpen ? "#f50" : "#e1e3e6",
          boxShadow: "none",
          "&:hover": {
            borderColor: state.menuIsOpen ? "#f50" : "#e1e3e6",
          },
        }),
        clearIndicator: (baseStyles, state) => ({
          ...baseStyles,
          padding: 0,
          marginRight: 8,
          width: 20,
          height: 20,
          cursor: "pointer",
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          padding: 0,
          cursor: "pointer",
        }),
        valueContainer: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
          color: "#999FA6",
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
        }),
        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          ...styles,
        }),
      }}
      {...props}
    />
  );
}

export default Select;
