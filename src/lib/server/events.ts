import { API_BASE_URL } from "@/api.config"
import { EventsFilters, MyEvent, MyEventResponse } from "@/types/events.type"

export async function getEvents(filters: EventsFilters): Promise<MyEventResponse> {
  const page = filters.page ?? 1
  const perPage = filters.perPage ?? 10

  const res = await fetch(
    `${API_BASE_URL}/events?page=${page}&perPage=${perPage}`,
    {
        next: { revalidate: 3600 },
    })

  if (!res.ok) throw new Error("Failed to load events")

  return res.json() as Promise<MyEventResponse>
}   

export async function getEventById(id: string | number): Promise<MyEvent>  {
  const res = await fetch(`${API_BASE_URL}/events/${id}`,
    {
        next: { revalidate: 3600 },
    })

  if (!res.ok) throw new Error("Failed to load event")

  return res.json()
}
