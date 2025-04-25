import { handleAuth } from "@/actions/handle-auth";
import { auth } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Template SaaS",
  description: "Template SaaS em Next.js, Firebase, Stripe, Mercado Pago e Resend",
}

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

      <Link href="/payments" className="border rounded-xl px-4 py-2 cursor-pointer">Ir para pagamentos</Link>

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
