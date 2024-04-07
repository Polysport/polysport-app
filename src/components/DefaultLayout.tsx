"use client";

import { chains, wagmiClient } from "@/utils/wagmi/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ThemeModeScript } from "flowbite-react";

import "@park-ui/tailwind-plugin/preset.css";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ToastContainer theme="dark" position="bottom-right" />
                {/* <ThemeModeScript /> */}
                {/* <div className="px-[20px] pt-[13px] pb-[36px] text-[#000] flex justify-center min-h-screen">
          <div className="max-w-[692px] min-w-full desktop:w-[692px] desktop:min-w-[692px] flex flex-col justify-stretch">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div> */}
                <div className="flex flex-col justify-between min-h-screen">
                    <Header />
                    <div className="flex-1 flex">
                        <div className="flex-1 max-w-[1600px] mx-auto pb-[40px] tablet:pb-[120px]">
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}
