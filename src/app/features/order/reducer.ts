function reducer(state: Order, action: Action): Order {
    const { type, payload } = action
    switch (type) {
        case 'init': {
            return payload as Order
        }
        case 'addTicket': {
            const newState = [...state]
            const movieId = payload as string
            const movieIndex = state.findIndex(
                (item) => item.movieId === movieId
            )
            if (movieIndex === -1) {
                return [...newState, { movieId, ticketCount: 1 }]
            }
            newState[movieIndex].ticketCount++
            return [...newState]
        }
        case 'removeTicket': {
            const newState = [...state]
            const movieId = payload
            const movieIndex = state.findIndex(
                (item) => item.movieId === movieId
            )
            newState[movieIndex].ticketCount--
            if (newState[movieIndex].ticketCount === 0) {
                return newState.filter((item) => item.movieId !== movieId)
            }
            return newState
        }
    }
}

export default reducer
