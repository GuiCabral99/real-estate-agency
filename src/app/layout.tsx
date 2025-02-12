import "./globals.css";

export const metadata = {
  title: "Real Estate Agency",
  description: "Real Estate Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
