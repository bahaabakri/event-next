import { Suspense } from "react"
import { EventsFilters, MyEvent } from "./events.type"
import Image from "next/image"
import EventsGrid from "../components/EventsGrid/EventsGrid"
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
            <div className="mt-32">
                <EventsGrid
                    events={events.data}
                    sectionName={`All Events`}
                    sectionSlug={'all-events'}
                >
                </EventsGrid>
            </div>
    )
}