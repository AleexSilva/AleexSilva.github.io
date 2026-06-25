import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Alex Silva — Data Consultant & Data Scientist",
    template: "%s · Alex Silva",
  },
  description:
    "Economist and Data Scientist with 8+ years turning complex data into decisions — SQL, Python, Big Data, and AI for strategic impact.",
  keywords: [
    "Alex Silva",
    "Data Consultant",
    "Data Scientist",
    "SQL",
    "Python",
    "Big Data",
    "Machine Learning",
    "Power BI",
    "Tableau",
  ],
  authors: [{ name: "Alex Silva" }],
  openGraph: {
    title: "Alex Silva — Data Consultant & Data Scientist",
    description:
      "8+ years turning complex data into decisions. SQL · Python · Big Data · AI.",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Silva — Data Consultant & Data Scientist",
    description:
      "8+ years turning complex data into decisions. SQL · Python · Big Data · AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-noise min-h-full">{children}</body>
    </html>
  );
}
