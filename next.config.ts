import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MERCADO_PAGO_PUBLIC_KEY: process.env.MERCADO_PAGO_PUBLIC_KEY,
  },
}

export default nextConfig
