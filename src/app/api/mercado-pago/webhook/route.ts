import { handleMercadoPagoPayment } from "@/app/server/mercado-pago/handle-payment"
import mpClient, { validateMercadoPagoWebhook } from "@/lib/mercado-pago"
import { Payment } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    validateMercadoPagoWebhook(request)

    const body = await request.json()
    const { type, data } = body

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient)
        const paymentData = await payment.get({ id: data.id })

        if (
          paymentData.status === "approved" ||
          paymentData.date_approved !== null
        ) {
          await handleMercadoPagoPayment(paymentData)
        }

        break
      case "subscription_preapproval":
        break

      default:
        console.log("Este evento não é suportado", type)
    }
  } catch (error) {
    console.error("Error handling ML webhook:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    )
  }
}
