import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const api_key = process.env.PADDLE_API_SECRET!!

const paddle = new Paddle(api_key, {
  environment: Environment.sandbox,
})

export async function POST() {
  const transaction = await paddle.transactions.create({
    items: [
      {
        quantity: 1,
        price: {
          name: "dynamic price",
          description: "description",
          product: {
            name: "test product",
            description: "test description",
            taxCategory: "standard",
          },
          unitPrice: {
            amount: "8000",
            currencyCode: "EUR",
          },
        },
      },
    ],
  })

  return NextResponse.json({ transaction })
}
