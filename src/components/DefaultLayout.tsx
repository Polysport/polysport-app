"use client";

import { chains, wagmiClient } from "@/utils/wagmi/wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

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
        {/* <div className="px-[20px] pt-[13px] pb-[36px] text-[#000] flex justify-center min-h-screen">
          <div className="max-w-[692px] min-w-full lg:w-[692px] lg:min-w-[692px] flex flex-col justify-stretch">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </div> */}
        <Header />
        <div className="pt-[61px] md:pt[-84px] pb-[78px]">{children}</div>
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
