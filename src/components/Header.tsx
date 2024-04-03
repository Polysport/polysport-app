"use client";
import Link from "next/link";
import "../styles/header.css";
import WalletConnectBtn from "./wallet-connect-btn/wallet-connect-btn";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IS_PROD } from "@/configs";

export default function Header() {
  const pathName = usePathname();
  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => setIsExpand(false), [pathName]);

  return (
    <div className="relative">
      <div className="absolute bg-img bg-cover bg-no-repeat w-screen h-screen -z-[1] overflow-hidden" />
      {/* Header */}
      <div className="bg_header fixed top-0 left-0 w-screen py-2 md:py-[17px] z-[10] px-2 md:px-[32px] backdrop-blur-md mx-auto">
        <div className="max-w-[1280px] mx-auto">
          <div className="absolute flex gap w-[50%] max-w-[800px] max-xl:hidden justify-between h-full top-0 left-1/2 -translate-x-1/2">
            <img src="/assets/images/decor_header1.svg" />
            <img src="/assets/images/decor_header2.svg" />
          </div>
          <div className="w-full flex justify-between items-center max-w-[1440px] mx-auto">
            <div className="flex gap-1 items-center">
              <div className="h-[26px] md:h-[50px] aspect-square relative">
                <Image src="/assets/logo.png" alt="logo" fill sizes="any" />
              </div>

              <p className="italic font-extrabold text-[14px] md:text-[24px] text-slate-400">
                POLYSPORT
              </p>
            </div>
            <div className="flex items-center gap-x-5 max-sm:gap-x-2">
              {/* <div className="sm:hidden h-6 aspect-square">
                <img className="w-full h-full" src="/assets/images/s.svg" />
              </div> */}
              <WalletConnectBtn />
              <div
                onClick={() => setIsExpand((pre) => !pre)}
                className="lg:hidden h-6 aspect-square cursor-pointer"
              >
                <img className="w-full h-full" src="/assets/menu.svg" />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mx-auto flex justify-between items-center px-2">
            <div className="max-lg:hidden flex gap-10 text-sm font-medium text-white">
              <div className="relative overflow-hidden header-item">
                <Link href="/" className="cursor-pointer">
                  Home
                </Link>
                <div className="h-[2px] bg-white animation-header-item" />
              </div>
              {!IS_PROD && (
                <>
                  <div className="relative overflow-hidden header-item">
                    <Link href="/mint" className="cursor-pointer">
                      Mint NFT
                    </Link>
                    <div className="h-[2px] bg-white animation-header-item" />
                  </div>
                  {/* <div className="relative overflow-hidden header-item">
                <Link href="/marketplace" className="cursor-pointer">
                  Marketplace
                </Link>
                <div className="h-[2px] bg-white animation-header-item" />
              </div> */}
                  <div className="relative overflow-hidden header-item">
                    <Link href="/game" className="cursor-pointer">
                      Game
                    </Link>
                    <div className="h-[2px] bg-white animation-header-item" />
                  </div>
                </>
              )}
              {/* <div class="relative overflow-hidden header-item">
        <p class="cursor-pointer">Betting</p>
        <div class="h-[2px] bg-white animation-header-item"></div>
      </div> */}
              <div className="relative overflow-hidden header-item">
                <Link
                  href="https://polysport.gitbook.io/polysport/development/contact-us"
                  target="_blank"
                  className="cursor-pointer"
                  // onclick="window.location='https://polysport.gitbook.io/polysport/development/contact-us'"
                >
                  Document
                </Link>
                <div className="h-[2px] bg-white animation-header-item" />
              </div>
              {IS_PROD && (
                <div className="relative overflow-hidden header-item">
                  <Link href="/ido" className="cursor-pointer">
                    IDO
                  </Link>
                  <div className="h-[2px] bg-white animation-header-item" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          id="menu-dropdown"
          className={clsx(
            "lg:hidden animate-fade pt-2 flex flex-col gap-y-1 cursor-pointer",
            {
              hidden: !isExpand,
            }
          )}
        >
          <Link href="/" className="text-end font-medium hover:font-semibold">
            Home
          </Link>
          {!IS_PROD && (
            <>
              <Link
                href="/mint"
                className="text-end font-medium hover:font-semibold"
              >
                Mint NFT
              </Link>
              {/* <Link
            href="/marketplace"
            className="text-end font-medium hover:font-semibold"
          >
            Marketplace
          </Link> */}
              <Link
                href="/game"
                className="text-end font-medium hover:font-semibold"
              >
                Game
              </Link>
            </>
          )}
          <Link
            href="https://polysport.gitbook.io/polysport/development/contact-us"
            target="_blank"
            className="text-end font-medium hover:font-semibold"
          >
            Document
          </Link>
          {IS_PROD && (
            <Link
              href="/ido"
              className="text-end font-medium hover:font-semibold"
            >
              IDO
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
