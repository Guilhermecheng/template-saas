'use client'

import useMercadoPago from "@/hooks/use-mercado-pago"
import { useStripe } from "@/hooks/use-stripe"

export default function Payments() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal
  } = useStripe()

  const { createMercadoPagoCheckout } = useMercadoPago()

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold mb-16">Pagamentos</h1>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={() => createPaymentStripeCheckout({
          testeId: "123"
        })}
      >
        Criar pagamento Stripe
      </button>
      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={() => createSubscriptionStripeCheckout({
          testeId: "123"
        })}
      >
        Criar assinatura Stripe
      </button>
      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={() => handleCreateStripePortal()}
      >
        Criar Portal de Pagamentos Stripe
      </button>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={() => {
          createMercadoPagoCheckout({
            testeId: "123",
            userEmail: "teste@teste.com"
          })
        }}
      >
        Criar Pagamento Mercado Pago
      </button>
    </div>
  )
}