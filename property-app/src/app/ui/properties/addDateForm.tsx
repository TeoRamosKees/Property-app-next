"use client"

import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { addReservation } from "@/app/actions";
import { usePathname } from 'next/navigation'

export default function AddDateForm() {
    const today = format(new Date(), 'yyyy-MM-dd');
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const propertyId = usePathname().split('/')[3];

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target){
            return;
        }
        setStartDate(e.target.value);
        if (e.target.value > endDate) {
            setEndDate(e.target.value);
        }
    };  

    const handleSubmission = async () => {
        const response = await addReservation({
            propertyId,
            startDate,
            endDate,
            title: additionalInfo
        });

        console.log(response);
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                    Agregar alquiler
                </h1>
                <form className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Fecha inicio:
                        </label>
                        <input 
                            type="date" 
                            min={today} 
                            value={startDate} 
                            onChange={handleStartDateChange} 
                            className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Fecha fin:
                        </label>
                        <input 
                            type="date" 
                            min={startDate} 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Informacion adicional:
                        </label>
                        <input 
                            type="text" 
                            placeholder="Informacion adicional" 
                            className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button 
                            type="submit" 
                            onClick={handleSubmission}
                            className="h-12 w-full rounded-lg bg-blue-600 text-white font-medium transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
