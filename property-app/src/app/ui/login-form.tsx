import { redirect } from "next/navigation";
import { login } from "../../../lib";
import Link from "next/link";

export default async function LoginForm() {
  return (
    <div className="flex flex-col items-center align-items ">
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/dashboard/properties");
        }}
        className="border flex flex-col items-center w-fit shadow-2xl mt-10 p-20 rounded-3xl"
      >
        <label className="text-center text-3xl font-bold mb-10">Iniciar sesión</label>
        <label className="grid grid-cols-1 p-2 font-medium">
          Email:
          <input
            className="border border-gray-500 p-2 mt-2 font-normal w-max rounded-md"
            type="email"
            placeholder="Email..."
            name="email"
            required
          />
        </label>
        <label className="grid grid-cols-1 p-2 font-medium">
          Contraseña:
          <input
            className="border border-gray-500 p-2 mt-2 font-normal w-max rounded-md"
            type="password"
            placeholder="Contraseña..."
            name="password"
            required
          />
        </label>
        {/* submit button */}
        <button
          type="submit"
          className="flex h-10 m-2 items-center rounded-full bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Iniciar sesión
        </button>
        <Link
          href="/signup"
          className="flex h-10 m-2 items-center rounded-full bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="md:block">Registrarse</span>{' '}
        </Link>
      </form>
    </div>
  );
}