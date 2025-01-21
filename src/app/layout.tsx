import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import '@/styles/globals.scss';

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Dragon Lore App",
  description: "All Kind of Dragons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        {children}
      </body>
    </html>
  );
}
