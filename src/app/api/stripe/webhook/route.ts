import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cansel"
import { handleStripPayment } from "@/app/server/stripe/handle-payment"
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const secret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const headersList = await headers()
    const signature = headersList.get("stripe-signature")

    if (!signature || !secret) {
      return NextResponse.json(
        { error: "No signature foiund" },
        { status: 400 },
      )
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    switch (event.type) {
      case "checkout.session.completed":
        const metadata = event.data.object.metadata

        if (metadata?.price === process.env.STRIPE_PRODUCT_PRICE_ID) {
          await handleStripPayment(event)
        }
        if (metadata?.price === process.env.STRIPE_SUBSCRIPTION_PRICE_ID) {
          await handleStripeSubscription(event)
        }
        break
      case "checkout.session.expired":
        console.log(
          "Enviar um email para o usuário avisando que o pagamento expirou.",
        )
        break
      case "checkout.session.async_payment_succeeded":
        console.log(
          "Enviar um email para o usuário avisando que o pagamento foi realizado",
        )
        break
      case "checkout.session.async_payment_failed":
        console.log(
          "Enviar um email para o usuário avisando que o pagamento falhou.",
        )
        break
      case "customer.subscription.created":
        console.log("Mensagem de boas vindas porque acabou de assinar")
        break
      case "customer.subscription.deleted":
        await handleStripeCancelSubscription(event)
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    )
  }
}
