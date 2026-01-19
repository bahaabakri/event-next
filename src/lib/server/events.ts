'use server'
import { API_BASE_URL } from "@/api.config"
import { EventsFilters, JoinEventResponse, MyEvent, MyEventResponse } from "@/types/events.type"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

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

export async  function joinEvent(prevState: any, formData: FormData ) {
  const id = +(formData.get("id") as string);
  const plans = JSON.parse(formData.get("plans") as string);
  console.log('plans', plans);
  console.log('id', id);
  console.log('typeof id', typeof id);
  console.log('typeof plans', typeof plans);
  const cookieStore = await cookies() // 👈 await it
  const token = cookieStore.get("access_token")?.value
  const res = await fetch(`${API_BASE_URL}/ticket/join`, {
    method: "POST",
    body: JSON.stringify({ eventId: +id, plans }),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
      const data = (await res.json()) as JoinEventResponse;
    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to Join Event",
      };
    }
    // revalidatePath(`/events/${id}`)
    return {
      success: true,
      clientSecret: data.clientSecret,
      paymentIntentId: data.paymentIntentId,
      message: data?.message || "Event has been joined Successfully",
    };
}
