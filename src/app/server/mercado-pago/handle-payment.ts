import resend from "@/lib/resend"
import { PaymentResponse } from "mercadopago/dist/clients/payment/commonTypes"

export async function handleMercadoPagoPayment(paymentData: PaymentResponse) {
  const metadata = paymentData.metadata
  const userEmail = metadata.user_email
  const testeId = metadata.teste_id

  console.log("PAGAMENTO COM SUCESSO", { userEmail, testeId, paymentData })

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
