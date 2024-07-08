"use client"
import { Event } from "@/app/lib/definitions";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { BackButton } from "../buttons";
import { addReservationFeedback } from "@/app/actions";

export default function FeedbackForm({ property_id, reservation_id }: { property_id: string, reservation_id: string}){
    const [feedback, setFeedback] = useState('');

    const handleSubmission = async (e: any) => {
        e.preventDefault();
        addReservationFeedback({property_id, reservation_id, feedback});
    }

    return (
        <div className="grid grid-cols-3 ">
            <div className="w-fit flex flex-col justify-start">
                <BackButton href={`/dashboard/properties/${property_id}/calendar/${reservation_id}`}/>
            </div>
            <div className="flex justify-center items-center">
                <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                        Agregar opinion del grupo
                    </h1>
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmission}>
                        <div className="flex flex-col">
                            <textarea
                                    placeholder="Opinion del grupo" 
                                    className="border border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                />
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
        </div>
    );
}