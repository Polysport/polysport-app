import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mx-auto px-2 max-sm:px-6 mt-20 max-sm:mt-[60px]">
      <div className="border-t-2 border-[#2824E6] text-white">
        <div className="max-w-[1280px] mx-auto max-sm:px-2 pt-[60px] max-sm:pt-[40px] pb-5 flex justify-between gap-x-2 max-sm:flex-col max-md:gap-x-2">
          <div className="flex flex-col justify-between max-w-[520px]">
            <div>
              <div className="mb-4 flex gap-1 items-center">
                <div className="w-[50px] aspect-square">
                  <img src="/assets/logo.png" />
                </div>
                <p className="italic font-extrabold text-[26px]">POLYSPORT</p>
              </div>
              <p className="text-[#C6C6C6]">
                Polysport is a digital trading card game that uses blockchain
                technology. Fusion of Polygon, gaming, and offering economic
                incentives through play-to-earn models.
              </p>
            </div>
            <div className="md:hidden mt-10 flex gap-x-10 max-sm:gap-x-5">
              <div className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/telegram.svg" />
              </div>
              <div className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/X.svg" />
              </div>
              <div className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/discord.svg" />
              </div>
              <div className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/medium.svg" />
              </div>
              <div className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/github.svg" />
              </div>
            </div>
            <p className="text-gray-300 max-sm:hidden mt-3 text-[20px] font-medium">
              2023 © Copyright POLYSPORT. All Rights Reserved
            </p>
          </div>
          <div className="max-sm:my-6 flex sm:flex-col max-sm:flex-wrap gap-y-5 gap-x-4 sm:justify-between text-[20px] font-bold">
            <a className="cursor-pointer" href="/">
              Home
            </a>
            <a className="cursor-pointer" href="/marketplace">
              Marketalace
            </a>
            <a className="cursor-pointer" href="/game">
              Game
            </a>
            <a
              className="cursor-pointer"
              href="https://polysport.gitbook.io/polysport/"
              target="_blank"
            >
              Document
            </a>
            <a
              className="cursor-pointer"
              href="https://polysport.gitbook.io/polysport/development/branding"
              target="_blank"
            >
              Brand Kit
            </a>
            <a
              className="cursor-pointer"
              href="https://polysport.gitbook.io/polysport/development/contact-us"
              target="_blank"
            >
              Contract Us
            </a>
          </div>
          <div className="max-md:hidden flex flex-col justify-end">
            <p className="mb-5 text-[20px] font-bold text-center">Communuty</p>
            <div className="flex gap-x-10">
              <a
                href="https://t.me/polysportCN"
                target="_blank"
                className="h-[48px] aspect-square"
              >
                <img className="w-full h-full" src="./assets/telegram.svg" />
              </a>
              <a
                href="https://twitter.com/Polysportgame"
                target="_blank"
                className="h-[48px] aspect-square"
              >
                <img className="w-full h-full" src="./assets/X.svg" />
              </a>
              <a
                href="https://discord.com/invite/N4k8UNySPc"
                target="_blank"
                className="h-[48px] aspect-square"
              >
                <img className="w-full h-full" src="./assets/discord.svg" />
              </a>
              <a
                href="https://medium.com/@polysport.game"
                target="_blank"
                className="h-[48px] aspect-square"
              >
                <img className="w-full h-full" src="./assets/medium.svg" />
              </a>
              <a className="h-[48px] aspect-square">
                <img className="w-full h-full" src="./assets/github.svg" />
              </a>
            </div>
          </div>
          <p className="text-gray-300 sm:hidden text-[14px] font-medium">
            {new Date().getFullYear()} © Copyright POLYSPORT. All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
