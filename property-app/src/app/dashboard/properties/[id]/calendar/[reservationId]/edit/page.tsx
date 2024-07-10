import { getReservationById, getReservationsByPropertyId } from "@/app/actions";
import EditReservationForm from "@/app/ui/properties/reservations/editReservation";

export default async function EditReservation({params}: {params:any}) {
    const {id, reservationId} = params;
    const event = await getReservationById(reservationId);

    if (!event) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    return (
        <div>
            <EditReservationForm event={event}/>
        </div>
    );
}