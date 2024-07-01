'use client'

import { addProperty } from '@/app/actions';
import { useState } from 'react';


export default function CreatePropertyForm({userId}: {userId: string}) {
    const [id, setUserId] = useState(userId);
    const [name, setName] = useState('Casa bosque peralta ramos');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await addProperty({ userId, name });
        console.log(response);
    };

    return (
        <div className='flex flex-col items-center align-items '>
            <h1 className='text-center text-3xl font-bold'>Agregar propiedad</h1>
            <form onSubmit={handleSubmit} className='border-2 border-black flex flex-col items-center w-fit shadow-2xl mt-10 p-20 rounded-lg '>
                    <label className='grid grid-cols-1 p-2 font-bold'>
                        Nombre que identifica la propiedad:
                        <input
                            className='border-2 border-gray-500 p-2 mt-5 font-normal w-max rounded-md'
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
