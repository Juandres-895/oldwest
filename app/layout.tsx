import type { Metadata } from 'next'
import { Rye, Playfair_Display, Lora, Inter } from 'next/font/google'
import './globals.css'

const rye = Rye({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rye',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Old West Steak House',
    template: '%s · Old West Steak House',
  },
  description:
    'Menú digital de Old West Steak House. Entradas, fuertes, postres, bebidas y cócteles con el sabor del viejo oeste.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${rye.variable} ${playfair.variable} ${lora.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-bone antialiased">
        {children}
      </body>
    </html>
  )
}
