import { getReservationsByPropertyId } from "@/app/actions";
import { Event } from "@/app/ui/properties/calendar";
import ReservationList from "./reservationList";


export default async function DeleteDate({ reservations = [] }: { reservations: Event[] }) {
    if (!Array.isArray(reservations)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    console.log(`Reservations : ${reservations}`);

    return (
        <div className="p-10">
            <div className="grid grid-cols-1 gap-2 mb-5 text-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Cancelar alquiler</h1>
                </div>
            </div>
            <ReservationList reservations={reservations} />
        </div>
    );
}
