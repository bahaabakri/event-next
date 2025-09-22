'use client'
import useTimeLeft from '@/app/hooks/useTimeLeft'

const EventTimeToLeft = ({ isoDate }: { isoDate: string }) => {
  const timeLeft = useTimeLeft(isoDate)

  return (
    <div className="text-center text-[var(--primary-color)]">
      <div className="font-bold">Starts after</div>
      <div>
        <span className="text-2xl font-bold">
          {String(timeLeft.days).padStart(2, '0')}&nbsp;
        </span>
        <span className="text-xs">
          day{timeLeft.days > 1 && <span>s</span>}&nbsp;
        </span>

        <span className="text-2xl font-bold">
          {String(timeLeft.hours).padStart(2, '0')}&nbsp;
        </span>
        <span className="text-xs">
          hour{timeLeft.hours > 1 && <span>s</span>}&nbsp;
        </span>

        <span className="text-2xl font-bold">
          {String(timeLeft.minutes).padStart(2, '0')}&nbsp;
        </span>
        <span className="text-xs">
          min{timeLeft.minutes > 1 && <span>s</span>}&nbsp;
        </span>

        <span className="text-2xl font-bold">
          {String(timeLeft.seconds).padStart(2, '0')}&nbsp;
        </span>
        <span className="text-xs">
          second{timeLeft.seconds > 1 && <span>s</span>}&nbsp;
        </span>
      </div>
    </div>
  )
}

export default EventTimeToLeft
