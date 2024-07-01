import { ReactNode } from 'react';

export default function Modal({
    isOpen,
    title,
    children,
    onCancel,
    onConfirm,
}: {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onCancel: () => void;
    onConfirm: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-xl mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end">
                    <button
                        className="bg-gray-500 text-white p-2 rounded mr-2 hover:bg-gray-600"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
