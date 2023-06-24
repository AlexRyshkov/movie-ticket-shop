import React from "react";
import s from "./styles.module.css";
import Image from "next/image";
import TicketCounter from "@/components/TicketCounter";

type Props = {
  movie: MovieType;
};

type InfoLineProps = {
  label: string;
  text: string;
};

function InfoLine({ label, text }: InfoLineProps) {
  return (
    <div className={s.infoLine}>
      <span className={s.infoLabel}>{label}</span>
      <span className={s.infoText}>{text}</span>
    </div>
  );
}

function Movie({ movie }: Props) {
  return (
    <div className={s.informationBlock}>
      <Image
        alt="poster"
        src={movie.posterUrl}
        width={400}
        height={500}
        className={s.poster}
      />
      <div className={s.information}>
        <div className={s.titleRow}>
          <span className={s.title}>{movie.title}</span>
          <TicketCounter />
        </div>
        <div className={s.infoBlock}>
          <InfoLine label="Жанр:" text={movie.genre} />
          <InfoLine label="Год выпуска:" text={String(movie.releaseYear)} />
          <InfoLine label="Рейтинг:" text={String(movie.rating)} />
          <InfoLine label="Режиссер:" text={movie.director} />
        </div>
        <div className={s.descriptionTitle}>Описание</div>
        <div className={s.description}>{movie.description}</div>
      </div>
    </div>
  );
}

export default Movie;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/movies`);
  const movies: MovieType[] = await res.json();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return { paths, fallback: false };
}

type getStaticPropsType = {
  params: {
    id: string;
  };
};

export async function getStaticProps({ params }: getStaticPropsType) {
  const res = await fetch(
    `${process.env.API_URL}/movie?` +
      new URLSearchParams({
        movieId: params.id,
      })
  );
  const movie: MovieType = await res.json();
  return { props: { movie } };
}
