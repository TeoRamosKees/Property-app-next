"use client"

import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import { addReservation } from "@/app/actions";
import { usePathname } from 'next/navigation';
import { areIntervalsOverlapping, interval } from "date-fns";
import { Event } from "@/app/ui/properties/calendar";

export default function AddDateForm({ events = [] }: { events: Event[] }) {
    const today = format(new Date(), "yyyy-MM-dd");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [color, setColor] = useState('green');
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

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            checkDatesDontOverlap(startDate, endDate);
            const response = await addReservation({
                propertyId,
                startDate,
                endDate,
                title: additionalInfo,
                color
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    const checkDatesDontOverlap = (start: string, end: string) => {
        const newInterval = { start: new Date(start), end: new Date(end) };
        events.forEach((event) => {
            const eventInterval = { start: new Date(event.start_date), end: new Date(event.end_date) };
            if (areIntervalsOverlapping(newInterval, eventInterval, { inclusive: false })) {
                alert('La fecha seleccionada se superpone con otra reserva');
                throw new Error('La fecha seleccionada se superpone con otra reserva');
            }
        });
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                    Agregar alquiler
                </h1>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmission}>
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
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Color:
                        </label>
                        <select className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setColor(e.target.value)}
                        >
                            <option value="green">Verde</option>
                            <option value="yellow">Amarillo</option>
                            <option value="red">Rojo</option>
                            <option value="blue">Azul</option>
                            <option value="violet">Violeta</option>
                            <option value="pink">Rosa</option>
                        </select>
                    </div>
                    <div className="flex justify-center">
                        <button  
                            type='submit'
                            className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                            Agregar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
