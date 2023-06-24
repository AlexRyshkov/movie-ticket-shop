import api from '../'

const endpoint = '/movies'

export async function getMovies() {
    const result = await api.get<MovieType[]>(endpoint)
    if (result.status === 200) {
        return result.data
    }
    throw Error('Что-то пошло не так')
}
