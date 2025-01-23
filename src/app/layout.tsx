'use client'

import '@/styles/globals.scss';
import { Roboto } from "next/font/google";
import { AlertProvider } from "@/context/AlertContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <meta name="All Kind of Dragons" content="Dragon Lore App" />
      <body className={roboto.variable}>
        <QueryClientProvider client={queryClient}>
          <AlertProvider>
            {children}
          </AlertProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
