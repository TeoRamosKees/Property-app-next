'use client'

import { addProperty } from '@/app/actions';
import { useState } from 'react';
import { addDays, subDays } from 'date-fns';

interface Event {
    startDate: Date;
    endDate: Date;
    title: string;
}

export default function CreateProperty() {
    const [userId, setUserId] = useState('UUID-DE-PRUEBA');
    const [name, setName] = useState('Casa bosque peralta ramos');
    // const [reservations, setReservations] = useState<Event[]>([
    //     {
    //         startDate: subDays(new Date(), 3),
    //         endDate: addDays(new Date(), 1),
    //         title: 'My Reservation'
    //     }
    // ]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await addProperty({ userId, name });
        console.log(response);
    };

    return (
        <div className='flex flex-col items-center align-items'>
            <h1 className='text-center text-3xl font-bold'>Agregar propiedad</h1>
            <form onSubmit={handleSubmit} className='border-2 border-black flex flex-col items-center w-fit shadow-2xl mt-10 p-20'>
                    <label className='grid grid-cols-1 p-2 font-bold'>
                        Nombre que identifica la propiedad:
                        <input
                            className='border-2 border-gray-500 p-2 mt-5 font-normal w-96 rounded-md'
                            type="text"
                            placeholder='Nombre de la propiedad...'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    {/* submit button */}
                    <button type="submit" className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900 mt-5 ">
                        Agregar
                    </button>
            </form>
        </div>
    );
}
