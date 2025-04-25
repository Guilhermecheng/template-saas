import { handleAuth } from "@/actions/handle-auth";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold">Login</h1>

      <form
        action={handleAuth}
      >
        <button className="py-2 px-4 text-sm border rounded-xl cursor-pointer" type="submit">Signin with Google</button>
      </form>
    </div>
  );
}
