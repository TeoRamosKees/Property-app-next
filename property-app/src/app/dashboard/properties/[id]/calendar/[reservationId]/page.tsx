export default function ReservationPage({params}: {params: any}) {
    const { reservationId } = params;

    return (
        <div>
            <h1>Reservation Page {reservationId} </h1>
        </div>
    );
}