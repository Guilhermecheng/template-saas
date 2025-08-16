'use client'

import { initializePaddle, Paddle } from "@paddle/paddle-js"
import { useEffect, useState } from "react"

export default function PaddleSinglePayment() {
  const [paddle, setPaddle] = useState<Paddle>()

  async function handleCreatePaddleCheckout() {
    console.log("Criar pagamento Paddle")
    if (!paddle) return alert("Paddle não inicializado")

    paddle.Checkout.open({
      items: [
        {
          priceId: "pri_01k0swbhzsgyrffezq9hzgyqr9",
          quantity: 1,
        }
      ],
      settings: {
        displayMode: "overlay",
        theme: "light",
        successUrl: "http://localhost:3000/success",
      }
    })
  }

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


  async function handleServerSidePaddleCheckout() {
    const response = await fetch("/api/paddle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
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
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full w-full">
      <h1 className="text-2xl font-bold mb-4">Paddle Client Payment</h1>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={handleCreatePaddleCheckout}
      >
        Criar pagamento Paddle Client
      </button>


      <h1 className="text-2xl font-bold mt-16 mb-4">Paddle Server Side Payment</h1>

      <button
        className="border rounded-xl px-4 py-2 cursor-pointer"
        onClick={handleServerSidePaddleCheckout}
      >
        Criar pagamento Paddle Server
      </button>
    </div>
  )
}