import { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./styles.module.css";
import TicketList from "@/components/TicketList";
import SearchFilter from "@/components/SearchFilter";
import { getMovies } from "@/services/api/movie";

function MainPage() {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [filterValue, setFilterValue] = useState<SearchFilterValue>({
    title: "",
    cinemaName: "",
    genre: "",
  });

  useEffect(() => {
    async function fetchMovies() {
      const movies = await getMovies();
      setMovies(movies);
    }
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    let result = Array.from(movies);
    if (filterValue.title.length > 0) {
      result = result.filter((movie) =>
        movie.title.includes(filterValue.title)
      );
    }
    return result;
  }, [movies, filterValue]);

  const filterChangeHandler = useCallback(
    (filterValue: SearchFilterValue) => {
      setFilterValue(filterValue);
    },
    [movies]
  );

  console.log(movies);
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
