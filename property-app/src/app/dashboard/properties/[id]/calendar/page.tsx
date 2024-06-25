import { getReservationsByPropertyId } from "@/app/actions";
import PropertyCalendar from "@/app/ui/properties/calendar";

const PropertyCalendarPage = async ({ params }: { params: any }) => {
    const { id } = params;
    const events = await getReservationsByPropertyId(id);
    console.log(`Eventos en el calendario ${events}`);
    
    if (!Array.isArray(events)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    
    events.forEach((event) => {
        console.log(`Evento: ${event.title} - ${event.start_date} - ${event.end_date}`);
    });

    return (
        <PropertyCalendar events={events} propertyId={id} />
    );
};

export default PropertyCalendarPage;
