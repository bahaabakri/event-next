'use client'
import Button from "@/components/ui/Button/Button";
import EventTimeToLeft from "@/components/features/events/EventTimeToLeft/EventTimeToLeft";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { transformIsoDateToReadable } from "@/services/date";
import { MyEvent } from "@/types/events.type";
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  event: MyEvent;
  sectionSlug: string;
}

const EventCard = ({ event, sectionSlug }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id.toString()}`}>
      <div className="flex flex-col justify-between gap-xs rounded-xl pb-xs bg-white border border-primary-500">
        <div className="flex flex-col gap-xs text-dark-500">
          {/* Image */}
          <div className="h-[200px]">
            <Image
              src={
                event?.images?.length
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${event.images[0].url}`
                  : "/next.svg"
              }
              alt={event.name}
              width={600}
              height={400}
              className="w-full h-full rounded-lg object-cover mb-md"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-xs p-xs">
            <div className="font-bold text-lg text-center">{event.name}</div>

            {sectionSlug === "upcoming-events" && (
              <EventTimeToLeft isoDate={event.date} />
            )}

            <div className="flex gap-xs items-center">
              <DateRangeIcon color="primary" />
              <div>{transformIsoDateToReadable(event.date)}</div>
            </div>

            <div className="flex gap-xs items-center">
              <PlaceIcon color="primary" />
              <div>{event.location}</div>
            </div>

            <div className="text-sm line-clamp-1">{event.description}</div>
          </div>
        </div>

        <Button>
          <div>Join</div>
        </Button>
      </div>
    </Link>
  );
};

export default EventCard;
