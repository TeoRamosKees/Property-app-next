'use client';

import { Event } from "@/app/ui/properties/calendar";
import { ReservationCard } from "../dashboard/cards";
import { isAfter } from "date-fns";

interface ReservationListProps {
    reservations: Event[];
}

const ReservationList = ({ reservations }: ReservationListProps) => {
    const futureEvents = reservations.filter((reservation) => !isAfter(new Date(), reservation.end_date));
    const pastEvents = reservations.filter((reservation) => isAfter(new Date(), reservation.end_date));

    return (
        <div>
            <div className="grid grid-cols-1 gap-2 mb-5 mt-5 text-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold">Alquileres Futuros</h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
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
            <div className="grid grid-cols-1 gap-2 mb-5 mt-5 text-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-4xl font-bold">Alquileres Pasados</h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-2">
                {pastEvents.map((reservation: Event) => (
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
