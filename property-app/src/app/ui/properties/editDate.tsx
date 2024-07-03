import { Event } from "@/app/ui/properties/calendar";
import { ReservationEditCard } from "../dashboard/cards";


export default async function EditDate({ reservations = [] }: { reservations: Event[] }) {
    if (!Array.isArray(reservations)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    console.log(`Reservations : ${reservations}`);

    return (
        <div className="p-10">
            <div className="grid grid-cols-1 gap-2 mb-5 text-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Editar alquiler</h1>
                    <h3 className="text-2xl font-bold">Selecciona el alquiler que deseas editar</h3>
                </div>
            </div>
            <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.map((reservation: Event) => (
                    <ReservationEditCard key={`${reservation.start_date} + ${reservation.end_date} + ${reservation.title}`} 
                    title={reservation.title} 
                    reservationId={reservation.id}
                    startDate={reservation.start_date.toString()} 
                    endDate={reservation.end_date.toString()}
                    propertyId={reservation.property_id}
                    />
                ))}
            </div>
        </div>
        </div>
    );
}
