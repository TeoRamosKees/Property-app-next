import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function CreateProperty() {
  return (
    <Link
      href="/dashboard/properties/create"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Crear</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

interface textButtonProps {
  text: string;
}

export default function changeMonthButton({text}: textButtonProps) {
  return (
    <button className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900">{text}</button>
  );
}