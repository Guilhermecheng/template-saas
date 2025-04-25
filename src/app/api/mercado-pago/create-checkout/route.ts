import mpClient from "@/lib/mercado-pago"
import { Preference } from "mercadopago"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { testeId, userEmail } = await request.json()
  console.log("testeId", testeId)
  console.log("userEmail", userEmail)

  try {
    const preference = new Preference(mpClient)

    const createdPreference = await preference.create({
      body: {
        external_reference: testeId, // isso impacta na pontuação do Mercado Pago
        metadata: {
          testeId, // essa variavel é convertida para snake_case -> teste_id
          userEmail,
        },
        ...(userEmail && {
          payer: {
            email: userEmail,
          },
        }),
        items: [
          {
            id: testeId,
            title: "Teste",
            description: "Teste",
            quantity: 1,
            unit_price: 1,
            category_id: "services",
            currency_id: "BRL",
          },
        ],
        payment_methods: {
          installments: 12,
          // excluded_payment_methods: [
          //   {
          //     id: "bolbradesco",
          //   },
          //   {
          //     id: "pec",
          //   }
          // ],
          // excluded_payment_types: [
          //   {
          //     id: "debit_card",
          //   },
          // ]
        },
        auto_return: "approved",
        back_urls: {
          success: `${request.headers.get("origin")}/api/mercado-pago/pending`,
          pending: `${request.headers.get("origin")}/api/mercado-pago/pending`,
          failure: `${request.headers.get("origin")}/api/mercado-pago/pending`,
        },
      },
    })

    if (!createdPreference.id) {
      return NextResponse.json(
        { error: "Erro ao criar checkout do Mercado Pago" },
        { status: 500 },
      )
    }

    return NextResponse.json({
      preferenceId: createdPreference.id,
      initPoint: createdPreference.init_point,
    })
  } catch (error) {
    console.error("Error creating preference:", error)
    return NextResponse.json(
      { error: "Erro ao criar checkout do Mercado Pago" },
      { status: 500 },
    )
  }
}
