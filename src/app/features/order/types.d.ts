type OrderItem = {
    movieId: string
    ticketCount: number
}

type Order = OrderItem[]

type ActionKind = 'addTicket' | 'removeTicket' | 'init'

type Action = {
    type: ActionKind
    payload: string | Order
}
