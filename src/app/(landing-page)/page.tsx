import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen w-screen">
      <h1 className="text-2xl font-bold">Landing Page</h1>

      <Link href="/login" className="border rounded-xl px-4">Ir para login</Link>
    </div>
  );
}
