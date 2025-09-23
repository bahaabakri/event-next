'use client'
import { ReactElement } from 'react'
interface EventTitleProps {
    sectionName: string,
    children: ReactElement | undefined
}
const EventTitle = ({ sectionName, children }: EventTitleProps) => {
    return (
        <div className="flex justify-between items-center">
            <div className="font-bold text-xl">
                <span className="text-2xl text-primary-500">{sectionName[0]}</span>
                <span>{sectionName.slice(1)}</span>
            </div>
            {children}
        </div>
    )
}
export default EventTitle