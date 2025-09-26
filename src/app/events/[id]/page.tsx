import EventDetails from "@/components/features/events/EventDetails/EventDetails";
import { getEventById } from "@/lib/server/events";
type EventPageProps = {
  params: Promise<{ id: string }>;
};
export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = await getEventById(id);
  return (
    <div className="">
      <EventDetails event={event}></EventDetails>
    </div>
  );
}
