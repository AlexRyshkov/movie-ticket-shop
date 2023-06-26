import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import classes from "./styles.module.css";
import { getCinemas } from "@/services/api/cinema";
import Image from "next/image";
import { ActionMeta } from "react-select";
import Select from "./Select";

type FormControlProps = {
  label: string;
  control: ReactNode;
};

type SearchFilterProps = {
  onFilterChange: (name: string, value: string) => void;
};

const genreOptions = [
  { label: "ужасы", value: "horror" },
  { label: "комедия", value: "comedy" },
  { label: "фэнтези", value: "fantasy" },
  { label: "боевик", value: "action" },
];

SearchFilter.FormControl = function FormControl({
  label,
  control,
}: FormControlProps) {
  return (
    <label className={classes.formControlLabel}>
      {label}
      {control}
    </label>
  );
};

function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [cinemas, setCinemas] = useState<CinemaType[]>([]);

  useEffect(() => {
    async function fetchCinemas() {
      const cinemas = await getCinemas();
      setCinemas(cinemas);
    }
    fetchCinemas();
  }, []);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onFilterChange(event.target.name, event.target.value);
  };

  const selectChangeHandler = (option: any, actionMeta: any) => {
    if (actionMeta.name !== undefined) {
      onFilterChange(actionMeta.name, option?.value ?? null);
    }
  };

  return (
    <>
      <div className={classes.title}>Фильтр поиска</div>
      <form className={classes.form}>
        <SearchFilter.FormControl
          label="Название"
          control={
            <input
              type="text"
              name="title"
              className={classes.input}
              placeholder="Введите название"
              onChange={inputChangeHandler}
            />
          }
        />
        <SearchFilter.FormControl
          label="Жанр"
          control={
            <Select
              placeholder="Выберите жанр"
              name="genre"
              onChange={selectChangeHandler}
              options={genreOptions}
            />
          }
        />
        <SearchFilter.FormControl
          label="Кинотеатр"
          control={
            <Select
              placeholder="Выберите кинотеатр"
              name="cinema"
              options={cinemas.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              onChange={selectChangeHandler}
            />
          }
        />
      </form>
    </>
  );
}

export default SearchFilter;
