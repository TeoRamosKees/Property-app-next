import { redirect } from "next/navigation";
import { login } from "../../../lib";

export default async function Page() {
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/dashboard/properties");
        }}
      >
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <button type="submit">Login</button>
      </form>
    </section>
  );
}