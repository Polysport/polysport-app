"use client";

import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

const howToPlays = [
    "Prepare PLS tokens to mint boxes and MATIC to pay gas in your wallet",
    "Choose 1 of 3 box types and click Mint button to receive NFTs, each box has a different minting rate",
    "Deposit your NFTs to get number of clicks, the more stars your NFTs have, the more clicks you get",
    "Flip cards on game interface, if the cards you flip are same to the NFT you deposited, you will win the prize from reward pool",
    "You can withdraw your PLS tokens to your wallet to keep minting box to play games or take your profit",
];

export default function Home() {
    return (
        <div>
            {/* Banner */}
            <div className="mx-auto">
                <div className="relative home_banner">
                    <img
                        className="md:hidden w-full z-[-1]"
                        src="/assets/images/background/home_banner_mobile.png"
                    />
                    <img
                        className="hidden md:block xl:hidden w-full z-[-1]"
                        src="/assets/images/background/home_banner_tablet.png"
                    />
                    <img
                        className="hidden xl:block w-full z-[-1]"
                        src="/assets/images/background/home_banner_pc.png"
                    />
                    <div className="flex flex-col justify-between gap-y-5 max-lg:items-center absolute bottom-0 xl:bottom-1/2 left-1/2 xl:left-[10%] -translate-x-1/2 xl:translate-x-0 xl:translate-y-1/2">
                        <div>
                            <div className="relative">
                                <p className="text-gradient-banner font-russo-one text-[100px] max-lg:text-[70px] leading-[80px] max-lg:leading-[70px] max-xl:text-center">
                                    POLY
                                    <br />
                                    SPORT
                                </p>
                                <p className="absolute text-[#E40FAC] left-0 max-lg:left-1/2 max-lg:-translate-x-1/2 top-[2px] z-[-1] font-russo-one text-[100px] max-lg:text-[70px] leading-[80px] max-lg:leading-[70px] max-xl:text-center">
                                    POLY
                                    <br />
                                    SPORT
                                </p>
                            </div>
                            <p className="font-russo-one text-[40px] max-lg:text-[35px] leading-[50px] max-xl:text-center">
                                FOOTBALL
                                <br />
                                CARD GAME
                            </p>
                        </div>
                        <Link
                            href="/game"
                            className="text-center xl:text-start"
                        >
                            <Button
                                text="PLAY GAME"
                                className="w-[318px] md:w-[389px] text-[20px]"
                            />
                        </Link>
                        <div
                            style={{ scrollBehavior: "smooth" }}
                            id="scrollContainer"
                            className="flex gap-x-3 max-w-[300px] overflow-hidden min-h-[40px]"
                        >
                            <div className="max-sm:h-[30px] h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/Polygon.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/ETH.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/BNB.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/starknet-icon.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/Protocol-icon.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/Solana.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/Avalanche.svg"
                                />
                            </div>
                            <div className="max-sm:h-[30px] brightness-50 h-[40px] aspect-square">
                                <img
                                    className="w-full h-full"
                                    src="/assets/images/FTX Token.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="max-w-[1280px] mx-auto px-2 md:px-10 mt-20 max-sm:mt-[60px]">
                <div>
                    <p className="font-russo-one text-[60px] max-sm:text-[30px] text-center">
                        About Polysport
                    </p>
                    <div className="flex justify-evenly items-center gap-x-20 gap-y-5 max-md:flex-col mt-10 max-sm:mt-5">
                        <img
                            className="md:max-w-[50%] xl:max-sm:w-[70%]"
                            src="/assets/images/avt_about_v2.png"
                        />
                        <div className="w-full">
                            <div className="flex gap-x-[10px]">
                                <div className="h-5 aspect-square">
                                    <img src="/assets/diamond.svg" />
                                </div>
                                <p className="text-[#C6C6C6] text-[12px] md:text-[18px] xl:text-[16px] mb-[10px]">
                                    Polysport is a digital flipping card game
                                    that uses blockchain technology. Fusion of
                                    Polygon, gaming, and offering economic
                                    incentives through play-to-earn models.
                                </p>
                            </div>
                            <div className="flex gap-x-[10px]">
                                <div className="h-5 aspect-square">
                                    <img src="/assets/diamond.svg" />
                                </div>
                                <p className="text-[#C6C6C6] text-[12px] md:text-[18px] xl:text-[16px] mb-[10px]">
                                    Polysport is a game, first and foremost, not
                                    an investment vehicle, and a game that is
                                    still in development.
                                </p>
                            </div>
                            <div className="text-center md:text-left">
                                <Link
                                    href="https://polysport.gitbook.io/polysport"
                                    target="_blank"
                                >
                                    <Button
                                        text="Document"
                                        className="w-[231px] md:w[288px] xl:w-[206px] text-[20px] md:text-[40px] xl:text-[16px]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product */}
            <div className="max-w-[1280px] mx-auto px-2 md:px-10 mt-20 max-sm:mt-[60px]">
                <div>
                    <div>
                        <p className="text-[60px] max-sm:text-[30px] text-center font-russo-one">
                            The Products
                        </p>
                    </div>
                    <div className="mt-10 max-sm:mt-5 grid grid-cols-2 gap-10 max-sm:gap-5 max-lg:grid-cols-1 place-items-center overflow-auto">
                        <div className="relative grid place-items-center max-w-[650px] min-h-[300px] max-sm:min-h-[250px] border-btn">
                            <div className="flex flex-col p-10 pb-5 max-sm:p-5">
                                <div className="flex items-center gap-x-[30px] max-sm:gap-x-4">
                                    <img
                                        className="max-sm:h-[80px] max-md:h-[130px] aspect-square"
                                        src="/assets/images/icon_the_product1.svg"
                                    />
                                    <div>
                                        <p className="text-[33px] max-sm:text-[16px] font-bold">
                                            Marketplace
                                        </p>
                                        <p className="line-clamp-6 max-sm:text-[12px]">
                                            Marketplace provides a platform
                                            where users can buy and sell various
                                            NFTs with each other. Users can set
                                            the price of their own NFTs and
                                            initiate sales orders. Buyers can
                                            buy what they like with listing
                                            prices
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://polysport.gitbook.io/polysport"
                                    className="mr-5 mt-5 flex items-center gap-x-4 justify-end cursor-pointer"
                                >
                                    <p className="text-end max-sm:text-[12px]">
                                        Read
                                    </p>
                                    <img src="/assets/images/arrowRight.svg" />
                                </a>
                            </div>
                        </div>
                        <div className="relative grid place-items-center max-w-[650px] min-h-[300px] max-sm:min-h-[250px] border-btn">
                            <div className="flex flex-col p-10 pb-5 max-sm:p-5">
                                <div className="flex items-center gap-x-[30px] max-sm:gap-x-4">
                                    <img
                                        className="max-sm:h-[80px] max-md:h-[130px] aspect-square"
                                        src="/assets/images/icon_the_product2.svg"
                                    />
                                    <div>
                                        <p className="text-[33px] max-sm:text-[16px] font-bold">
                                            NFT polysport
                                        </p>
                                        <p className="line-clamp-6 max-sm:text-[12px]">
                                            There are 200 NFTs representing
                                            players from the world's top soccer
                                            teams.
                                            <br />
                                            <br />
                                            NFTs will be divided into 5
                                            categories with different colors
                                            from 1 star to 5 stars depending on
                                            the rarity of the NFTs.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://polysport.gitbook.io/polysport"
                                    className="mr-5 mt-5 flex items-center gap-x-4 justify-end cursor-pointer"
                                >
                                    <p className="text-end max-sm:text-[12px]">
                                        Read
                                    </p>
                                    <img src="/assets/images/arrowRight.svg" />
                                </a>
                            </div>
                        </div>
                        <div className="relative grid place-items-center max-w-[650px] min-h-[300px] max-sm:min-h-[250px] border-btn">
                            <div className="flex flex-col p-10 pb-5 max-sm:p-5">
                                <div className="flex items-center gap-x-[30px] max-sm:gap-x-4">
                                    <img
                                        className="max-sm:h-[80px] max-md:h-[130px] aspect-square"
                                        src="/assets/images/icon_the_product3.svg"
                                    />
                                    <div>
                                        <p className="text-[33px] max-sm:text-[16px] font-bold">
                                            Flip Card Game
                                        </p>
                                        <p className="line-clamp-6 max-sm:text-[12px]">
                                            Burn your NFT minted from Box to
                                            receive amount of flipping cards and
                                            have chances to get huge rewards if
                                            you are lucky.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://polysport.gitbook.io/polysport"
                                    className="mr-5 mt-5 flex items-center gap-x-4 justify-end cursor-pointer"
                                >
                                    <p className="text-end max-sm:text-[12px]">
                                        Read
                                    </p>
                                    <img src="/assets/images/arrowRight.svg" />
                                </a>
                            </div>
                        </div>
                        <div className="relative grid place-items-center max-w-[650px] min-h-[300px] max-sm:min-h-[250px] border-btn">
                            <div className="flex flex-col p-10 pb-5 max-sm:p-5">
                                <div className="flex items-center gap-x-[30px] max-sm:gap-x-4">
                                    <img
                                        className="max-sm:h-[80px] max-md:h-[130px] aspect-square"
                                        src="/assets/images/icon_the_product4.svg"
                                    />
                                    <div>
                                        <p className="text-[33px] max-sm:text-[16px] font-bold">
                                            Football Manager Game
                                        </p>
                                        <p className="line-clamp-6 max-sm:text-[12px]">
                                            Collect, manage and upgrade your
                                            cards to build a football team,
                                            compete with other players and win
                                            the prize.
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="https://polysport.gitbook.io/polysport"
                                    className="mr-5 mt-5 flex items-center gap-x-4 justify-end cursor-pointer"
                                >
                                    <p className="text-end max-sm:text-[12px]">
                                        Read
                                    </p>
                                    <img src="/assets/images/arrowRight.svg" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-2 md:px-10 mt-20 max-sm:mt-[60px]">
                <div className="">
                    <div className="">
                        <p className="text-[60px] max-sm:text-[30px] text-center font-russo-one">
                            How to play?
                        </p>
                    </div>
                    <div className="mt-10 max-sm:mt-5">
                        <div className="grid grid-cols-4 md:grid-cols-6  xl:grid-cols-5 gap-[30px] max-lg:gap-4 md:pb-20">
                            {howToPlays.map((s, idx) => (
                                <div
                                    key={idx}
                                    className={clsx(
                                        "col-span-2 xl:col-span-1 relative border border-white/40 rounded-[18px] w-full xl:min-w-[220px] xl:h-[330px]",
                                        {
                                            "max-md:col-start-2":
                                                idx == howToPlays.length - 1,
                                            "md:col-start-2 xl:col-start-4":
                                                idx == howToPlays.length - 2,
                                        }
                                    )}
                                >
                                    <div className="absolute w-full h-full z-[-1]">
                                        <img
                                            className="absolute top-0 left-0"
                                            src="/assets/images/cornorTop.svg"
                                        />
                                        <img
                                            className="absolute right-0 bottom-0"
                                            src="/assets/images/cornorBottom.svg"
                                        />
                                    </div>
                                    <div className="w-full h-[50%] grid place-items-center">
                                        <img
                                            src={`/assets/images/how_to_play${
                                                idx + 1
                                            }.png`}
                                        />
                                    </div>
                                    <div className="mt-4 xl:mt-8 px-3">
                                        <p className="text-[16px] xl:text-[20px] font-semibold">
                                            Step {idx + 1}
                                        </p>
                                        <p className="text-[9px] mt-0.5 xl:mt-3">
                                            {s}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative border-btn mt-10 max-sm:mt-[115px]">
                            <div className="p-10 max-sm:p-5 flex items-center gap-10 lg:gap-x-20 max-md:flex-col max-md:justify-center">
                                <div className="absolute left-0 right-0 md:left-[-15%] md:right-[40%] xl:left-[-5%] xl:right-[50%] top-0 md:top-[50%] -translate-y-[30%] md:-translate-y-[60%] xl:-translate-y-[50%]">
                                    <div className="w-full aspect-square  relative ">
                                        <Image
                                            src="/assets/boxes.png"
                                            alt="boxes"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 pt-[calc(66%)] md:pt-0 md:pl-[50%]">
                                    <p>
                                        Polysport is a lottery game where you
                                        stand a chance to win cash prizes every
                                        time you play. You have 50 boxes to
                                        choose from and you WIN the amount in
                                        the lucky box. Pick any box from 1-50 to
                                        win instantly by using an NFT. Winners
                                        can earn real money, making it a
                                        lucrative platform for players with the
                                        best cards. Polysport works on the
                                        Polygon block chain and requires players
                                        to create an account or connect an
                                        existing Web3 wallet like Meta Mask to
                                        get started.
                                    </p>
                                    <Link
                                        href="/game"
                                        className="text-center xl:text-start"
                                    >
                                        <Button
                                            text="PLAY GAME"
                                            className="w-[205px] text-[16px]"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="max-w-[1280px] mx-auto px-2 md:px-10 mt-20 max-sm:mt-[60px]">
        <div className="flex items-center flex-wrap max-lg:flex-col">
          <div className="flex-1">
            <p className="font-russo-one text-[100px] max-xl:text-[80px] max-sm:text-[30px] max-lg:text-[60px]">
              How to mint NFT
            </p>
          </div>
          <div className="overflow-auto mt-3 max-sm:mt-3 mx-auto max-w-[100%]">
            <div className="flex gap-x-[10px] pt-7 ">
              <div className="relative p-4 pt-0 border border-white/40 max-w-[150px] min-w-[150px] rounded-[10px]">
                <div className="h-[77px] relative top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] aspect-square rounded-full bg-gradient-to-br from-[#2824E6] to-[#E40FAC] grid place-items-center">
                  <div className="h-[42px] aspect-square">
                    <img
                      className="w-full h-full"
                      src="/assets/images/wallet_white.svg"
                    />
                  </div>
                </div>
                <p className="text-[24px] font-semibold">Set up your wallet</p>
              </div>
              <div className="grid place-items-center">
                <img src="/assets/images/arrowToRight.svg" />
              </div>
              <div className="relative p-4 pt-0 border border-white/40 max-w-[150px] min-w-[150px] rounded-[10px]">
                <div className="h-[77px] relative top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] aspect-square rounded-full bg-gradient-to-br from-[#2824E6] to-[#E40FAC] grid place-items-center">
                  <div className="h-[42px] aspect-square">
                    <img
                      className="w-full h-full"
                      src="/assets/images/layer_white.svg"
                    />
                  </div>
                </div>
                <p className="text-[24px] font-semibold">Mint NFTs Poly</p>
              </div>
              <div className="grid place-items-center">
                <img src="/assets/images/arrowToRight.svg" />
              </div>
              <div className="relative p-4 pt-0 border border-white/40 max-w-[150px] min-w-[150px] rounded-[10px]">
                <div className="h-[77px] relative top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] aspect-square rounded-full bg-gradient-to-br from-[#2824E6] to-[#E40FAC] grid place-items-center">
                  <div className="h-[42px] aspect-square">
                    <img
                      className="w-full h-full"
                      src="/assets/images/add_card_white.svg"
                    />
                  </div>
                </div>
                <p className="text-[24px] font-semibold">Add your NFTs</p>
              </div>
              <div className="grid place-items-center">
                <img src="/assets/images/arrowToRight.svg" />
              </div>
              <div className="relative p-4 pt-0 border border-white/40 max-w-[150px] min-w-[150px] rounded-[10px]">
                <div className="h-[77px] relative top-0 left-1/2 -translate-x-1/2 -translate-y-[30%] aspect-square rounded-full bg-gradient-to-br from-[#2824E6] to-[#E40FAC] grid place-items-center">
                  <div className="h-[42px] aspect-square">
                    <img
                      className="w-full h-full"
                      src="/assets/images/game_white.svg"
                    />
                  </div>
                </div>
                <p className="text-[24px] font-semibold">Play to game</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
            <div className="max-w-[1280px] mx-auto px-2 md:px-10 mt-20 max-sm:mt-[60px]">
                <p className="text-[60px] max-sm:text-[30px] font-russo-one text-center">
                    Polysport Games
                </p>
                <div className="flex gap-x-20 justify-between mt-10 max-sm:mt-5 max-md:flex-col gap-y-10">
                    <div>
                        <div className="w-full relative rounded-[15px] overflow-hidden">
                            <img
                                className="w-full aspect-[3/2]"
                                src="/assets/images/play-now2.png"
                            />
                            <div className="px-4 py-2 sm:pb-8 backdrop-blur-md absolute bottom-0 left-0 w-full">
                                <p className="text-[16px] md:text-[24px] font-semibold">
                                    Flip Card Game
                                </p>
                                <p className="text-sm max-sm:text-[10px]">
                                    Burn your NFT minted from Box to receive
                                    amount of flipping cards and have chances to
                                    get huge rewards if you are lucky.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full gap-x-[48px] max-sm:gap-x-5 mt-[30px] max-sm:mt-5">
                            <Link
                                href="https://polysport.gitbook.io/polysport"
                                target="_blank"
                                className="flex-1 text-center xl:text-start"
                            >
                                <Button
                                    text="See Tutorial"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </Link>
                            <Link
                                href="/game"
                                className="flex-1 text-center xl:text-start"
                            >
                                <Button
                                    text="PLAY GAME"
                                    className="w-full text-[16px]"
                                />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="w-full relative rounded-[15px] overflow-hidden">
                            <img
                                className="w-full aspect-[3/2]"
                                src="/assets/images/play-now1.png"
                            />
                            <div className="px-5 py-3 sm:pb-8 backdrop-blur-md absolute bottom-0 left-0 w-full">
                                <p className="text-[24px] font-semibold max-sm:text-[16px]">
                                    Football Manager Game
                                </p>
                                <p className="text-sm mt-3 max-sm:text-[10px]">
                                    Collect, manage and upgrade your cards to
                                    build a football team, compete with other
                                    players and win the prize.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full gap-x-[48px] max-sm:gap-x-5 mt-[30px] max-sm:mt-5">
                            <Link
                                href="https://polysport.gitbook.io/polysport"
                                target="_blank"
                                className="flex-1 text-center xl:text-start"
                            >
                                <Button
                                    text="See Tutorial"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </Link>
                            <div className="flex-1 text-center xl:text-start">
                                <Button
                                    text="Coming Soon"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
