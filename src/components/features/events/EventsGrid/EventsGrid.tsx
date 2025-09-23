'use client'
import EventCard from '@/components/features/events/EventCard/EventCard'
import EventTitle from '@/components/features/events/EventTitle/EventTitle'
import { MyEvent } from '@/types/events.type'
import CustomPagination from '@/components/ui/CustomPagination/CustomPagination'

interface EventsGridProps {
  sectionName: string;
  sectionSlug: string;
  events: MyEvent[];
  totalEvents?: number;
}

const EventsGrid = ({ events, sectionSlug, sectionName, totalEvents }: EventsGridProps) => {
  return (
    <>
      <div className="container px-xs mx-auto flex flex-col gap-md my-md">
        <EventTitle sectionName={sectionName} children={undefined} />

        <ul className="flex gap-md flex-wrap">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex-1 min-w-[300px]" // keep min-width from SCSS
            >
              <EventCard event={event} sectionSlug={sectionSlug} />
            </li>
          ))}
        </ul>
      </div>
      {totalEvents && totalEvents > events.length &&
        <CustomPagination totalELements={totalEvents}></CustomPagination>
      }
    </>
  )
}

export default EventsGrid
