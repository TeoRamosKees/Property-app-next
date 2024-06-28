'use client';

import { deleteProperty } from '@/app/actions';
import { lusitana } from '../fonts';
import Link from 'next/link';

const handleDeleteButton = (id: string) => {
    deleteProperty(id);
};
  
export function Card({
        title,
        value,
    }: {
        title: string;
        value: number | string;
    }) {

    return (
        // <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        // <div className="flex p-4">
        //     <h3 className="ml-2 text-sm font-medium">{title}</h3>
        // </div>
        // <p
        //     className={`${lusitana.className}
        //     truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
        // >
        //     {value}
        // </p>
        // </div>
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
    return (
        <div className="property-card mb-10">
            <Link
                href={`properties/${id}/calendar`}
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">ID: {id}</p>
                <Link
                    href={`properties/${id}/edit`}
                    className="bg-black text-white rounded-md p-2 hover:bg-slate-900 m-5"
                >
                    Edit
                </Link>
                <button className='bg-black text-white rounded-md p-2 hover:bg-slate-900 m-2' onClick={() => handleDeleteButton(id)}>
                    Delete
                </button>
            </Link>
        </div>
    );
}