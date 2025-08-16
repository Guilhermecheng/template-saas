import PaddleSinglePayment from "@/components/paddle/paddle-single-payment"
import PaddleSubscription from "@/components/paddle/paddle-subscription"
import Link from "next/link"

export default function Payments() {

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen w-screen p-20">
      <Link href="/dashboard" className="border rounded-xl py-2 px-4 cursor-pointer mb-8">
        Voltar
      </Link>

      <div className="flex items-center w-full h-full gap-20">
        <PaddleSinglePayment />

        <div className="h-full w-[1px] bg-zinc-600" />

        <PaddleSubscription />
      </div>
    </div>
  )
}