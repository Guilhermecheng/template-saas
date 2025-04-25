import Link from "next/link";

export default function Success() {
  return (
    <div>
      <h1>Pagamento aprovado!</h1>
      <p>Seu pagamento foi aprovado com sucesso.</p>
      <p>Obrigado por usar nosso serviço!</p>

      <Link href="/dashboard" className="border rounded-xl px-4">Voltar para o dashboard</Link>
    </div>
  )
}