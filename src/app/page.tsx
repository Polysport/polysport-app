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
        <div className="text-[#f1f1f1]!">
            {/* Banner */}
            <div className="mx-auto">
                <div className="relative home_banner">
                    <img
                        className="tablet:hidden w-full z-[-1]"
                        src="/assets/images/background/home_banner_mobile.png"
                    />
                    <img
                        className="hidden tablet:block desktop:hidden w-full z-[-1]"
                        src="/assets/images/background/home_banner_tablet.png"
                    />
                    <img
                        className="hidden desktop:block w-full z-[-1]"
                        src="/assets/images/background/home_banner_pc.png"
                    />
                    <div className="flex flex-col justify-between gap-y-5 max-desktop:items-center absolute bottom-0 desktop:bottom-1/2 left-1/2 desktop:left-[10%] -translate-x-1/2 desktop:translate-x-0 desktop:translate-y-1/2">
                        <div>
                            <div className="relative">
                                <p className="text-gradient-banner font-russo-one text-[100px] max-desktop:text-[70px] leading-[80px] max-desktop:leading-[70px] max-desktop:text-center">
                                    POLY
                                    <br />
                                    SPORT
                                </p>
                                <p className="absolute text-[#E40FAC] left-0 max-desktop:left-1/2 max-desktop:-translate-x-1/2 top-[2px] z-[-1] font-russo-one text-[100px] max-desktop:text-[70px] leading-[80px] max-desktop:leading-[70px] max-desktop:text-center">
                                    POLY
                                    <br />
                                    SPORT
                                </p>
                            </div>
                            <p className="font-russo-one text-[40px] max-desktop:text-[35px] leading-[50px] max-desktop:text-center text-[#f1f1f1]">
                                FOOTBALL
                                <br />
                                CARD GAME
                            </p>
                        </div>
                        <Link
                            href="/game"
                            className="text-center desktop:text-start"
                        >
                            <Button
                                text="PLAY GAME"
                                className="w-[318px] tablet:w-[389px] text-[20px]"
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
            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px]">
                <div>
                    <p className="font-russo-one text-[60px] max-sm:text-[30px] text-center text-[#f1f1f1]">
                        About Polysport
                    </p>
                    <div className="flex justify-evenly items-center gap-x-20 gap-y-5 max-tablet:flex-col mt-10 max-sm:mt-5">
                        <img
                            className="tablet:max-w-[50%] desktop:max-sm:w-[70%]"
                            src="/assets/images/avt_about_v2.png"
                        />
                        <div className="w-full">
                            <div className="flex gap-x-[10px]">
                                <div className="h-5 aspect-square">
                                    <img src="/assets/diamond.svg" />
                                </div>
                                <p className="text-[#C6C6C6] text-[12px] tablet:text-[18px] desktop:text-[16px] mb-[10px]">
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
                                <p className="text-[#C6C6C6] text-[12px] tablet:text-[18px] desktop:text-[16px] mb-[10px]">
                                    Polysport is a game, first and foremost, not
                                    an investment vehicle, and a game that is
                                    still in development.
                                </p>
                            </div>
                            <div className="text-center tablet:text-left">
                                <Link
                                    href="https://polysport.gitbook.io/polysport"
                                    target="_blank"
                                >
                                    <Button
                                        text="Document"
                                        className="w-[231px] tablet:w[288px] desktop:w-[206px] text-[20px] tablet:text-[40px] desktop:text-[16px]"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product */}
            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px]">
                <div>
                    <div>
                        <p className="text-[60px] max-sm:text-[30px] text-center font-russo-one text-[#f1f1f1]">
                            The Products
                        </p>
                    </div>
                    <div className="text-[#f1f1f1] mt-10 max-sm:mt-5 grid grid-cols-2 gap-10 max-sm:gap-5 max-desktop:grid-cols-1 place-items-center overflow-auto">
                        <div className="relative grid place-items-center max-w-[650px] min-h-[300px] max-sm:min-h-[250px] border-btn">
                            <div className="flex flex-col p-10 pb-5 max-sm:p-5">
                                <div className="flex items-center gap-x-[30px] max-sm:gap-x-4">
                                    <img
                                        className="max-sm:h-[80px] max-tablet:h-[130px] aspect-square"
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
                                        className="max-sm:h-[80px] max-tablet:h-[130px] aspect-square"
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
                                        className="max-sm:h-[80px] max-tablet:h-[130px] aspect-square"
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
                                        className="max-sm:h-[80px] max-tablet:h-[130px] aspect-square"
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

            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px]">
                <div className="">
                    <div className="">
                        <p className="text-[60px] max-sm:text-[30px] text-center font-russo-one text-[#f1f1f1]">
                            How to play?
                        </p>
                    </div>
                    <div className="mt-10 max-sm:mt-5 text-[#f1f1f1]">
                        <div className="grid grid-cols-4 tablet:grid-cols-6  desktop:grid-cols-5 gap-[30px] max-desktop:gap-4 tablet:pb-20">
                            {howToPlays.map((s, idx) => (
                                <div
                                    key={idx}
                                    className={clsx(
                                        "col-span-2 desktop:col-span-1 relative border border-white/40 rounded-[18px] w-full desktop:min-w-[220px] desktop:h-[330px]",
                                        {
                                            "max-tablet:col-start-2":
                                                idx == howToPlays.length - 1,
                                            "tablet:col-start-2 desktop:col-start-4":
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
                                    <div className="mt-4 desktop:mt-8 px-3">
                                        <p className="text-[16px] desktop:text-[20px] font-semibold">
                                            Step {idx + 1}
                                        </p>
                                        <p className="text-[9px] mt-0.5 desktop:mt-3">
                                            {s}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="relative border-btn mt-10 max-sm:mt-[115px]">
                            <div className="p-10 max-sm:p-5 flex items-center gap-10 desktop:gap-x-20 max-tablet:flex-col max-tablet:justify-center">
                                <div className="absolute left-0 right-0 tablet:left-[-15%] tablet:right-[40%] desktop:left-[-5%] desktop:right-[50%] top-0 tablet:top-[50%] -translate-y-[30%] tablet:-translate-y-[60%] desktop:-translate-y-[50%]">
                                    <div className="w-full aspect-square  relative ">
                                        <Image
                                            src="/assets/boxes.png"
                                            alt="boxes"
                                            fill
                                            sizes="any"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 pt-[calc(66%)] tablet:pt-0 tablet:pl-[50%]">
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
                                        className="text-center desktop:text-start"
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

            {/* <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px]">
        <div className="flex items-center flex-wrap max-desktop:flex-col">
          <div className="flex-1">
            <p className="font-russo-one text-[100px] max-desktop:text-[80px] max-sm:text-[30px] max-desktop:text-[60px]">
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
            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px] text-[#f1f1f1]">
                <p className="text-[60px] max-sm:text-[30px] font-russo-one text-center text-[#f1f1f1]">
                    Polysport Games
                </p>
                <div className="flex gap-x-20 justify-between mt-10 max-sm:mt-5 max-tablet:flex-col gap-y-10">
                    <div>
                        <div className="w-full relative rounded-[15px] overflow-hidden">
                            <img
                                className="w-full aspect-[3/2]"
                                src="/assets/images/play-now2.png"
                            />
                            <div className="px-4 py-2 sm:pb-8 backdrop-blur-md absolute bottom-0 left-0 w-full">
                                <p className="text-[16px] tablet:text-[24px] font-semibold">
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
                                className="flex-1 text-center desktop:text-start"
                            >
                                <Button
                                    text="See Tutorial"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </Link>
                            <Link
                                href="/game"
                                className="flex-1 text-center desktop:text-start"
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
                                className="flex-1 text-center desktop:text-start"
                            >
                                <Button
                                    text="See Tutorial"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </Link>
                            <div className="flex-1 text-center desktop:text-start">
                                <Button
                                    text="Coming Soon"
                                    className="bg_btn_normal w-full text-[16px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px] text-[#f1f1f1]">
                <p className="text-[60px] max-sm:text-[30px] font-russo-one text-center text-[#f1f1f1]">
                    Advisors
                </p>

                <div className="flex items-center justify-center mt-4">
                    <Link href="https://gotbit.io/" target="_blank">
                        <img
                            src="/advisors/gotbit.png"
                            alt="gotbit"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px] text-[#f1f1f1]">
                <p className="text-[60px] max-sm:text-[30px] font-russo-one text-center text-[#f1f1f1]">
                    Partners
                </p>

                <div className="flex items-center justify-center mt-4 gap-x-10 gap-y-4 flex-wrap">
                    <Link href="https://starkfinance.co/" target="_blank">
                        <img
                            src="/partners/starkfinance.png"
                            alt="starkfinance"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>
                    <Link
                        href="https://app.galxe.com/Polysport"
                        target="_blank"
                    >
                        <img
                            src="/partners/galxe.png"
                            alt="galxe"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>

                    <Link
                        href="https://www.coingecko.com/en/coins/polysport-finance"
                        target="_blank"
                    >
                        <img
                            src="/partners/coingecko.png"
                            alt="coingecko"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>
                    <Link href="https://www.pinksale.finance/" target="_blank">
                        <img
                            src="/partners/pinksale.png"
                            alt="pinksale"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>
                    <Link href="https://www.dexview.com/" target="_blank">
                        <img
                            src="/partners/dexview.png"
                            alt="dexview"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>
                </div>
            </div>

            <div className="max-w-[1280px] mx-auto px-2 tablet:px-10 mt-20 max-sm:mt-[60px] text-[#f1f1f1]">
                <p className="text-[60px] max-sm:text-[30px] font-russo-one text-center text-[#f1f1f1]">
                    Audits
                </p>

                <div className="flex flex-col tablet:flex-row items-center justify-center mt-4 gap-x-10 gap-y-4">
                    <Link
                        href="https://coinsult.net/projects/polysport"
                        target="_blank"
                    >
                        <img
                            src="/audits/coinsult.png"
                            alt="coinsult"
                            className="h-[60px] tablet:h-[82px] w-auto"
                        />
                    </Link>

                    <Link
                        href="https://www.verichains.io/?search=polysport"
                        target="_blank"
                    >
                        {/* <div className="w-[400px] h-[82px]  relative "> */}
                        <img
                            src="/audits/verichains.png"
                            alt="verichains"
                            className="h-[80px] tablet:h-[100px] w-auto"
                        />
                        {/* </div> */}
                    </Link>
                </div>
            </div>
        </div>
    );
}
