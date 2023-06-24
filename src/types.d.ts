type MovieType = {
  id: string;
  title: string;
  description: string;
  director: string;
  genre: string;
  posterUrl: string;
  rating: number;
  releaseYear: number;
  reviewIds: any[];
};

type ReviewType = {
  id: string;
  name: string;
  text: string;
  rating: number;
};
