import { Metadata } from "next/types";
import DefaultLayout from "@/components/DefaultLayout";

import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
    title: "Polysport",
    description:
        "Polysport is a digital flipping card game that uses blockchain technology. Fusion of Polygon, gaming, and offering economic incentives through play-to-earn models.",
    metadataBase: new URL("https://polysport.finance"),
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/en-US",
        },
    },
    openGraph: {
        title: "Polysport",
        description:
            "Polysport is a digital flipping card game that uses blockchain technology. Fusion of Polygon, gaming, and offering economic incentives through play-to-earn models.",
        url: "https://polysport.finance",
        siteName: "Polysport",
        images: [
            {
                url: "https://opengraph.b-cdn.net/production/documents/5a02339d-92a4-4fb3-9af8-7725c84382ca.png?token=pCE0nzwC7XkppxMrRItpye5267ouhzLC1lNC7X2bjnk&height=630&width=1200&expires=33246867848",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/logo.png",
        apple: "/apple-touch-icon.png",
        other: {
            rel: "apple-touch-icon",
            url: "/apple-touch-icon.png",
        },
    },
    twitter: {
        card: "summary_large_image",
        title: "Polysport",
        description:
            "Polysport is a digital flipping card game that uses blockchain technology. Fusion of Polygon, gaming, and offering economic incentives through play-to-earn models.",
        creator: "@Polysport_NFT",
        images: {
            url: "https://opengraph.b-cdn.net/production/documents/5a02339d-92a4-4fb3-9af8-7725c84382ca.png?token=pCE0nzwC7XkppxMrRItpye5267ouhzLC1lNC7X2bjnk&height=630&width=1200&expires=33246867848",
            alt: "logo",
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title>Polysport</title>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
                />
                <meta name="description" content="" />
                <meta name="theme-color" content="#1FC7D4" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />

                <link
                    href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Russo+One&display=swap"
                    rel="stylesheet"
                />
                {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        /> */}
            </head>
            <body>
                <DefaultLayout>{children}</DefaultLayout>
            </body>
        </html>
    );
}
