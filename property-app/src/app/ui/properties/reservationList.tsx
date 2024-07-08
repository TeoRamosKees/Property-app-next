'use client';

import { Event } from "@/app/ui/properties/calendar";
import { ReservationCard } from "../dashboard/cards";
import { isAfter } from "date-fns";

interface ReservationListProps {
    reservations: Event[];
}

const ReservationList = ({ reservations }: ReservationListProps) => {
    const futureEvents = reservations.filter((reservation) => !isAfter(new Date(), reservation.end_date));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {futureEvents.map((reservation: Event) => (
                <ReservationCard key={`${reservation.start_date} + ${reservation.end_date} + ${reservation.title}`} 
                title={reservation.title} 
                reservationId={reservation.id}
                startDate={reservation.start_date.toString()} 
                endDate={reservation.end_date.toString()}
                propertyId={reservation.property_id}
                />
            ))}
        </div>
    );
}

export default ReservationList;
