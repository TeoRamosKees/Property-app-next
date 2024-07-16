'use client'
import { useState } from 'react';
import { Modal, ModalEditPayment } from '@/app/ui/dashboard/modal';
import { deletePayment } from '@/app/actions';


const handleDeleteButton = async (payment_id: string, reservation_id: string) => {
    await deletePayment(payment_id, reservation_id);
};

export default function PaymentsTable({payments}: {payments: any}) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [payment_id, setPayment_id] = useState('');
    const [reservation_id, setReservation_id] = useState('');
    const [payment, setPayment] = useState({});
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const openEditModal = () => setIsEditModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);
    const closeEditModal = () => setIsEditModalOpen(false);

    const handleOpenDeleteModal = ({p_id, r_id}: {p_id: string, r_id: string}) => {
        setPayment_id(p_id);
        setReservation_id(r_id);
        openDeleteModal();
    }

    const handleOpenEditModal = (payment: any) => {
        setPayment(payment);
        openEditModal();
    }

    const handleDelete = async () => {
        await handleDeleteButton(payment_id, reservation_id);
        closeDeleteModal();
    };

    const reservationPayments = payments;

    return (
        <div>

            <table className="border border-black w-max">
                <thead>
                    <tr >
                        <th className="border border-black">Detalle pago</th>
                        <th className="border border-black">Monto</th>
                        <th className="border border-black">Editar</th>
                        <th className="border border-black">Eliminar</th>
                    </tr>
                </thead>
                <tbody className='m-5'>
                    {reservationPayments.map((payment: any) => (
                        <tr key={payment.id} className="p-10 m-10 border border-black">
                            <td className="p-5 m-5 border border-black">{payment.detail}</td>
                            <td className="p-5 m-5 border border-black">{payment.amount}</td>
                            <td className="p-5 m-5 border border-black">
                                <button className="bg-slate-500 hover:bg-slate-800 p-2 rounded-lg"
                                    onClick={() => handleOpenEditModal(payment)}
                                >
                                    Editar
                                </button>
                            </td>
                            <td className="p-5 m-5">
                                <button className="bg-red-600 hover:bg-red-800 p-2 rounded-lg text-white"
                                    onClick={() => handleOpenDeleteModal({p_id: payment.id, r_id: payment.reservation_id})}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={isDeleteModalOpen}
                title="Confirmar eliminación"
                onCancel={closeDeleteModal}
                onConfirm={handleDelete}
            >
                <p>¿Está seguro que desea eliminar el pago seleccionado?</p>
            </Modal>

            <ModalEditPayment
                isOpen={isEditModalOpen}
                title="Editar"
                onCancel={closeEditModal}
                payment={payment}
            >
                <p>Editar pago</p>
            </ModalEditPayment>
        </div>
    )};
