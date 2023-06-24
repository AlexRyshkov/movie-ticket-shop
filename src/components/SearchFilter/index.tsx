import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { HTMLInputTypeAttribute } from "react";
import Image from "next/image";
import { getCinemas } from "@/services/api/cinema";

type changeFunctionType = (name: FilterNameType, value: string) => void;

type InputProps = {
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  onChange: changeFunctionType;
  name: FilterNameType;
  options?: {
    value: string | number | readonly string[] | undefined;
    text: string;
  }[];
};

type SelectProps = Omit<InputProps, "type">;

type FormControlProps = {
  type: "select" | HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  name: FilterNameType;
  options?: {
    value: string | number | readonly string[] | undefined;
    text: string;
  }[];
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
  options,
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
        <option value="" disabled selected>
          {placeholder}
        </option>
        {options?.map((item) => (
          <option value={item.value}>{item.text}</option>
        ))}
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
  onFilterChange: changeFunctionType;
};

function SearchFilter({ filterValue, onFilterChange }: SearchFilterProps) {
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);

  useEffect(() => {
    async function fetchCinemas() {
      const cinemas = await getCinemas();
      setCinemas(cinemas);
    }
    fetchCinemas();
  }, []);

  return (
    <div className={classes.searchFilter}>
      <div className={classes.title}>Фильтр поиска</div>
      <form className={classes.form}>
        <SearchFilter.FormControl
          type="text"
          label="Название"
          placeholder="Выберите название"
          name="title"
          onChange={onFilterChange}
        />
        <SearchFilter.FormControl
          type="select"
          options={[
            { text: "ужасы", value: "horror" },
            { text: "комедия", value: "comedy" },
            { text: "фэнтези", value: "fantasy" },
            { text: "боевик", value: "action" },
          ]}
          label="Жанр"
          placeholder="Выберите жанр"
          name="genre"
          onChange={onFilterChange}
        />
        <SearchFilter.FormControl
          type="select"
          options={cinemas.map((item) => ({ text: item.name, value: item.id }))}
          label="Кинотеатр"
          placeholder="Выберите кинотеатр"
          name="cinema"
          onChange={onFilterChange}
        />
      </form>
    </div>
  );
}

export default SearchFilter;
