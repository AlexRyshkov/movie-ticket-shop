import React from "react";

function Movie({ movie }) {
  return <div>123</div>;
}

export default Movie;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/movies`);
  const movies = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.API_URL}/movie?` +
      new URLSearchParams({
        movieId: params.id,
      })
  );
  const movie = await res.json();
  return { props: { movie } };
}
