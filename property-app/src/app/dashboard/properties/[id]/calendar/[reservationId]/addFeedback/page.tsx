import FeedbackForm from "@/app/ui/properties/reservations/feedbackForm";

export default function AddFeedback({params}: {params: any}){
    const { reservationId } = params;
    const { id } = params;


    return (
        <div>
            <FeedbackForm property_id={id} reservation_id={reservationId} />
        </div>
    );
}