"use client"

import { useState } from "react";
import { addPayment } from "@/app/actions";

export default function AddPaymentForm({ property_id, reservation_id }: { property_id: string, reservation_id: string }) {
    const [detail, setDetail] = useState('');
    const [amount, setAmount] = useState(0);

    const handleSubmission = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await addPayment({
                property_id,
                reservation_id,
                detail,
                amount,
            });

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="bg-gray-300 shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-6 text-gray-700">
                    Agregar pago
                </h1>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmission}>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Detalle pago:
                        </label>
                        <input 
                            type="text" 
                            placeholder="Informacion sobre el pago" 
                            className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setDetail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-left text-gray-600 mb-2">
                            Monto:
                        </label>
                        <input 
                            type="number" 
                            placeholder="Cantidad" 
                            className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            onChange={(e) => setAmount(parseInt(e.target.value))}
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
    );
}
