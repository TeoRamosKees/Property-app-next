import { Event } from "@/app/ui/properties/calendar";
import ReservationList from "./reservationList";
import { BackButton } from "./buttons";


export default async function DeleteDate({ reservations = [], id }: { reservations: Event[], id:string }) {
    if (!Array.isArray(reservations)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    console.log(`Reservations : ${reservations}`);

    return (
        <div className="m-10">
            <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                <div className="w-fit">
                    <BackButton href={`/dashboard/properties/${id}/calendar`} />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Cancelar alquiler</h1>
                </div>
            </div>
            <ReservationList reservations={reservations} />
        </div>
    );
}
