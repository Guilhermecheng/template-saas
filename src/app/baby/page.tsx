'use client'

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import Link from "next/link"
import { useEffect, useState } from "react";

export default function BabyNMe() {
  const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL
  const [paddle, setPaddle] = useState<Paddle>()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async (type: 'bundle' | 'subscription') => {
    setIsLoading(true);

    const priceId = type === 'bundle' ? process.env.NEXT_PUBLIC_PADDLE_BUNDLE_PRICE_ID!! : process.env.NEXT_PUBLIC_PADDLE_SUBSCRIPTION_PRICE_ID!!

    try {
      const response = await fetch('/api/paddle/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: priceId,
          userId: 'guilherme-cheng-id',
          userEmail: 'guilherme.cheng@gmail.com'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Falha ao criar o checkout.');
        return
      }

      if (data.transaction) {
        console.log("Transaction created:", data.transaction)
        paddle?.Checkout.open({
          transactionId: data.transaction.id,
          settings: {
            displayMode: "overlay",
            theme: "light",
            successUrl: defaultUrl + '/success',
          }
        })
      }

    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    initializePaddle({
      environment: "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!!,
      debug: true,
    }).then((instance) => {
      setPaddle(instance)
      console.log("Paddle initialized", instance)
    })
  }, [])

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen p-20">
      <Link href="/dashboard" className="border rounded-xl py-2 px-4 cursor-pointer mb-8">
        Voltar
      </Link>

      <div className="flex items-center w-full h-full gap-20">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-xl font-semibold mb-4">Bundle Payment</h2>
          <button
            className="border rounded-xl px-4 py-2 cursor-pointer"
            onClick={() => handleCheckout('bundle')}
          >
            Criar pagamento bundle
          </button>
        </div>

        <div className="h-full w-[1px] bg-zinc-600" />

        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-xl font-semibold mb-4">Subscription</h2>
          <button
            className="border rounded-xl px-4 py-2 cursor-pointer"
            onClick={() => handleCheckout('subscription')}
          >
            Criar subscription
          </button>
        </div>
      </div>
    </div>
  )
}