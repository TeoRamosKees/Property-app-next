import PropertyCard from "../dashboard/cards";
import { getPropertiesByUserId, getUser } from "@/app/actions";
import {  getSession } from "../../../../lib";

type PropertyType = {
    id: number;
    property_id: string;
    user_id: string;
    name: string;
}

async function renderProperties() {
    const session = await getSession();
    console.log(`Session: ${session}`);
    const userEmail = session.user.email;
    const user = await getUser(userEmail);
    if (!user) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    

    const properties = await getPropertiesByUserId(user.id);

    if (!Array.isArray(properties) || properties.length === 0) {
        return <p className="mt-4 text-gray-400 text-center text-2xl font-bold">No hay propiedades cargadas.</p>;
    }

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property: PropertyType) => (
                    <PropertyCard key={property.id} title={property.name} id={property.property_id} />
                ))}
            </div>
        </div>
    );
}

export default async function DisplayProperties() {
    const content = await renderProperties();
    return (
        <div>
            {content}
        </div>
    );
}