'use client'

import { useStripe } from "@/hooks/use-stripe"

export default function Payments() {
  const {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,
    handleCreateStripePortal
  } = useStripe()


  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold mb-16">Pagamentos</h1>

      <button
        className="border rounded-md px-1"
        onClick={() => createPaymentStripeCheckout({
          testeId: "123"
        })}
      >
        Criar pagamento Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={() => createSubscriptionStripeCheckout({
          testeId: "123"
        })}
      >
        Criar assinatura Stripe
      </button>
      <button
        className="border rounded-md px-1"
        onClick={() => handleCreateStripePortal()}
      >
        Criar Portal de Pagamentos Stripe
      </button>
    </div>
  )
}