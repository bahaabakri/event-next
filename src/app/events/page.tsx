import { FC } from "react"
import { EventsFilters, MyEventResponse } from "../../types/events.type"
import EventsGrid from "@/components/features/events/EventsGrid/EventsGrid"
const EventsPage: FC<{ searchParams: Promise<EventsFilters> }> = async ({ searchParams }) => {
    const filters = await searchParams
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 10
    const eventsRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events?page=${page}&perPage=${perPage}`)
    const events = (await eventsRes.json()) as MyEventResponse
    if (!eventsRes.ok) {
        return <p className="error-message">Failed to load events</p>
    }
    // console.log(events)
    return (
            <div className="mt-32">
                <EventsGrid
                    events={events.data}
                    totalEvents={events.meta.total}
                    sectionName={`All Events`}
                    sectionSlug={'all-events'}
                >
                </EventsGrid>
            </div>
    )
}

export default EventsPage