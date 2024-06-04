
import { lusitana } from '@/app/ui/fonts';

  
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