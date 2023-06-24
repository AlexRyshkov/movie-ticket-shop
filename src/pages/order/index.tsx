import TicketList from "@/components/TicketList";
import React, { useMemo } from "react";
import s from "./styles.module.css";
import { useOrderContext } from "@/features/order/OrderContext";
import useTicketCount from "@/features/order/useTicketCount";

type Props = {
  movies: MovieType[];
};

function Order({ movies }: Props) {
  const { order } = useOrderContext();
  const ticketCount = useTicketCount(order);

  const orderMovies = useMemo(() => {
    const orderMovieIds = order.map((item) => item.movieId);
    return movies.filter((item) => orderMovieIds.includes(item.id));
  }, [movies, order]);

  return (
    <div className={s.inner}>
      <TicketList items={orderMovies} />
      <div className="grow" />
      <div className={s.orderSummary}>
        <span>Итого билетов:</span>
        <span>{ticketCount}</span>
      </div>
    </div>
  );
}

type getStaticPropsType = {
  params: {
    id: string;
  };
};

export async function getStaticProps() {
  const movies = await (await fetch(`${process.env.API_URL}/movies`)).json();

  return { props: { movies } };
}

export default Order;
