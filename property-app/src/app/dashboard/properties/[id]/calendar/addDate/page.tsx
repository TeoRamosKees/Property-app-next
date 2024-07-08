import AddDateForm from "@/app/ui/properties/addDateForm";
import { getReservationsByPropertyId } from "@/app/actions";
import { BackButton } from "@/app/ui/properties/buttons";



export default async function AddDate({ params }: { params: any }) {
    const { id } = params;
    const events = await getReservationsByPropertyId(id);
    if (!Array.isArray(events)) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }

    return (
        <div className="grid grid-cols-3">
            <div className="w-fit">
                <BackButton href={`/dashboard/properties/${id}/calendar`} />
            </div>
            <AddDateForm events={events}/>
        </div>
    );
}
