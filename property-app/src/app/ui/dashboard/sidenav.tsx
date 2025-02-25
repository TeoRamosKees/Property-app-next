import Link from 'next/link';
import NavLinks from './nav-links';
import { PowerIcon, HomeModernIcon } from '@heroicons/react/24/outline';
import { logout } from '../../../../lib';
import { redirect } from 'next/navigation';



export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40"
        href="/dashboard/properties"
      >
        <div className="text-white text-center md:w-40 w-max p-5">
            <HomeModernIcon className="ml-10" />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form action={async () => {
          "use server";
          await logout();
          redirect("/login");
        }}>
          <button type='submit' className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-300 hover:text-black-300 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}