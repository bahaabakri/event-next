'use client'
import EventCard from '@/components/features/events/EventCard/EventCard'
import EventTitle from '@/components/features/events/EventTitle/EventTitle'
import { MyEvent } from '@/types/events.type'
import CustomPagination from '@/components/ui/CustomPagination/CustomPagination'
import BannerSwiper from '@/components/ui/BannerSwipper/BannerSwipper'
import { MyHero } from '@/types/hero.type'

interface EventsGridProps {
  sectionName: string;
  sectionSlug: string;
  events: MyEvent[];
  totalEvents?: number;
}

const EventsGrid = ({ events, sectionSlug, sectionName, totalEvents }: EventsGridProps) => {
  return (
    <>
    <BannerSwiper />
      <div className="container px-xs mx-auto flex flex-col gap-lg my-md">
        <EventTitle sectionName={sectionName} children={undefined} />

        <ul className="grid gap-md grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="" // keep min-width from SCSS
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
