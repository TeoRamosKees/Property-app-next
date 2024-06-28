import { getReservationsByPropertyId } from "@/app/actions";
import DeleteDate from "@/app/ui/properties/deleteDate";


export default async function DeleteDateProperty({params}: {params: any}){
    const { id } = params;
    const events = await getReservationsByPropertyId(id);
    if (!Array.isArray(events)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    console.log(`Eventos en el calendario ${events}`);

    return (
        <div>
            <DeleteDate reservations={events}/>
        </div>
    );

}