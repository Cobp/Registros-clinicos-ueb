import type { Metadata } from "next";
import "@fontsource-variable/onest/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Formulario de Anen",
  description: "A minimal Next.js starter for learning Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased ">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
