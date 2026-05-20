import type { Metadata } from "next";
import "@fontsource-variable/onest/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Registro Clínico - Formulario Integral de Anamnesis y Evaluación Clínica",
  description: "A minimal Next.js starter for learning Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased ">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
