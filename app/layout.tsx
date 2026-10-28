import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Amiri, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body" });
const arabic = Amiri({ subsets: ["arabic"], weight: ["400"], variable: "--font-arabic" });

const urdu = Noto_Nastaliq_Urdu({ subsets: ["arabic"], weight: ["400", "500"], variable: "--font-urdu" });

export const metadata: Metadata = {
  title: "Dawat-e-Walima | Shayan & Iqra",
  description: "You are invited to the Walima of Shayan Nafees and Iqra Hasan on 6 December 2026 at Eden Palace, Ghazipur.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ecda",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${arabic.variable} ${urdu.variable}`}>
      <body>{children}</body>
    </html>
  );
}
