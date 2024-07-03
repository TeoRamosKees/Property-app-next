import Link from 'next/link';
import { redirect } from 'next/navigation'
import { HomeModernIcon } from "@heroicons/react/24/outline"
import Footer from './ui/footer';

// This is the Home page of the application, hero page, only accesisble to not logged in users

export default function Home() {

  return (
    <div className="grid cols-1 h-screen">
      <div className="grid grid-cols-4 place-content-center">
        <div>

        </div>
        <div className='flex flex-col items-center justify-center text-center ml-20'>
          <h1 className="text-4xl font-bold">Bienvenidos al mejor gestor de propiedades</h1>
          <p className="text-lg mt-4 w-max">Gestiona los alquileres</p>
          <p className="text-lg mt-4 w-max ml-5">de tus propiedades de forma sencilla</p>
          <p className="text-lg mt-4 w-max">Regístrate para comenzar</p>
          <Link href="/signup" className="mt-8 p-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Registrarse ya
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center hidden md:block ml-20'>
          <HomeModernIcon className="md:block h-md w-md text-gray-800" />
        </div>
        <div className='place-content-center'>
        </div>

      </div>
      <div className='content-end'>
        <Footer />
      </div>
    </div>
    // redirect('/dashboard/properties')
  );
}
