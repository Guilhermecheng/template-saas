import { Environment, Paddle } from "@paddle/paddle-node-sdk"
import { NextRequest, NextResponse } from "next/server"

const api_key = process.env.PADDLE_API_SECRET!!

const paddle = new Paddle(api_key, {
  environment: Environment.sandbox,
})
export async function POST(request: NextRequest) {
  try {
    // No App Router, o corpo da requisição é obtido com `await request.json()`
    const { priceId, userId, userEmail } = await request.json()

    console.log("priceId:", priceId)
    console.log("userId:", userId)
    console.log("userEmail:", userEmail)

    // Validação básica dos dados recebidos
    if (!priceId || !userId || !userEmail) {
      return NextResponse.json(
        { error: "Price ID, User ID e User Email são obrigatórios." },
        { status: 400 },
      )
    }

    // O objeto da transação que será enviado para a Paddle
    const transactionData = {
      items: [
        {
          priceId: priceId,
          quantity: 1,
        },
      ],
      // O campo 'customData' é CRUCIAL. É através dele que você vai
      // vincular a transação da Paddle ao usuário no seu banco de dados
      // quando receber o webhook.
      customData: {
        user_id: userId,
      },
      // Passamos os dados do cliente para pré-preencher o checkout, melhorando a experiência.
      customer: {
        email: userEmail,
      },
    }
    console.log("transactionData:", transactionData)

    // Usa o SDK para criar a transação na Paddle
    const transaction = await paddle.transactions.create(transactionData)

    // Retorna a URL de checkout gerada usando NextResponse.json()
    return NextResponse.json({ transaction })
  } catch (error: any) {
    console.error("Erro ao criar transação na Paddle:", error.message || error)
    const errorMessage =
      error.message || "Ocorreu um erro ao processar sua solicitação."

    // Retorna uma resposta de erro padronizada
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
