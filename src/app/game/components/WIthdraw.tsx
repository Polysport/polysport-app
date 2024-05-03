"use client";
import Button from "@/components/Button";
import { GAME_API } from "@/configs";
import { ChainId } from "@/configs/type";
import { burnNft } from "@/services";
import {
    EWithdrawOrder,
    claim,
    createWithdraw,
    decodeWithdrawEvent,
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

const afterFee = (orderType: number) => {
    switch (orderType) {
        case 0:
            return 65;
        case 1:
            return 80;
        default:
            return 100;
    }
};

type IWithdraw = {
    id: number;
    amount: string;
    claimed: boolean;
    orderType: number;
    withdrawId: number;
    claimTime: number;
};

const WithdrawItem = ({
    idx,
    withdraw,
    handleClaimed,
}: {
    idx: number;
    withdraw: IWithdraw;
    handleClaimed: any;
}) => {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const { openConnectModal } = useConnectModal();

    const [claiming, setClaiming] = useState<boolean>(false);

    const handleClaim = useCallback(
        async (orderId: number) => {
            if (!signer) return openConnectModal?.();
            // if (!selectedNftBurn || !userStats) return;

            try {
                if (claiming) return;
                setClaiming(true);

                if (!signer) return openConnectModal?.();

                const tx = await claim(chainId, signer, orderId);

                handleClaimed(idx, withdraw);

                setClaiming(false);
                toast.success("Create withdraw success");
            } catch (error: any) {
                setClaiming(false);
                toast.error(
                    error?.error?.data?.message ||
                        error?.reason ||
                        error?.data?.message ||
                        error?.message ||
                        error
                );
            }
        },
        [
            chainId,
            address,
            signer,
            openConnectModal,
            idx,
            withdraw,
            handleClaimed,
        ]
    );

    return (
        <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2 border-b border-b-[#2D313E] py-2 place-content-center">
            <div className="text-[#F1F1F1] text-[14px] flex flex-col justify-center">
                {dayjs
                    .utc(withdraw.claimTime * 1000)
                    .format("MMM DD YYYY HH:mm")}{" "}
                UTC
            </div>
            <div className="text-[#F1F1F1] text-right flex flex-col justify-center">
                {numberWithCommas(
                    (+withdraw.amount * afterFee(withdraw.orderType)) / 100
                )}{" "}
                PLS
            </div>
            <div className="col-span-2 tablet:col-span-1 flex justify-center tablet:justify-end">
                <Button
                    handler={() => handleClaim(withdraw.withdrawId)}
                    loading={claiming}
                    enable={!withdraw.claimed}
                    text={!withdraw.claimed ? "Claim" : "Claimed"}
                    className={clsx("text-[16px] !pt-[30px]")}
                />
            </div>
        </div>
    );
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

    const getClaimTime = (orderType: number) => {
        const now = Math.floor(Date.now() / 1000);
        let time = 0;
        if (orderType === 1) {
            time = 86400;
        } else if (orderType === 2) {
            time = 259200;
        }

        return now + time;
    };

    const handleClaimed = useCallback(
        (idx: number, withdraw: IWithdraw) => {
            if (!userStats) return;

            if (typeof idx !== "undefined") {
                mutateStats({
                    ...userStats,
                    withdraws: [
                        ...userStats.withdraws.slice(0, idx),
                        {
                            ...withdraw,
                            claimed: true,
                        },
                        ...userStats.withdraws.slice(
                            idx + 1,
                            userStats.withdraws.length
                        ),
                    ],
                });
            }
        },
        [userStats, mutateStats]
    );

    const handleWithdraw = useCallback(async () => {
        if (!signer) return openConnectModal?.();

        try {
            if (submitting) return;
            setSubmitting(true);
            if (!signer) return openConnectModal?.();
            if (!userStats?.rewarded || +userStats.rewarded <= 0)
                return toast.error("You don't have any reward");
            const parsedAmount = ethers.utils.parseUnits(amount, 18);
            const tx = await createWithdraw(
                chainId,
                signer,
                orderType,
                parsedAmount
            );

            const withdrawLog = tx.logs.find(
                (log: any) =>
                    log.topics[0] ===
                    "0x87b7a9691174b1e582a55e4c8632edfdf49abf8120c0abb8a9c69e08f3d3ac82"
            )!;
            const event = decodeWithdrawEvent(chainId, withdrawLog);

            const block = await signer.provider?.getBlock(
                withdrawLog.blockNumber
            );

            mutateStats({
                ...userStats,
                withdraws: [
                    {
                        id: Math.random(),
                        amount: amount,
                        claimed: orderType === 0 ? true : false,
                        orderType: orderType,
                        withdrawId: event.orderId,
                        claimTime: block?.timestamp ?? getClaimTime(orderType),
                    },
                    ...userStats.withdraws,
                ],
                rewarded: ethers.utils.formatUnits(
                    ethers.utils
                        .parseUnits(userStats.rewarded, 18)
                        .sub(parsedAmount)
                        .toString()
                ),
            });

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
    }, [
        chainId,
        address,
        signer,
        openConnectModal,
        orderType,
        amount,
        userStats,
    ]);

    return (
        <section className="grid desktop:grid-cols-2 justify-stretch gap-x-2 gap-y-4 bg-[#1A1C24] p-4 border border-[#2D313E] rounded-2xl">
            <div className="grid gap-x-2 gap-y-4">
                <div className="tablet:row-span-2">
                    <div className="relative">
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className={clsx(
                                "border border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]"
                            )}
                            type="text"
                            placeholder="Enter amount"
                        />
                        <div
                            onClick={() => setAmount(userStats?.rewarded ?? "")}
                            className="cursor-pointer text-[14px] bg-[#F1F1F1] rounded-lg text-[#0D0E12] p-1 font-bold absolute right-2 top-1/2 -translate-y-1/2"
                        >
                            MAX
                        </div>
                    </div>

                    <div className="flex flex-col pt-2">
                        <div className="flex items-center justify-between">
                            <div className="text-[14px] text-[#C6C6C6]">
                                PLS reward:
                            </div>
                            <div className="font-bold">
                                {numberWithCommas(userStats?.rewarded)} PLS
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-[14px] text-[#C6C6C6]">
                                Date received:
                            </div>
                            <div className="font-semibold text-[14px]">
                                {dayjs
                                    .utc(getClaimTime(orderType) * 1000)
                                    .format("MMM DD YYYY HH:mm")}{" "}
                                UTC
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-[14px] text-[#C6C6C6]">
                                Est. PLS received:
                            </div>
                            <div className="font-bold text-[18px]">
                                {numberWithCommas(
                                    ethers.utils
                                        .formatEther(
                                            (BigInt(
                                                ethers.utils
                                                    .parseEther(
                                                        amount.toString() || "0"
                                                    )
                                                    .toString()
                                            ) *
                                                BigInt(afterFee(orderType))) /
                                                BigInt(100)
                                        )
                                        .toString()
                                )}{" "}
                                PLS
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between tablet:justify-start gap-1">
                        <div
                            className={clsx(
                                "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer flex items-center",
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
                                "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer flex items-center",
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
                                "border border-[#B920ED] rounded-2xl px-2 py-1 cursor-pointer flex items-center",
                                {
                                    "button-play-game":
                                        orderType == EWithdrawOrder.THREE_DAY,
                                }
                            )}
                            onClick={() =>
                                setOrderType(EWithdrawOrder.THREE_DAY)
                            }
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
            </div>
            <div>
                <div className="p-4 border border-[#2D313E] rounded-2xl">
                    <div className="mb-2">
                        There are 3 options to withdraw $PLS to your wallet:
                    </div>
                    <ul className="flex flex-col gap-1">
                        <li>- Withdraw now: 65% amount of $PLS</li>
                        <li>- Withdraw 24: 80% amount of $PLS</li>
                        <li>- Withdraw 72h: 100% amount of $PLS</li>
                    </ul>
                </div>
            </div>

            <div className="p-2 border border-[#2D313E] rounded-2xl desktop:col-span-2">
                <div className="text-[18px] font-bold border-b border-b-[#2D313E] py-2">
                    Withdraw History:
                </div>
                <div className="grid grid-cols-2 tablet:grid-cols-3 gap-2 border-b border-b-[#2D313E] py-2 brightness-75 text-[14px]">
                    <div className="text-[#F1F1F1]">Time</div>
                    <div className="text-[#F1F1F1] text-right">Amount</div>
                    <div className="hidden"></div>
                </div>

                {isLoadingStats ? (
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-8 rounded-2xl bg-[#2D313E]" />
                        <div className="skeleton h-8 rounded-2xl bg-[#2D313E]" />
                        <div className="skeleton h-8 rounded-2xl bg-[#2D313E]" />
                    </div>
                ) : (
                    userStats?.withdraws?.map((w, idx) => (
                        <WithdrawItem
                            key={idx}
                            idx={idx}
                            withdraw={w}
                            handleClaimed={handleClaimed}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
