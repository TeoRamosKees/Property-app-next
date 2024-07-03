import AddPaymentForm from "@/app/ui/properties/reservations/paymentForm";

export default async function AddPayment({ params }: { params: any }) {
    const { reservationId } = params;
    const { id } = params;


    return (
        <div>
            <AddPaymentForm property_id={id} reservation_id={reservationId} />
        </div>
    );
}
    