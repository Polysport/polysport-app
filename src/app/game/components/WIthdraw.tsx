"use client";
import Button from "@/components/Button";
import { GAME_API } from "@/configs";
import { ChainId } from "@/configs/type";
import { burnNft } from "@/services";
import {
    EWithdrawOrder,
    claim,
    createWithdraw,
    getUserRewarded,
} from "@/services/game";
import { numberWithCommas } from "@/utils/helper/number";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios from "axios";
import clsx from "clsx";
import { ethers } from "ethers";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useSWRImmutable from "swr/immutable";
import { useChainId, useAccount, useSigner, Address } from "wagmi";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

type IWithdraw = {
    id: number;
    amount: number;
    nftId: number;
    claimed: boolean;
    orderType: number;
    withdrawId: number;
    claimTime: number;
};

export default function Withdraw() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { openConnectModal } = useConnectModal();

    const {
        data: userStats,
        isLoading: isLoadingStats,
        mutate: mutateStats,
    } = useSWRImmutable<{
        rewarded: string;
        withdraws: IWithdraw[];
    }>(["withdraw", chainId, address], async ([_, chainId, address]) => {
        if (!address)
            return {
                rewarded: "0",
                withdraws: [],
            };
        const [stats, _stats] = await Promise.all([
            axios.get(`${GAME_API}/stats?account=${address}`),
            getUserRewarded(chainId as ChainId, address as Address),
        ]);

        return {
            ...stats.data,
            rewarded: _stats.toString(),
        };
    });

    const [amount, setAmount] = useState("");
    const [orderType, setOrderType] = useState<EWithdrawOrder>(
        EWithdrawOrder.NOW
    );
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleWithdraw = useCallback(async () => {
        if (!signer) return openConnectModal?.();
        // if (!selectedNftBurn || !userStats) return;

        try {
            if (submitting) return;
            setSubmitting(true);
            if (!signer) return openConnectModal?.();
            const parsedAmount = ethers.utils.parseUnits(amount, 18);
            const tx = await createWithdraw(
                chainId,
                signer,
                orderType,
                parsedAmount
            );

            // await fetch(`${GAME_API}/directProcessBurnedNft?txHash=${tx.txHash}`);
            // useRootStore.setState({ txHash: tx.txHash });

            // mutateStats({
            //     ...userStats,
            //     numOfFlip: selectedNftBurn.nftId,
            //     cards: [],
            // });

            setSubmitting(false);
            toast.success("Create withdraw success");
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
    }, [chainId, address, signer, openConnectModal, orderType, amount]);

    const handleClaim = useCallback(
        async (orderId: number) => {
            if (!signer) return openConnectModal?.();
            // if (!selectedNftBurn || !userStats) return;

            try {
                if (submitting) return;
                setSubmitting(true);
                if (!signer) return openConnectModal?.();

                const tx = await claim(chainId, signer, orderId);

                // await fetch(`${GAME_API}/directProcessBurnedNft?txHash=${tx.txHash}`);
                // useRootStore.setState({ txHash: tx.txHash });

                // mutateStats({
                //     ...userStats,
                //     numOfFlip: selectedNftBurn.nftId,
                //     cards: [],
                // });

                setSubmitting(false);
                toast.success("Create withdraw success");
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
        },
        [chainId, address, signer, openConnectModal]
    );

    return (
        <section className="grid desktop:grid-cols-2 justify-stretch gap-x-2 gap-y-4 bg-[#1A1C24] p-2 border border-[#2D313E] rounded-2xl">
            <div className="tablet:col-span-">
                <input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={clsx(
                        "border border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]"
                    )}
                    type="text"
                    placeholder="Enter amount"
                />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between tablet:justify-start gap-1">
                    <div
                        className={clsx(
                            "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.NOW,
                            }
                        )}
                        onClick={() => setOrderType(EWithdrawOrder.NOW)}
                    >
                        Now (65%)
                    </div>

                    <div
                        className={clsx(
                            "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.ONE_DAY,
                            }
                        )}
                        onClick={() => setOrderType(EWithdrawOrder.ONE_DAY)}
                    >
                        24h (80%)
                    </div>

                    <div
                        className={clsx(
                            "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.THREE_DAY,
                            }
                        )}
                        onClick={() => setOrderType(EWithdrawOrder.THREE_DAY)}
                    >
                        72h (100%)
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button
                        handler={handleWithdraw}
                        loading={submitting}
                        // enable={true}
                        text="Withdraw"
                        className={clsx(
                            "text-[16px] tablet:text-[16px] w-[160px] !pt-[51px]  "
                        )}
                    />
                </div>
            </div>
            <div className="p-2 border border-[#2D313E] rounded-2xl">
                <div className="mb-2">
                    There are 3 options to withdraw $PLS to your wallet:
                </div>
                <ul className="flex flex-col gap-1">
                    <li>- Withdraw now: 65% amount of $PLS</li>
                    <li>- Withdraw 24: 80% amount of $PLS</li>
                    <li>- Withdraw 72h: 100% amount of $PLS</li>
                </ul>
            </div>

            <div className="p-2 border border-[#2D313E] rounded-2xl">
                <div className="text-[18px] font-bold border-b border-b-[#2D313E] py-2">
                    Withdraw History:
                </div>
                <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2 border-b border-b-[#2D313E] py-2 brightness-75 text-[14px]">
                    <div className="text-[#F1F1F1]">Time</div>
                    <div className="text-[#F1F1F1] text-right">Amount</div>
                    <div className="hidden"></div>
                </div>

                {userStats?.withdraws.map((w, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-2 tablet:grid-cols-3 gap-2 border-b border-b-[#2D313E] py-2 place-content-center"
                    >
                        <div className="text-[#F1F1F1] text-[14px] flex flex-col justify-center">
                            {dayjs
                                .utc(w.claimTime * 1000)
                                .format("MMM DD YYYY HH:mm")}{" "}
                            UTC
                        </div>
                        <div className="text-[#F1F1F1] text-right flex flex-col justify-center">
                            {numberWithCommas(w.amount)} PLS
                        </div>
                        <div className="col-span-2 tablet:col-span-1 flex justify-center tablet:justify-end">
                            <Button
                                handler={() => handleClaim(w.withdrawId)}
                                loading={submitting}
                                enable={!w.claimed}
                                text={!w.claimed ? "Claim" : "Claimed"}
                                className={clsx("text-[16px] !pt-[30px]")}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
