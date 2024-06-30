'use client';

import { deleteReservation } from "@/app/actions";
import { Event } from "@/app/ui/properties/calendar";

interface ReservationListProps {
    reservations: Event[];
}

const ReservationList = ({ reservations }: ReservationListProps) => {
    const handleDelete = async ({ propertyId, startDate, endDate, title }: { propertyId: string, startDate: string, endDate: string, title: string }) => {
        await deleteReservation({ propertyId, startDate, endDate, title });
    }

    return (
        <div className="grid grid-cols-1 gap-2 mb-5">
            <table className="border-2 border-black text-center">
                <thead>
                    <tr>
                        <th className="p-10 border-2 border-black">Info</th>
                        <th className="p-10 border-2 border-black">Fecha inicio</th>
                        <th className="p-10 border-2 border-black">Fecha fin</th>
                        <th className="p-10 border-2 border-black">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={`${reservation.start_date} + ${reservation.end_date} + ${reservation.title}`}>
                            <td className="p-10 border-2 border-black">{reservation.title}</td>
                            <td className="p-10 border-2 border-black">{reservation.start_date.toString()}</td>
                            <td className="p-10 border-2 border-black">{reservation.end_date.toString()}</td>
                            <td className="p-10 border-2 border-black">
                                <button
                                    className="bg-red-500 text-white p-2 rounded hover:bg-red-800"
                                    onClick={() => handleDelete({
                                        propertyId: reservation.property_id,
                                        startDate: reservation.start_date.toString(),
                                        endDate: reservation.end_date.toString(),
                                        title: reservation.title
                                    })}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationList;
