import { Toaster } from "@/components/ui/toaster";
import { AutenticacaoProvider } from "@/core/autenticacao/autenticacao";
import { QueryProvider } from "@/lib/query-provider";
import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PegStock",
  description: "PegStock é um sistema de gestão de estoque",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <AutenticacaoProvider>
        <html lang="pt-br">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
            <Toaster />
          </body>
        </html>
      </AutenticacaoProvider>
    </QueryProvider>
  );
}
