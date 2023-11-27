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
      <body>
        <NextAuthSessionProvider>
          <Navbar />
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
