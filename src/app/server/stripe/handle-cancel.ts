import { db } from "@/lib/firebase"
import resend from "@/lib/resend"
import "server-only"

import Stripe from "stripe"

export async function handleStripeCancelSubscription(
  event: Stripe.CustomerSubscriptionDeletedEvent,
) {
  console.log("Assinatura cancelada.")

  const customerId = event.data.object.customer
  const userRef = await db
    .collection("users")
    .where("stripeCustomerId", "==", customerId)
    .get()

  if (userRef.empty) {
    console.error("User ID not found")
    return
  }

  const userId = userRef.docs[0].id
  const userEmail = userRef.docs[0].data().email

  await db.collection("users").doc(userId).update({
    subscriptionStatus: "inactive",
  })

  const { data, error } = await resend.emails.send({
    from: "Guilherme <guilherme.cheng@gmail.com>",
    to: [userEmail],
    subject: "Assinatura cancelada com sucesso",
    text: "Assinatura cancelada com sucesso.",
  })

  if (error) {
    console.error("Error sending email:", error)
  }

  console.log("Email sent:", data)
}
