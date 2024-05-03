"use client";

import Button from "@/components/Button";
import { GAME_API, GRADE, IS_PROD } from "@/configs";
import { faucet, mintNft } from "@/services";
import "@/styles/mint.css";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useChainId, useSigner } from "wagmi";

const Box = ({
    name,
    icon,
    pls,
    grade,
}: {
    name: string;
    icon: string;
    pls: string | number;
    grade: GRADE;
}) => {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    const { openConnectModal } = useConnectModal();

    const [amount, setAmount] = useState<string>("1");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleMint = useCallback(async () => {
        try {
            if (submitting) return;
            if (!signer || !address) return openConnectModal?.();
            if (!amount || isNaN(+amount))
                return toast.warn("Invalid mint amount");
            setSubmitting(true);
            // setGradeSubmitting(grade);
            let tx = await mintNft(chainId, address, signer!, grade, +amount);
            // await fetch(`${GAME_API}/directProcessMintedNft?txHash=${tx.txHash}`);
            setSubmitting(false);

            toast.success("Mint success");
        } catch (error: any) {
            setSubmitting(false);
            toast.error(
                error?.error?.data?.message ||
                    error?.reason ||
                    error?.data?.message ||
                    error?.message ||
                    error
            );
        }
    }, [chainId, address, amount, signer, openConnectModal]);

    return (
        <div className="relative cursor-pointer w-[250px] bg-gradient-to-t from-white/10 to-white/5 rounded-[15px]">
            {/* <img class="z-[1] absolute top-0 left-0" src="/assets/images/nft-wrapper.png" /> */}
            <div className="relative z-[2] px-4 py-[10px] flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center shadow-box-mint rounded-2xl">
                    <img src={icon} alt="box" />
                </div>
                <div>
                    <p className="text-[18px] font-semibold text-center text-stroke">
                        {name} Box
                    </p>
                    <p className="text-[18px] font-semibold text-center">
                        {pls} PLS
                    </p>
                </div>

                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={clsx(
                        "max-w-[160px] text-center border border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] rounded-2xl p-2 leading-tight focus:outline-none focus:bg-[#0D0E12]"
                    )}
                    type="text"
                    placeholder="Enter amount"
                />

                <Button
                    handler={handleMint}
                    loading={submitting}
                    enable={true}
                    text="Mint"
                    className={clsx(
                        "text-[16px] tablet:text-[16px] w-[160px] !pt-[51px]  "
                    )}
                />
            </div>
        </div>
    );
};

export default function MintPage() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    const { openConnectModal } = useConnectModal();

    const [isFaucet, setIsFaucet] = useState<boolean>(false);

    const handleFaucet = useCallback(async () => {
        try {
            if (isFaucet) return;
            if (!signer || !address) return openConnectModal?.();
            setIsFaucet(true);
            let tx = await faucet(chainId, signer!, address);
            console.log("🚀 ~ file: page.tsx:68 ~ handleFaucet ~ tx:", tx);
            // await fetch(`${GAME_API}/directProcessMintedNft?txHash=${tx.txHash}`);
            setIsFaucet(false);
            toast.success("Faucet success");
        } catch (error: any) {
            console.log(
                "🚀 ~ file: page.tsx:72 ~ handleFaucet ~ error:",
                error
            );
            setIsFaucet(false);
            toast.error(
                error?.error?.data?.message ||
                    error?.reason ||
                    error?.data?.message ||
                    error?.message ||
                    error
            );
        }
    }, [chainId, address, signer, openConnectModal]);

    return (
        <div className="flex flex-col  justify-center items-center desktop:px-32 mobile:px-4 mobile:pb-8 desktop:pb-10 relative overflow-hidden desktop:pt-36 mobile:pt-32 gap-8 text-white">
            <div className="absolute top-0 left-0 opacity-10 -z-10">
                <img src="/assets/bg-1.svg" alt="" />
            </div>
            <div className="absolute bottom-0 right-0 opacity-10 -z-10 rotate-180">
                <img src="/assets/bg-1.svg" alt="" />
            </div>
            <div className="max-w-[1280px] max-sm:w-full mx-auto px-2">
                <img
                    className="banner-mint object-cover w-full"
                    src="/assets/images/banner-mint-page.png"
                />
            </div>
            <div>
                <p className="sm:text-center font-medium text-[18px] max-sm:text-[12px] max-sm:text-center">
                    There are 3 types of Boxes with 3 different prices from 100
                    PLS to 300 PLS to mint NFTs with different rarities as shown
                    in the table below
                </p>
                <p className="sm:text-center font-medium text-[18px] max-sm:text-[12px] max-sm:text-center">
                    (Use PLS to Mint NFTs on the Polygon network according to
                    each type of Box.)
                </p>
            </div>

            <div className="flex gap-[20px] max-tablet:gap-[10px] flex-wrap justify-center">
                <Box
                    name="Bonze"
                    icon="/assets/box/3.gif"
                    pls="100"
                    grade={GRADE.BRONZE}
                />
                <Box
                    name="Silver"
                    icon="/assets/box/2.gif"
                    pls="200"
                    grade={GRADE.SILVER}
                />
                <Box
                    name="Gold"
                    icon="/assets/box/1.gif"
                    pls="300"
                    grade={GRADE.GOLD}
                />
            </div>
        </div>
    );
}
