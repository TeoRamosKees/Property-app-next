import { editPayment } from "@/app/actions";
import { useState } from "react";

export default function EditPaymentForm({ payment }: { payment: any }) {
    const [detail, setDetail] = useState(payment.detail);
    const [amount, setAmount] = useState(payment.amount);

    const handleSubmission = async () => {
        try{
            const response = await editPayment(payment.id, {
                detail,
                amount,
            }, payment.reservation_id);

            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="flex flex-col">
                <label className="text-left text-gray-600 mb-2">
                    Detalle pago:
                </label>
                <input 
                    type="text" 
                    placeholder="Informacion sobre el pago" 
                    className="border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={detail}
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
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                />
            </div>
            <div className="flex justify-end mb-2 mt-2">    
                    <button className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                        onClick={handleSubmission} >
                        Actualizar
                    </button>
            </div>
        </div>
    );
}