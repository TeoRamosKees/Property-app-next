// queda idear la manera de que este componente tenga el user ID, para eso necesita ser un server component. 
// mover la logica de este componente a un client component aparte y hacer que el user ID sea un parametro de la funcion.

import { getUser } from "@/app/actions";
import { getSession } from "../../../../../lib";
import CreatePropertyForm from "@/app/ui/properties/createProperty";

export default async function CreateProperty() {
    const session = await getSession();
    console.log(`Session: ${session}`);
    //session = { "user": { "email": "teo2@hotmail.com", "password": "teoram" }, "expires": "2024-07-01T23:31:42.052Z", "iat": 1719876692, "exp": 1719876702 }
    const userEmail = session.user.email;
    const user = await getUser(userEmail);
    if (!user) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }


    return (
        <div className=''>
            <CreatePropertyForm userId={user.id} />
        </div>
    );
}
