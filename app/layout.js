export const metadata = {
  title: 'ATRK',
  description: 'ATRK - Marketing Operations Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
