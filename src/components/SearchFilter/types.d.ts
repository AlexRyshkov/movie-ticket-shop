type FilterNameType = "title" | "cinema" | "genre";

type SearchFilterValue = { [key in FilterNameType]: string };
