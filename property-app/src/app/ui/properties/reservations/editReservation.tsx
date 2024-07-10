'use client'
import { updateReservation } from "@/app/actions";
import { Event } from "../calendar";
import { toDate } from "date-fns";
import { BackButton } from "../buttons";
import { ChangeEvent, useState } from "react";

export default function EditReservationForm({event}: {event: Event}) {
    const [title, setTitle] = useState(event.title);
    const [startDate, setStartDate] = useState(event.start_date.toString());
    const [endDate, setEndDate] = useState(event.end_date.toString());
    const [color, setColor] = useState(event.color);
    const [hosts, setHosts] = useState(event.hosts);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateReservation(event.id, {
            startDate: startDate, 
            endDate: endDate, 
            title: title, 
            color: color, 
            hosts: hosts  
        }, event.property_id);
    };

    const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target){
            return;
        }
        setStartDate(e.target.value);
        if (e.target.value > endDate) {
           setEndDate(e.target.value);
        }
    };  

    return (
        <div className="m-10">
            <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                <div className="w-fit">
                    <BackButton href={`/dashboard/properties/${event.id}/calendar/${event.id}`} />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">Editar alquiler</h1>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-fit bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-5">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="border-2 border-gray-300 p-3 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="start" className="block text-sm font-medium text-gray-700">
                                    Fecha inicio:
                                </label>
                                <input
                                    type="date"
                                    name="start"
                                    id="start"
                                    value={startDate}
                                    onChange={handleStartDateChange}
                                    className="border-2 border-gray-300 p-3 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="end" className="block text-sm font-medium text-gray-700">
                                    Fecha fin:
                                </label>
                                <input
                                    type="date"
                                    name="end"
                                    id="end"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border-2 border-gray-300 p-3 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                            <div>
                                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                                    Color de alquiler en calendario:
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
                            <div>
                                {/* inquilinos */}
                                <label htmlFor="hosts" className="block text-sm font-medium text-gray-700">
                                    Cantidad de inquilinos:
                                </label>
                                <input
                                    type="string"
                                    name="hosts"
                                    id="hosts"
                                    value={hosts}
                                    onChange={(e) => setHosts(parseInt(e.target.value))}
                                    className="border-2 border-gray-300 p-3 mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <button
                                type="submit"
                                className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}