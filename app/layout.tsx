import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from './components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Strength Tracker',
  description: 'A fitness tracker app focused on strength training',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Navigation />
          <main className="flex-grow overflow-auto p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

