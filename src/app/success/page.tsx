import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen">
      <h1 className="text-lg font-bold">Pagamento aprovado!</h1>

      <div className="flex flex-col items-center gap-2">
        <p>Seu pagamento foi aprovado com sucesso.</p>
        <p>Obrigado por usar nosso serviço!</p>
      </div>

      <Link href="/dashboard" className="border rounded-xl py-2 px-4 cursor-pointer mt-8">Voltar para o dashboard</Link>
    </div>
  )
}