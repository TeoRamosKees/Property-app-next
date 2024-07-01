import { redirect } from "next/navigation";
import { login } from "../../../lib";

export default async function Page() {
  return (
    //darle mejor estilo
    // <section>
    //   <form
    //     action={async (formData) => {
    //       "use server";
    //       await login(formData);
    //       redirect("/dashboard/properties");
    //     }}
    //   >
    //     <input type="email" name="email" placeholder="Email" />
    //     <input type="password" name="password" placeholder="Password" />
    //     <br />
    //     <button type="submit">Login</button>
    //   </form>
    // </section>
    <div className="flex flex-col items-center align-items ">
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/dashboard/properties");
        }}
        className="border-2 border-black flex flex-col items-center w-fit shadow-2xl mt-10 p-20 rounded-lg "
      >
        <label className="text-center text-3xl font-bold">Iniciar sesión</label>
        <label className="grid grid-cols-1 p-2 font-bold">
          Email:
          <input
            className="border-2 border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
            type="email"
            placeholder="Email..."
            name="email"
            required
          />
        </label>
        <label className="grid grid-cols-1 p-2 font-bold">
          Contraseña:
          <input
            className="border-2 border-gray-500 p-2 mt-5 font-normal w-max rounded-md"
            type="password"
            placeholder="Contraseña..."
            name="password"
            required
          />
        </label>
        {/* submit button */}
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-md p-2 hover:bg-slate-900 mt-5 "
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}