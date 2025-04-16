import { handleAuth } from "@/actions/handle-auth";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // server side	
  const session = await auth();

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <h3 className="text-lg">Protected Dashboard</h3>
      <h3 className="text-lg">Email do usuário: {session?.user?.email ? session?.user?.email : 'Não está logado'}</h3>

      <Link href="/payments" className="border rounded-md px-1">Ir para pagamentos</Link>

      {session?.user?.email && (
        <form
          action={handleAuth}
        >
          <button className="py-2 px-4 text-sm border rounded-xl cursor-pointer" type="submit">
            Logout
          </button>
        </form>
      )}
    </div>
  );
}
