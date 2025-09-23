import { FC } from "react"
import { MyEvent } from "../../../types/events.type"
import EventDetails from "@/components/features/events/EventDetails/EventDetails"
const EventPage: FC<{ params: Promise<{id: string}> }> = async ({ params }) => {
    const {id} = await params
    const eventRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events/${id}`)
    const event = (await eventRes.json()) as MyEvent
    if (!eventRes.ok) {
        return <p className="error-message">Failed to load event</p>
    }
    console.log(event)
    return (
            <div className="mt-32">
                <EventDetails
                    event={event}>
                </EventDetails>
            </div>
    )
}
export default EventPage