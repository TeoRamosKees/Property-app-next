import { getReservationsByPropertyId } from "@/app/actions";
import EditDate from "@/app/ui/properties/editDate";


export default async function EditDateProperty({params}: {params: any}){
    const { id } = params;
    const events = await getReservationsByPropertyId(id);
    if (!Array.isArray(events)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    console.log(`Eventos en el calendario ${events}`);

    return (
        <div>
            <EditDate reservations={events}/>
        </div>
    );

}