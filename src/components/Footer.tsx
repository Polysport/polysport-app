import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-[#131313] text-[#f1f1f1]">
            <div className="max-w-[1280px] mx-auto px-[22px] py-[49px]  grid grid-cols-1 tablet:grid-cols-3 desktop:grid-cols-4 gap-y-[24px] tablet:gap-x-[32px] desktop:gap-x-[40px]">
                <div className="flex flex-col gap-y-[24px]">
                    <div className="flex items-center gap-1">
                        <div className="w-[48px] h-[48px] relative">
                            <Image
                                src="/assets/logo.png"
                                alt="logo"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div className="italic font-extrabold text-[20px] text-slate-400">
                            POLYSPORT
                        </div>
                    </div>

                    <div className="opacity-70">
                        Polysport is a digital flipping card game that uses
                        blockchain technology. Fusion of Polygon, gaming, and
                        offering economic incentives through play-to-earn
                        models.
                    </div>
                </div>

                <div className="tablet:hidden flex flex-col text-[20px]">
                    <Link className="russo-one-font" href="/">
                        Home
                    </Link>
                    <Link className="russo-one-font" href="/marketplace">
                        Marketplace
                    </Link>
                    <Link className="russo-one-font" href="/game">
                        Game
                    </Link>
                    <Link
                        className="russo-one-font"
                        href="https://polysport.gitbook.io/polysport/"
                        target="_blank"
                    >
                        Document
                    </Link>
                    <Link
                        className="russo-one-font"
                        href="https://polysport.gitbook.io/polysport/development/branding"
                        target="_blank"
                    >
                        Brand Kit
                    </Link>
                    <Link
                        className="russo-one-font"
                        href="https://polysport.gitbook.io/polysport/development/contact-us"
                        target="_blank"
                    >
                        Contract Us
                    </Link>
                </div>

                <div className="tablet:col-span-2 desktop:col-span-3 grid tablet:grid-cols-2 desktop:grid-cols-3">
                    <div className="hidden tablet:flex flex-col text-[20px]">
                        <Link className="russo-one-font" href="/">
                            Home
                        </Link>
                        <Link className="russo-one-font" href="/marketplace">
                            Marketplace
                        </Link>
                        <Link className="russo-one-font" href="/game">
                            Game
                        </Link>
                    </div>
                    <div className="hidden tablet:flex flex-col text-[20px]">
                        <Link
                            className="russo-one-font"
                            href="https://polysport.gitbook.io/polysport/"
                            target="_blank"
                        >
                            Document
                        </Link>
                        <Link
                            className="russo-one-font"
                            href="https://polysport.gitbook.io/polysport/development/branding"
                            target="_blank"
                        >
                            Brand Kit
                        </Link>
                        <Link
                            className="russo-one-font"
                            href="https://polysport.gitbook.io/polysport/development/contact-us"
                            target="_blank"
                        >
                            Contract Us
                        </Link>
                    </div>

                    <div>
                        <div className="text-[20px] mb-[16px] russo-one-font">
                            Community
                        </div>
                        <div className="flex gap-x-[29px]">
                            <Link
                                href="https://t.me/polysportCN"
                                target="_blank"
                                className="h-[26px] aspect-square relative"
                            >
                                <Image
                                    src="/assets/telegram.svg"
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </Link>
                            <Link
                                href="https://twitter.com/Polysportgame"
                                target="_blank"
                                className="h-[26px] aspect-square relative"
                            >
                                <Image
                                    src="/assets/X.svg"
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </Link>

                            <Link
                                href="https://discord.com/invite/N4k8UNySPc"
                                target="_blank"
                                className="h-[26px] aspect-square relative"
                            >
                                <Image
                                    src="/assets/discord.svg"
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </Link>
                            <Link
                                href="https://medium.com/@polysport.game"
                                target="_blank"
                                className="h-[26px] aspect-square relative"
                            >
                                <Image
                                    src="/assets/medium.svg"
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </Link>

                            <Link
                                href="https://github.com/Polysport"
                                target="_blank"
                                className="h-[26px] aspect-square relative"
                            >
                                <Image
                                    src="/assets/github.svg"
                                    alt="icon"
                                    fill
                                    sizes="any"
                                />
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="tablet:col-span-3 desktop:col-span-4 text-[12px] tablet:text-[16px] text-center opacity-70 font-medium">
                    {new Date().getFullYear()} © Copyright POLYSPORT. All Rights
                    Reserved
                </p>
            </div>
        </div>
    );
}
