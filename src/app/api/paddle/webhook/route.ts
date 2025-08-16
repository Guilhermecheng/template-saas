// app/api/webhooks/paddle/route.ts
import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const PUBLIC_KEY = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!

async function addCreditsToUser(userId: string, amount: number, type: string) {
  console.log(`[CREDITOS] +${amount} para usuário ${userId} (${type})`)
  // Aqui você atualizaria o Firestore, por exemplo
}

async function markSubscriptionAsCancelled(userId: string) {
  console.log(`[ASSINATURA] Cancelada para usuário ${userId}`)
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  console.log(data)

  const eventType = data.event_type

  // const userId = passthrough.userId

  // if (!userId) {
  //   return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  // }

  switch (eventType) {
    // case "payment_succeeded":
    //   if (passthrough.type === "bundle") {
    //     await addCreditsToUser(userId, 80, "bundle")
    //   } else if (passthrough.type === "subscription") {
    //     await addCreditsToUser(userId, 12, "subscription")
    //   }
    //   break

    case "subscription.activated":
      console.log("subscription was activated")
      // await addCreditsToUser(userId, 12, "subscription_renewal")
      break

    // case "subscription_cancelled":
    //   await markSubscriptionAsCancelled(userId)
    //   break

    default:
      console.log(`Webhook não tratado: ${eventType}`)
  }

  return NextResponse.json({ success: true })
}
