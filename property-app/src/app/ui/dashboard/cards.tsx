'use client';

import { deleteProperty, deleteReservation } from '@/app/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from './modal';
import { format } from 'date-fns';


const handleDeleteButton = async (id: string, router: any) => {
    await deleteProperty(id);
    router.refresh();
};

const handleEditButton = ({id, router}: {id:string, router: any}) => {
    // redirect to edit page
    router.push(`/dashboard/properties/${id}/edit`);
};

export function Card({
    title,
    value,
}: {
    title: string;
    value: number | string;
}) {
    return (
        <div>
            <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">{value}.</p>
            </a>
        </div>
    );
}

export default function PropertyCard({
    title,
    id,
}: {
    title: string;
    id: string;
}) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async () => {
        await handleDeleteButton(id, router);
        closeModal();
    };

    return (
        <div className="property-card mb-10 bg-white border border-gray-200 rounded-lg block max-w-sm shadow dark:bg-gray-800 dark:border-gray-700">
            <Link
                href={`properties/${id}/calendar`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            </Link>
            <div className='grid grid-cols-2'>
                <button className="bg-black text-white rounded-md p-2 hover:bg-slate-900 m-2 flex flex-col items-center" onClick={() => handleEditButton({id, router})}>
                    Editar
                </button>
                <button className="bg-black text-white rounded-md p-2 hover:bg-slate-900 m-2 flex flex-col items-center" onClick={openModal}>
                    Eliminar
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Confirmar eliminación"
                onCancel={closeModal}
                onConfirm={handleDelete}
            >
                <p>¿Está seguro que desea eliminar esta propiedad?</p>
            </Modal>
        </div>
    );
}

export function ReservationCard({
    propertyId,
    reservationId,
    title,
    startDate,
    endDate,
}: {
    propertyId: string;
    reservationId: string;
    title: string;
    startDate: string;
    endDate: string;
}) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleDelete = async () => {
        await deleteReservation({ propertyId, startDate, endDate, title });
        router.refresh();
        closeModal();
    };

    return (
        <div className="property-card mb-10 bg-white border border-gray-200 rounded-lg block max-w-sm shadow dark:bg-gray-800 dark:border-gray-700">
            <Link
                href={`/dashboard/properties/${propertyId}/calendar/${reservationId}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">Reserva: {title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Fecha inicio: {format(startDate, 'dd/M/yyyy')}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Fecha fin: {format(endDate, 'dd/M/yyyy')}</p>
            </Link>
            <div className='grid grid-cols-1'>
                <button className="bg-black text-white rounded-md p-2 hover:bg-slate-900 m-2 flex flex-col items-center" onClick={openModal}>
                    Cancelar
                </button>
            </div>

            <Modal
                isOpen={isModalOpen}
                title="Confirmar eliminación"
                onCancel={closeModal}
                onConfirm={handleDelete}
            >
                <p>¿Está seguro que desea eliminar esta propiedad?</p>
            </Modal>
        </div>
    );
}

export function ReservationEditCard({
    propertyId,
    reservationId,
    title,
    startDate,
    endDate,
}: {
    propertyId: string;
    reservationId: string;
    title: string;
    startDate: string;
    endDate: string;
}) {

    return (
        <div className="property-card mb-10 bg-white border border-gray-200 rounded-lg block max-w-sm shadow dark:bg-gray-800 dark:border-gray-700">
            <Link
                href={`/dashboard/properties/${propertyId}/calendar/${reservationId}`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reserva: {title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">Fecha inicio: {format(startDate, 'dd/M/yyyy')}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">Fecha fin: {format(endDate, 'dd/M/yyyy')}</p>
            </Link>
        </div>
    );
}