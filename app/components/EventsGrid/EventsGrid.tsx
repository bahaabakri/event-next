'use client'
import EventCard from '../EventCard/EventCard'
import EventTitle from '../EventTitle/EventTitle'
import { Box, Pagination } from '@mui/material'
import { MyEvent } from '@/app/events/events.type'

interface EventsGridProps {
  sectionName: string
  sectionSlug: string
  events: MyEvent[]
}

const EventsGrid = ({ events, sectionSlug, sectionName }: EventsGridProps) => {
  return (
    <>
      <div className="container px-2 mx-auto flex flex-col gap-5 my-5">
        <EventTitle sectionName={sectionName} children={undefined} />

        <ul className="flex gap-5 flex-wrap">
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

      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination count={10} variant="outlined" color="primary" />
      </Box>
    </>
  )
}

export default EventsGrid
