import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata: Metadata = {
    title: 'CB Connect Widget',
    description: 'Compare Quotes Instantly',
}

export default function EmbedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Transparent background for iframe seamlessness
    return (
        <html lang="en" className="bg-transparent">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-transparent min-h-screen overflow-hidden`}>
                {children}
            </body>
        </html>
    )
}
