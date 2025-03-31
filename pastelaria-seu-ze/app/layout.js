import './globals.css'

export const metadata = {
  title: 'Pastelaria do Seu Zé',
  description: 'Cardápio online da pastelaria fictícia',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
