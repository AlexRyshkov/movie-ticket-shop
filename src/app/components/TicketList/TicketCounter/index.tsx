import Image from 'next/image'
import s from './styles.module.css'
import { useOrderContext } from '@/app/features/order/OrderContext'

const MaxTicketCount = 30

type Props = {
    movieId: string
}

function TicketCounter({ movieId }: Props) {
    const { order, dispatch } = useOrderContext()

    const count =
        order.find((item) => item.movieId === movieId)?.ticketCount ?? 0

    return (
        <div className={s.counter}>
            <button
                name="remove"
                disabled={count === 0}
                className={s.counterButton}
                onClick={() =>
                    dispatch({ type: 'removeTicket', payload: movieId })
                }
            >
                <Image
                    alt="minus"
                    src="/icons/minus.svg"
                    width={12}
                    height={12}
                />
            </button>
            <span className={s.counterValue}>{count}</span>
            <button
                name="add"
                disabled={count === MaxTicketCount}
                className={s.counterButton}
                onClick={() =>
                    dispatch({ type: 'addTicket', payload: movieId })
                }
            >
                <Image
                    alt="plus"
                    src="/icons/plus.svg"
                    width={12}
                    height={12}
                />
            </button>
        </div>
    )
}

export default TicketCounter
