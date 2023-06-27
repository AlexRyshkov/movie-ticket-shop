import TicketList from '@/app/components/TicketList'
import React, { useMemo } from 'react'
import s from './styles.module.css'
import { useOrderContext } from '@/app/features/order/OrderContext'
import useTicketCount from '@/app/features/order/useTicketCount'
import classnames from 'classnames'

type Props = {
    movies: MovieType[]
}

function Order({ movies }: Props) {
    const { order } = useOrderContext()
    const ticketCount = useTicketCount(order)

    const orderMovies = useMemo(() => {
        const orderMovieIds = order.map((item) => item.movieId)
        return movies.filter((item) => orderMovieIds.includes(item.id))
    }, [movies, order])

    return (
        <div className={s.inner}>
            {orderMovies.length > 0 ? (
                <TicketList items={orderMovies} />
            ) : (
                <div className="paperBlock">Корзина пуста</div>
            )}

            <div className="grow" />
            <div className={classnames('paperBlock', s.orderSummary)}>
                <span>Итого билетов:</span>
                <span>{ticketCount}</span>
            </div>
        </div>
    )
}

type getStaticPropsType = {
    params: {
        id: string
    }
}

export async function getStaticProps() {
    const movies = await (await fetch(`${process.env.API_URL}/movies`)).json()

    return { props: { movies } }
}

export default Order
