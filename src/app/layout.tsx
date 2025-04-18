import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import BackgroundGradient from "@/components/common/BackgroundGradient";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["200", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Sommaire",
    description:
        "Sommaire is a web application for summarizing your PDF documents",
    keywords: [
        "Sommaire",
        "PDF",
        "Summarize",
        "Summarization",
        "AI",
        "AI Summarization",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${fontSans.variable} font-sans antialiased`}>
                    <BackgroundGradient />
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                    <Toaster position="top-right" />
                </body>
            </html>
        </ClerkProvider>
    );
}
