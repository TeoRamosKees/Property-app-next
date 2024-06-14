'use client'

import { addProperty } from '@/app/actions';
import { useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { redirect } from 'next/navigation'

interface Event {
    startDate: Date;
    endDate: Date;
    title: string;
}

export default function CreateProperty() {
    const [userId, setUserId] = useState('UUID-DE-PRUEBA');
    const [name, setName] = useState('My Property');
    const [reservations, setReservations] = useState<Event[]>([
        {
            startDate: subDays(new Date(), 3),
            endDate: addDays(new Date(), 1),
            title: 'My Reservation'
        }
    ]);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await addProperty({ userId, name, reservations });
        console.log(response);
        redirect('/dashboard/properties')
    };

    return (
        <div>
            <h1 className='text-center'>Create Property</h1>
            <form onSubmit={handleSubmit} className='border-2 border-black flex flex-col items-center w-fit shadow-2xl'>
                <label>
                    Property name:
                    <input
                        className='border-2 border-gray-300 p-2 m-2'
                        type="text"
                        placeholder={name}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </label>
                {/* submit button */}
                <button type="submit" className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">
                    Add Property
                </button>
            </form>
        </div>
    );
}
