import AddDateForm from "@/app/ui/properties/addDateForm";
import { getReservationsByPropertyId } from "@/app/actions";



export default async function AddDate({ params }: { params: any }) {
    const { id } = params;
    const events = await getReservationsByPropertyId(id);
    if (!Array.isArray(events)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }


    return (
            <AddDateForm events={events}/>
    );
}
