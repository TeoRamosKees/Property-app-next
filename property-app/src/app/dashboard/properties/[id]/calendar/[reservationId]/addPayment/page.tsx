import { BackButton } from "@/app/ui/properties/buttons";
import AddPaymentForm from "@/app/ui/properties/reservations/paymentForm";

export default function AddPayment({ params }: { params: any }) {
    const { reservationId } = params;
    const { id } = params;


    return (
        <div className="grid grid-cols-3">
            <div className="w-fit">
                <BackButton href={`/dashboard/properties/${id}/calendar/${reservationId}`} />
            </div>
            <AddPaymentForm property_id={id} reservation_id={reservationId} />
        </div>
    );
}
    