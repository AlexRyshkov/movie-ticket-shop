import { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./styles.module.css";
import TicketList from "@/components/TicketList";
import SearchFilter from "@/components/SearchFilter";
import { getMovies } from "@/services/api/movie";

function MainPage() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [filterValue, setFilterValue] = useState<SearchFilterValue>({
    title: "",
    cinema: "",
    genre: "",
  });

  useEffect(() => {
    async function fetchMovies() {
      const movies = await getMovies(filterValue.cinema);
      setMovies(movies);
    }
    fetchMovies();
  }, [filterValue.cinema]);

  const filteredMovies = useMemo(() => {
    let result = Array.from(movies);

    if (filterValue.title.length > 0) {
      result = result.filter((movie) =>
        movie.title.includes(filterValue.title)
      );
    }

    if (filterValue.genre.length > 0) {
      result = result.filter((movie) =>
        movie.genre.includes(filterValue.genre)
      );
    }

    return result;
  }, [movies, filterValue]);

  const filterChangeHandler = useCallback(
    (
      name: FilterNameType,
      value: string | number | readonly string[] | undefined
    ) => {
      setFilterValue((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  return (
    <div className={classes.container}>
      <div className={classes.searchFilterContainer}>
        <SearchFilter
          filterValue={filterValue}
          onFilterChange={filterChangeHandler}
        />
      </div>
      <div className={classes.ticketListContainer}>
        {filteredMovies?.length > 0 && <TicketList items={filteredMovies} />}
      </div>
    </div>
  );
}

export default MainPage;
