import { MyEvent } from '@/types/events.type';
import ImageSlider from '@/components/ui/ImageSlider/ImageSlider';
import { transformIsoDateToReadable } from '@/services/date';
import Image from 'next/image';
import { API_BASE_URL } from '@/api.config';
interface EventDetailsProps {
    event: MyEvent
}
const EventDetails = ({ event }: EventDetailsProps) => {
    return (
        <div className='container px-2 flex flex-col gap-5 m-auto mt-36'>
            <ImageSlider images={event.images ? event.images.map(el => ({...el, url: `${API_BASE_URL}${el.url}`})): []} alt={event.name} />
            <div className='text-sm md:text-lg'>
                On {transformIsoDateToReadable(event.date)} At {event.location}
            </div>
            <div className='font-bold text-2xl md:text-5xl'>
                {event.name}
            </div>
            <div className='text-xs md:text-sm;'>
                {event.description}
            </div>
        </div>
    );
};

export default EventDetails;