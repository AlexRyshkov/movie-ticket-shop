import api from "../";

const endpoint = "/cinemas";

export async function getCinemas() {
  const result = await api.get<CinemaType[]>(endpoint);
  if (result.status === 200) {
    return result.data;
  }
  throw Error("Что-то пошло не так");
}
