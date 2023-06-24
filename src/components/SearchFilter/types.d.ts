type FilterNameType = "title" | "cinemaName" | "genre";

type SearchFilterValue = { [key in FilterNameType]: string };
