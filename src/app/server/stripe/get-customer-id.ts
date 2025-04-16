import { db } from "@/lib/firebase"
import { stripe } from "@/lib/stripe"
import "server-only"

export async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const userRef = db.collection("users").doc(userId)
    const userDoc = await userRef.get()

    if (!userDoc.exists) {
      throw new Error("User not fount.")
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId

    if (stripeCustomerId) {
      return stripeCustomerId
    }

    const stripeCustomer = await stripe.customers.create({
      email: userEmail,
      name: userDoc.data()?.name,
      metadata: {
        userId,
      },
    })

    await userRef.update({
      stripeCustomerId: stripeCustomer.id,
    })

    return stripeCustomer.id
  } catch (err) {
    console.error(err)
    throw new Error("Failed to get or create customer.")
  }
}
