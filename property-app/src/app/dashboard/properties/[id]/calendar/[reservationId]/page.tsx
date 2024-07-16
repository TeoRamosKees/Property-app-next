import { deleteReservation, getPaymentsByReservationId, getReservationById, getReservationFeedback } from "@/app/actions";
import { PlusIcon,BookmarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { BackButton } from "@/app/ui/properties/buttons";
import PaymentsTable from "@/app/ui/properties/reservations/paymentsTable";
import DeleteReservationButton from "@/app/ui/properties/reservations/deleteReservationButton";


export default async function ReservationPage({params}: {params: any}) {
    const { reservationId } = params;
    const { id } = params;
    const reservationPayments = await getPaymentsByReservationId(reservationId);
    const reservationById = await getReservationById(reservationId);
    const feedback = await getReservationFeedback(reservationId);
    let feedbackString = "";

    // concatenate the reservation feedback
    if (Array.isArray(feedback)) {
        feedback.forEach((f: any) => {
            feedbackString += f.feedback + ". ";
        });
    }
    // reservation is not of type String 
    if (!Array.isArray(reservationPayments) || !reservationById) {
        return( 
            <div>
                <p className="mt-4 text-gray-400">No hay pagos cargados.</p> 
                <Link
                    href={`/dashboard/properties/${id}/calendar/${reservationId}/addPayment`}
                    className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                    <span className="hidden md:block">Agregar pago</span>{' '}
                    <PlusIcon className="h-5 md:ml-4" />
                </Link>
            </div>
        ) 
    }
    const handleDelete = async () => {
        const propertyId = reservationById.property_id;
        const startDate = reservationById.start_date.toString();
        const endDate = reservationById.end_date.toString();
        const title = reservationById.title;

        await deleteReservation({ propertyId, startDate, endDate, title });
    };

    

    //display payments as a table with edit and delete buttons
    //thead -> th -> Payment ID, Detail, Amount, Edit, Delete
    //tbody -> tr -> td -> detail, amount, edit button, delete button
    //edit button -> modal with form to edit payment
    //delete button -> modal with confirmation to delete payment

    return (
        <div className="grid grid-cols-1">
            
            <div className="w-fit justify-self-start">
                <BackButton href={`/dashboard/properties/${id}/calendar`}/>
            </div>
            <div className="grid grid-cols-1 text-center w-fit justify-self-center">
                <h1 className="font-bold text-center text-3xl p-10">Detalle de la reserva</h1>
                <div className="grid grid-cols-1 m-5 justify-center">
                    <div className="grid grid-cols-2"> 
                            <div>
                                <Link
                                    href={`/dashboard/properties/${id}/calendar/${reservationId}/addPayment`}
                                    className="flex w-fit h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                    <span className="hidden md:block">Agregar pago</span>{' '}
                                    <PlusIcon className="h-5 md:ml-4" />
                                </Link>
                            </div>
                            <div className="justify-self-end">
                                <Link
                                    href={`/dashboard/properties/${id}/calendar/${reservationId}/addFeedback`}
                                    className="flex h-10 w-fit items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                    <span className="hidden md:block">Agregar opinion del grupo</span>{' '}
                                    <BookmarkIcon className="h-5 md:ml-4" />
                                </Link>
                            </div>
                            <div className="justify-self-start mt-5">
                                <Link
                                    href={`/dashboard/properties/${id}/calendar/${reservationId}/edit`}
                                    className="flex h-10 w-fit items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                    <span className="hidden md:block">Editar reserva</span>{' '}
                                    <PencilIcon className="h-5 md:ml-4" />
                                </Link>
                            </div>
                            <div className="justify-self-end mt-5">
                                <DeleteReservationButton reservationById={reservationById} />
                            </div>
                    </div>
                    <div className="flex flex-col items-center border border-black mt-5">
                        <div className="m-5">
                            <h2 className="font-bold text-2xl p-2">
                                Informacion de la reserva: 
                            </h2>
                            <h3 className="font-normal text-md p-2">
                                <b>Nombre:</b> {reservationById.title}
                            </h3>
                            <h3 className="font-normal text-md p-2">
                                <b>Comienza el:</b> {reservationById.start_date.toString()}
                            </h3>
                            <h3 className="font-normal text-md p-2">
                                <b>Termina el:</b> {reservationById.end_date.toString()}
                            </h3>
                            <h3 className="font-bold text-md p-2">
                                {reservationById.hosts} inquilinos.
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col items-center border border-black mt-5">
                        <div className=" p-5 m-2">
                            <h2 className="font-bold text-2xl p-2">
                                Informacion del grupo: 
                            </h2>
                            <h3 className="font-normal text-md p-2">
                                <b>Opinion:</b> {feedbackString}
                            </h3>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-5">
                        <PaymentsTable payments={reservationPayments}/>
                    </div>
                </div>
            </div>
        </div>
    );
}