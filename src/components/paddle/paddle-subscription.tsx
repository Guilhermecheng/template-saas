'use client'

import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

export default function PaddleSubscription() {
  const [paddle, setPaddle] = useState<Paddle>()

  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async (type: any) => {
    setIsLoading(type);

    const priceId = 'pri_01k2g5c15b2cmjgbskjn7xhq53' // assinatura

    try {
      // Chama a nossa API route para criar o checkout
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
        // Se a API retornar um erro, exibe a mensagem
        throw new Error(data.error || 'Falha ao criar o checkout.');
      }

      if (data.transaction) {
        console.log("Transaction created:", data.transaction)
        paddle?.Checkout.open({
          transactionId: data.transaction.id,
          settings: {
            displayMode: "overlay",
            theme: "light",
            successUrl: "http://localhost:3000/success",
          }
        })
      }
      // Se tudo deu certo, redireciona o usuário para a URL de checkout da Paddle
      // window.location.href = data.checkoutUrl;

    } catch (error: any) {
      console.error(error);
      alert(error.message);
      setIsLoading(false); // Reseta o estado de carregamento em caso de erro
    }
  };


  useEffect(() => {
    initializePaddle({
      environment: "sandbox", // Use "production" for live environment
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!!,
      debug: true,
    }).then((instance) => {
      setPaddle(instance)
      console.log("Paddle initialized", instance)
    })
  }, [])



  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
      <h1 className="text-2xl font-bold mb-4">Paddle Client Subscription</h1>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
      // onClick={handleCreatePaddleCheckout}
      >
        Criar subscription Paddle Client
      </button>


      <h1 className="text-2xl font-bold mt-16 mb-4">Paddle Server Side Subscription</h1>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={() => handleCheckout('assinatura')}
      >
        Criar subscription Paddle Server
      </button>
    </div>
  )
}