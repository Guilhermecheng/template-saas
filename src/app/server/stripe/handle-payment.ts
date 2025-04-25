import { db } from "@/lib/firebase"
import resend from "@/lib/resend"
import "server-only"

import Stripe from "stripe"

export async function handleStripPayment(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  if (event.data.object.payment_status === "paid") {
    console.log(
      "Pagamento realizado com sucesso. Enviar um email liberar acesso.",
    )

    const metadata = event.data.object.metadata
    const userId = metadata?.userId
    const userEmail = event.data.object.customer_email

    if (!userId || !userEmail) {
      console.error("User ID or email not found")
      return
    }

    await db.collection("users").doc(userId).update({
      stripeSubscriptionId: event.data.object.subscription,
      subscriptionStatus: "active",
    })

    const { data, error } = await resend.emails.send({
      from: "Guilherme <guilherme.cheng@gmail.com>",
      to: [userEmail],
      subject: "Pagamento realizado com sucesso",
      text: "Pagamento realizado com sucesso. Obrigado por assinar nosso serviço.",
    })

    if (error) {
      console.error("Error sending email:", error)
    }

    console.log("Email sent:", data)
  }
}
