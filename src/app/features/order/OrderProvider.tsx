'use client'

import React, {
    ReactNode,
    useCallback,
    useEffect,
    useReducer,
    useState,
} from 'react'
import { OrderContext } from './OrderContext'
import SubmitModal from '@/app/components/SubmitModal'
import reducer from './reducer'
import { useRouter } from 'next/router'

type Props = {
    children: ReactNode
}

const initialOrder: Order = []

function OrderProvider({ children }: Props) {
    const router = useRouter()

    const [order, dispatch] = useReducer(reducer, initialOrder)
    const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)
    const [pendingAction, setPendingAction] = useState<Action | null>(null)

    const dispatchWithMiddleware = useCallback(
        (action: Action) => {
            if (
                router.pathname === '/order' &&
                action.type === 'removeTicket'
            ) {
                if (
                    order.filter(
                        (item) =>
                            item.movieId === action.payload &&
                            item.ticketCount === 1
                    ).length === 1
                ) {
                    setPendingAction(action)
                    return
                }
            }

            dispatch(action)
        },
        [order, dispatch, router.pathname]
    )

    useEffect(() => {
        setShowSubmitModal(pendingAction !== null)
    }, [pendingAction])

    const submitDelete = useCallback(() => {
        if (pendingAction !== null) {
            dispatch(pendingAction)
            setPendingAction(null)
        }
    }, [pendingAction])

    useEffect(() => {
        const localStorageOrder = localStorage.getItem('order')
        if (localStorageOrder !== null) {
            const order = JSON.parse(localStorageOrder)
            dispatch({ type: 'init', payload: order })
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('order', JSON.stringify(order))
    }, [order])

    return (
        <OrderContext.Provider
            value={{ order, dispatch: dispatchWithMiddleware }}
        >
            {showSubmitModal && (
                <SubmitModal
                    title="Удаление билета"
                    message="Вы уверены, что хотите удалить билет?"
                    onSubmit={submitDelete}
                    onClose={() => setShowSubmitModal(false)}
                />
            )}
            {children}
        </OrderContext.Provider>
    )
}

export default OrderProvider
