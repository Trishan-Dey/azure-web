import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

export const viewport: Viewport = {
  themeColor: "#03050b",
  width: "device-width",
  initialScale: 1,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Azure Systems — Where Vision Meets Tech",
  description:
    "Student-led innovation across aerospace, defence-tech and AI. Azure Systems — Where Vision Meets Tech.",
  applicationName: "Azure Systems",
  keywords: [
    "Azure Systems",
    "aerospace",
    "defence-tech",
    "artificial intelligence",
    "CubeSat",
    "student startup",
  ],
  authors: [{ name: "Azure Systems" }],
  creator: "Azure Systems",
  openGraph: {
    title: "Azure Systems — Where Vision Meets Tech",
    description:
      "Student-led innovation across aerospace, defence-tech and AI.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: "Azure Systems — Where Vision Meets Tech",
    description: "Student-led innovation across aerospace, defence-tech and AI.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans">
        <Loader />
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
