"use client"

import { deleteReservation } from "@/app/actions";
import { TrashIcon } from "@heroicons/react/24/outline";


export default function DeleteReservationButton({ reservationById }: { reservationById: any }) {

    const handleDelete = async () => {
        const propertyId = reservationById.property_id;
        const startDate = reservationById.start_date.toString();
        const endDate = reservationById.end_date.toString();
        const title = reservationById.title;

        await deleteReservation({ propertyId, startDate, endDate, title });
    };

    return (
        <button
            className="flex h-10 w-fit items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleDelete}
            >
            <span className="hidden md:block">Eliminar</span>{' '}
            <TrashIcon className="h-5 md:ml-4" />
        </button>
    );
}
