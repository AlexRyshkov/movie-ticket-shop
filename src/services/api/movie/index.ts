import api from '../'

const endpoint = '/movies'

export async function getMovies(cinemaId?: string) {
    const result = await api.get<MovieType[]>(`${endpoint}?`, {
        params: {
            cinemaId,
        },
    })
    if (result.status === 200) {
        return result.data
    }
    throw Error('Что-то пошло не так')
}
