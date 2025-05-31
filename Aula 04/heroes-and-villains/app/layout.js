import './globals.css';

export const metadata = {
  title: 'Dragon Ball Battle',
  description: 'Goku vs inimigos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
