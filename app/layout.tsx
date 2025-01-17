import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Template from "./components/RootLayout";
import { NavigationProvider } from "./utils/navigationContext";
import SmoothScrolling from "./components/ReactLenis";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "VoidXR",
    description:
        "Conceptualizamos, dirigimos y producimos experiencias artísticas, museográficas y comerciales a través de tecnología.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                {/* Google tag (gtag.js) */}
                <Script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-YQ8V32HMZE"
                />
                <Script src="./google.tag.js" />
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/iqd6buu.css"
                />
                <link
                    rel="icon"
                    href="/favicon_io_void/favicon.ico"
                    sizes="any"
                />
                <link
                    rel="icon"
                    href="/favicon_io_void/favicon-32x32.png"
                    type="image/<generated>"
                    sizes="<generated>"
                />
                <link
                    rel="apple-touch-icon"
                    href="/favicon_io_void/apple-touch-icon.png>"
                    type="image/<generated>"
                    sizes="<generated>"
                />
            </head>
            <body className={inter.className}>
                <SmoothScrolling>
                    <NavigationProvider>
                        <Template>{children}</Template>
                    </NavigationProvider>
                </SmoothScrolling>
            </body>
        </html>
    );
}
