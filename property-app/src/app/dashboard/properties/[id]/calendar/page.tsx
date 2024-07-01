import { getReservationsByPropertyId } from "@/app/actions";
import PropertyCalendar from "@/app/ui/properties/calendar";
import { Suspense } from "react";

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

const Skeleton = () => (
    
    <div className="grid grid-cols-7 gap-4">
        
        {WEEKDAYS.map((day) => (
            <div key={day} className="text-center border-2 border-black font-bold">
                {day}
            </div>
        ))}
        {Array.from({ length: 35 }).map((_, index) => (
            <div key={`empty-${index}`} className="text-center border-2 border-black rounded-md p-2 h-20" />
        ))}
    </div>
);

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
        <Suspense fallback={
            <Skeleton />
        }>
            <PropertyCalendar events={events} propertyId={id} />
        </Suspense>
    );
};

export default PropertyCalendarPage;
