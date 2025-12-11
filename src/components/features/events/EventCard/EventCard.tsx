"use client";
import Button from "@/components/ui/Button/Button";
import EventTimeToLeft from "@/components/features/events/EventTimeToLeft/EventTimeToLeft";
import PlaceIcon from "@mui/icons-material/Place";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { transformIsoDateToReadable } from "@/services/date";
import { MyEvent } from "@/types/events.type";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/api.config";
import { div } from "framer-motion/client";
interface EventCardProps {
  event: MyEvent;
  sectionSlug: string;
}
export default function EventCard({ event, sectionSlug }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="h-full group flex flex-col justify-between rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden">
        <div className="flex flex-col">
          {/* Image */}
          <div className="relative h-[200px] w-full">
            <Image
              src={
                event?.images?.length
                  ? `${API_BASE_URL}${event.images[0].url}`
                  : "/next.svg"
              }
              alt={event.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 group-hover:bg-none transition-transform duration-300 to-transparent" />

            {sectionSlug === "upcoming-events" && (
              <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-primary-500 text-white text-xs font-medium">
                Upcoming
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 px-md py-sm">
            <h3 className="text-xl font-semibold text-dark-500 line-clamp-1">
              {event.name}
            </h3>

            {sectionSlug === "upcoming-events" && (
              <EventTimeToLeft isoDate={event.date} />
            )}

            <div className="flex items-center gap-2 text-dark-400 text-sm">
              <DateRangeIcon fontSize="small" className="text-primary-500" />
              {transformIsoDateToReadable(event.date)}
            </div>

            <div className="flex items-center gap-2 text-dark-400 text-sm">
              <PlaceIcon fontSize="small" className="text-primary-500" />
              {event.location}
            </div>

            <p className="text-dark-300 text-sm line-clamp-2">
              {event.description}
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="border-t border-gray-100 px-xl py-sm">
          <Button className="w-full!">
            <div>Join</div>
          </Button>
        </div>
      </div>
    </Link>
  );
}
