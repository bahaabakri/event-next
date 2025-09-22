'use client'
import styles from './EventsGrid.module.scss'
import EventCard from '../EventCard/EventCard'
import EventTitle from '../EventTitle/EventTitle'
import { Box, Pagination } from '@mui/material'
import { MyEvent } from '@/app/events/events.type'
interface EventsGridProps {
    sectionName:string,
    sectionSlug:string
    events:MyEvent[],
}
const EventsGrid = ({events, sectionSlug, sectionName}: EventsGridProps) => {
    return (
        <>
        <div className={styles['events-wrapper']}>
        <EventTitle sectionName={sectionName} children={undefined} />
        <ul className={styles['events']}>
            {
                    events.map((event) =>  {
                        return (<div key={event.id} className={styles['event-card']}>
                            <EventCard event={event} sectionSlug={sectionSlug} />
                        </div>) 
                    }
                )
            }
        </ul>
        </div>
        <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={10} variant="outlined" color="primary" />
        </Box>
        </>
    )
}
export default EventsGrid