type MovieType = {
  id: string;
  title: string;
  description: string;
  director: string;
  genre: string;
  posterUrl: string;
  rating: number;
  releaseYear: number;
  reviewIds: string[];
};

type ReviewType = {
  id: string;
  name: string;
  text: string;
  rating: number;
};

type CinemaType = {
  id: string;
  name: string;
  movieIds: string[];
};
