import { Suspense } from "react"
import { EventsFilters, MyEvent } from "./events.type"
import Image from "next/image"
export default async function EventsPage({ searchParams }: { searchParams: Promise<EventsFilters> }) {
    const filters = await searchParams
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 10
    const eventsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/events?page=${page}&perPage=${perPage}`)
    const events = await eventsRes.json()
    if (!eventsRes.ok) {
        return <p className="error-message">Failed to load events</p>
    }
    console.log(events)
    return (
        <>
            <h1 className="text-3xl font-bold underline">Events Page</h1>
            <Suspense fallback={<p>Loading events...</p>}>

                {<ul className="mt-8 space-y-4">
                    {events.data.map((event: MyEvent) => {
                        console.log(process.env.NEXT_PUBLIC_BASE_URL + event?.images?.[0]?.url)

                        return (
                            <li key={event.id} className="border p-4 rounded shadow">
                                <Image
                                    src={event?.images?.length
                                        ? `${process.env.NEXT_PUBLIC_BASE_URL}${event.images[0].url}`
                                        : '/next.svg'}
                                    alt={event.name}
                                    width={600}
                                    height={400}
                                    className="mb-4 rounded"
                                />
                                <h2 className="text-xl font-semibold">{event.name}</h2>
                                <p className="mt-2">{event.description}</p>
                            </li>
                        )
                    })}
                </ul>}
            </Suspense>
        </>
    )
}