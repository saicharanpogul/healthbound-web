import type { Metadata } from "next";
import { Rammetto_One } from "next/font/google";
import "./globals.css";
import { getPathMetadata } from "@/constants/meta";

const rammettoOne = Rammetto_One({ weight: ["400"], subsets: ["latin"] });

export async function generateMetadata(props: any): Promise<Metadata> {
  const metadata = getPathMetadata("/");
  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rammettoOne.className}>{children}</body>
    </html>
  );
}
