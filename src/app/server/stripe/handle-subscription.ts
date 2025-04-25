import { db } from "@/lib/firebase"
import resend from "@/lib/resend"
import "server-only"

import Stripe from "stripe"

export async function handleStripeSubscription(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso. Enviar um email liberar acesso.",
    )

    const metadata = event.data.object.metadata
    const userId = metadata?.userId
    const userEmail =
      event.data.object.customer_email || event.data.object.customer_email

    if (!userId || !userEmail) {
      console.error("User ID not found")
      return
    }

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    })

    const { data, error } = await resend.emails.send({
      from: "Guilherme <guilherme.cheng@gmail.com>",
      to: [userEmail],
      subject: "Seja bem-vindo(a) à nossa plataforma",
      text: "Obrigado por assinar nosso serviço. Estamos felizes em tê-lo(a) conosco!",
    })

    if (error) {
      console.error("Error sending email:", error)
    }

    console.log("Email sent:", data)
  }
}
