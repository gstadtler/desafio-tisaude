import './globals.css'
import { Navbar } from '@/components/Navbar'
import NextAuthSessionProvider from '@/providers/sessionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <NextAuthSessionProvider>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <Navbar />
            {children}
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
