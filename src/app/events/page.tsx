import { EventsFilters } from "../../types/events.type";
import EventsGrid from "@/components/features/events/EventsGrid/EventsGrid";
import EventsSwiper from "@/components/features/events/EventsSwiper/EventsSwiper";
import { getEvents } from "@/lib/server/events";
type EventsPageProps = {
  searchParams: Promise<EventsFilters>;
};
export default async function EventsPage({ searchParams }: EventsPageProps) {
  const events = await getEvents(await searchParams);
  // console.log(events)
  return (
    <div className="mt-24 flex flex-col gap-5">
      <EventsSwiper />
      <EventsGrid
        events={events.data}
        totalEvents={events.meta.total}
        sectionName={`All Events`}
        sectionSlug={"all-events"}
      ></EventsGrid>
    </div>
  );
}
