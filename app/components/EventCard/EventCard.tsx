'use client'
import Button from "@/app/components/UI/Button/Button";
import EventTimeToLeft from "../EventTimeToLeft/EventTimeToLeft";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { transformIsoDateToReadable } from "@/app/services/date";
import { MyEvent } from "@/app/events/events.type";
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  event: MyEvent;
  sectionSlug: string;
}

const EventCard = ({ event, sectionSlug }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id.toString()}`}>
      <div className="flex flex-col justify-between gap-2 rounded-xl pb-2 bg-white border border-[var(--primary-color)]">
        <div className="flex flex-col gap-2 text-[var(--black)]">
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
              className="w-full h-full rounded-xl object-cover mb-4"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 p-2">
            <div className="font-bold text-lg text-center">{event.name}</div>

            {sectionSlug === "upcoming-events" && (
              <EventTimeToLeft isoDate={event.date} />
            )}

            <div className="flex gap-2 items-center">
              <DateRangeIcon sx={{ color: "var(--primary-color)" }} />
              <div>{transformIsoDateToReadable(event.date)}</div>
            </div>

            <div className="flex gap-2 items-center">
              <PlaceIcon sx={{ color: "var(--primary-color)" }} />
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
