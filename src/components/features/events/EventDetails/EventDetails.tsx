'use client'
import { MyEvent } from '@/types/events.type';
import ImageSlider from '@/components/ui/ImageSlider/ImageSlider';
import { transformIsoDateToReadable } from '@/services/date';
import Image from 'next/image';
import { API_BASE_URL } from '@/api.config';
import { useActionState, useEffect, useState } from 'react';
import { joinEvent } from '@/lib/server/events';
import Button from '@/components/ui/Button/Button';
import { useSnackbar } from '@/providers/SnackbarProvider/SnackbarProvider';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import useAuth from '@/hooks/useAuth';
interface EventDetailsProps {
    event: MyEvent
}
const EventDetails = ({ event }: EventDetailsProps) => {
    const {showSnackbar} = useSnackbar()
  const { user, isAuthenticated } = useAuth();
  const[isUserAlreadyJoined, setIsUserAlreadyJoined] = useState(false)
  const [formStateRes, formAction, isPending] = useActionState(joinEvent, {
    success: false,
    message: "",
  });
  console.log("isUserAlreadyJoined", isUserAlreadyJoined);
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);
  
  useEffect(() => {
    setIsUserAlreadyJoined(event.joinedUsers.find(el => el.user.id === user?.id) ? true : false)
  }, [user])
  useEffect(() => {
    if (formStateRes.success) {
        showSnackbar(formStateRes.message, 'success')
    } else { 
        showSnackbar(formStateRes.message, 'error')
    }
  }, [formStateRes.success])
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
            {
               isAuthenticated && !isUserAlreadyJoined 
               && (
                <form action={formAction}>
                    <input type="hidden" name="id" value={event.id} />
                    <Button type="submit" isPending={isPending}>
                        <div>Join Event</div>
                    </Button>
                </form>
               )
            }
        </div>
    );
};

export default EventDetails;