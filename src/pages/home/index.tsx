import { useCallback, useEffect, useMemo, useState } from "react";
import classes from "./styles.module.css";
import { getMovies } from "@/services/api/movie";
import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import SearchFilter from "@/app/components/SearchFilter";
import TicketList from "@/app/components/TicketList";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import debounce from "lodash.debounce";

function MainPage() {
  const [filterValue, setFilterValue] = useState<SearchFilterValue>({
    title: "",
    cinema: "",
    genre: "",
  });

  const { isLoading, data: movies } = useQuery<MovieType[]>({
    queryKey: ["movies", { cinema: filterValue.cinema }],
    queryFn: () => getMovies(filterValue.cinema),
    staleTime: 5 * 60 * 1000,
  });

  const filteredMovies = useMemo(() => {
    if (!movies) {
      return [];
    }

    let result = Array.from(movies as MovieType[]);

    if (filterValue.title.length > 0) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(filterValue.title.toLowerCase())
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
    (name: string, value: string | null) =>
      setFilterValue((prev) => ({ ...prev, [name]: value ?? "" })),
    []
  );

  const debouncedFilter = useMemo(() => {
    return debounce(filterChangeHandler, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
    };
  });

  return (
    <div className={classes.container}>
      <div className={classNames("paperBlock", classes.searchFilterContainer)}>
        <SearchFilter onFilterChange={debouncedFilter} />
      </div>
      <div className={classes.ticketListContainer}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <TicketList items={filteredMovies} />
        )}
      </div>
    </div>
  );
}

export default MainPage;
