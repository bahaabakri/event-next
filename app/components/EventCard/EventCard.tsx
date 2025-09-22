'use client'
import Button from "@/app/components/UI/Button/Button";
import styles from "./EventCard.module.scss";
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
      <div className={styles["event-card"]}>
        <div className={styles["event-card-content-img"]}>
          <div className={styles["event-card-img"]}>
            <Image
              src={
                event?.images?.length
                  ? `${process.env.NEXT_PUBLIC_BASE_URL}${event.images[0].url}`
                  : "/next.svg"
              }
              alt={event.name}
              width={600}
              height={400}
              className="mb-4 rounded"
            />
          </div>
          <div className={styles["event-card-content"]}>
            <div className={styles["event-card-title"]}>{event.name}</div>
            {sectionSlug === "upcoming-events" && (
              <EventTimeToLeft isoDate={event.date} />
            )}
            <div className={styles["event-card-date"]}>
              <div>
                <DateRangeIcon sx={{ color: "var(--primary-color)" }} />
              </div>
              <div>{transformIsoDateToReadable(event.date)}</div>
            </div>
            <div className={styles["event-card-place"]}>
              <div>
                <PlaceIcon sx={{ color: "var(--primary-color)" }} />
              </div>
              <div>{event.location}</div>
            </div>
            <div className={styles["event-card-desc"]}>{event.description}</div>
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
