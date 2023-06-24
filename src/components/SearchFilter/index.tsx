import { useState } from "react";
import classes from "./styles.module.css";
import { HTMLInputTypeAttribute } from "react";
import Image from "next/image";

type changeFunctionType = (name: FilterNameType, value: string) => void;

type InputProps = {
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  onChange: changeFunctionType;
  name: FilterNameType;
};

type SelectProps = Omit<InputProps, "type">;

type FormControlProps = {
  type: "select" | HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  name: FilterNameType;
  onChange: changeFunctionType;
};

function renderInput({ type, ...rest }: InputProps) {
  switch (type) {
    case "select":
      return <SearchFilter.Select {...rest} />;
    default:
      return <SearchFilter.Input type={type} {...rest} />;
  }
}

SearchFilter.FormControl = function FormControl({
  label,
  ...rest
}: FormControlProps) {
  return (
    <label className={classes.formControlLabel}>
      {label}
      {renderInput(rest)}
    </label>
  );
};

SearchFilter.Input = function Input({
  type,
  placeholder,
  name,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      className={classes.input}
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
    ></input>
  );
};

SearchFilter.Select = function Select({
  placeholder,
  name,
  onChange,
}: SelectProps) {
  const [isFocused, setIsFocused] = useState<boolean>();

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={classes.selectWrapper} onFocus={onFocus} onBlur={onBlur}>
      <select
        className={classes.select}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <Image
        alt="arrow"
        src="/icons/arrow.svg"
        width={20}
        height={20}
        className={classes.selectArrow}
        style={{ ...(isFocused && { transform: "rotate(180deg)" }) }}
      />
    </div>
  );
};

type SearchFilterProps = {
  filterValue: SearchFilterValue;
  onFilterChange: (filterValue: SearchFilterValue) => void;
};

function SearchFilter({ filterValue, onFilterChange }: SearchFilterProps) {
  const filterChangeHandler: changeFunctionType = (name, value) => {
    onFilterChange({ ...filterValue, [name]: value });
  };

  return (
    <div className={classes.searchFilter}>
      <div className={classes.title}>Фильтр поиска</div>
      <form className={classes.form}>
        <SearchFilter.FormControl
          type="text"
          label="Название"
          placeholder="Выберите название"
          name="title"
          onChange={filterChangeHandler}
        />
        <SearchFilter.FormControl
          type="select"
          label="Жанр"
          placeholder="Выберите жанр"
          name="cinemaName"
          onChange={filterChangeHandler}
        />
        <SearchFilter.FormControl
          type="select"
          label="Кинотеатр"
          placeholder="Выберите кинотеатр"
          name="genre"
          onChange={filterChangeHandler}
        />
      </form>
    </div>
  );
}

export default SearchFilter;
