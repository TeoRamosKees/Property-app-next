'use client';

import { Event } from "@/app/ui/properties/calendar";
import { ReservationCard } from "../dashboard/cards";

interface ReservationListProps {
    reservations: Event[];
}

const ReservationList = ({ reservations }: ReservationListProps) => {

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.map((reservation: Event) => (
                    <ReservationCard key={`${reservation.start_date} + ${reservation.end_date} + ${reservation.title}`} 
                    title={reservation.title} 
                    reservationId={reservation.id}
                    startDate={reservation.start_date.toString()} 
                    endDate={reservation.end_date.toString()}
                    propertyId={reservation.property_id}
                    />
                ))}
            </div>
        </div>
    );
}

export default ReservationList;
