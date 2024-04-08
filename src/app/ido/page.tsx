"use client";
import Button from "@/components/Button";
import clsx from "clsx";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EPool, POOLS, STATUS, statusToText, timeDiff } from "./utils";
import CountDown from "./components/CountDown";
import Status from "./components/Status";
import { numberWithCommas } from "@/utils/helper/number";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Address, useAccount, useChainId, useSigner } from "wagmi";
import useSWR from "swr";
import { getUSDTBalance } from "@/services";
import { ChainId } from "@/configs/type";
import { claim, commit, getIdoPoolStats, getUserStats } from "@/services/ido";
import { BigNumber, Signer, ethers } from "ethers";
import { toast } from "react-toastify";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { IS_PROD } from "@/configs";
dayjs.extend(utc);

export default function IdoPage() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    const [selectedPool, setSelectedPool] = useState<EPool>(EPool.OG);

    const { data: poolStats } = useSWR(
        ["ido-pool", selectedPool, chainId],
        async ([_, selectedPool, chainId]) => {
            const poolStats = await getIdoPoolStats(chainId, selectedPool);
            return poolStats;
        }
    );

    const { data: userStats, isLoading: loadingUserStats } = useSWR<{
        usdtBalance: string;
        committed: string;
        claimedCount: number;
        isWhitelist: boolean;
    }>(
        ["ido-user", address, chainId, selectedPool],
        async ([_, address, chainId, selectedPool]) => {
            const [usdtBalance, userStats] = await Promise.all([
                getUSDTBalance(chainId as ChainId, address as Address),
                getUserStats(
                    chainId as ChainId,
                    selectedPool as EPool,
                    address as Address
                ),
            ]);

            return {
                usdtBalance,
                ...userStats,
            };
        }
    );

    const [timeStartDiff, setTimeStartDiff] = useState<{
        current: number;
        d: number;
        h: number;
        m: number;
        s: number;
        status: STATUS | undefined;
    }>({
        current: 0,
        d: 0,
        h: 0,
        m: 0,
        s: 0,
        status: undefined,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const time = timeDiff(
                Date.now(),
                (POOLS[selectedPool]?.start ?? 0) * 1000,
                (POOLS[selectedPool]?.end ?? 0) * 1000
            );
            setTimeStartDiff(time);
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedPool]);

    const { openConnectModal } = useConnectModal();

    const [commitAmount, setCommitAmount] = useState("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const handleCommit = useCallback(async () => {
        if (!signer || !address) return openConnectModal?.();
        const now = Math.floor(Date.now() / 1000);

        if (now < POOLS[selectedPool].start)
            return toast.warn("Pool is not started");
        if (now > POOLS[selectedPool].end) return toast.warn("Pool is ended");

        if (!commitAmount || isNaN(+commitAmount))
            return toast.warn("Invalid commit amount");

        const parsedAmount = ethers.utils.parseUnits(
            commitAmount,
            IS_PROD ? 6 : 18
        );
        if (
            parsedAmount
                .add(
                    BigNumber.from(
                        ethers.utils.parseUnits(
                            userStats?.committed ?? "0",
                            IS_PROD ? 6 : 18
                        )
                    )
                )
                .gt(
                    BigNumber.from(
                        ethers.utils.parseUnits(
                            POOLS[selectedPool].max.toString(),
                            IS_PROD ? 6 : 18
                        )
                    )
                )
        )
            return toast.warn(
                `Over max commit. You committed ${numberWithCommas(
                    userStats?.committed
                )} USDT`
            );
        if (parsedAmount.lt(BigNumber.from(POOLS[selectedPool].max)))
            return toast.warn("Not enough min commit");

        try {
            setSubmitting(true);
            await commit(chainId, selectedPool, signer, address, parsedAmount);
            toast.success("Commit success");
            setSubmitting(false);
        } catch (error: any) {
            console.log(
                "🚀 ~ file: page.tsx:108 ~ handleCommit ~ error:",
                error
            );
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
        signer,
        address,
        commitAmount,
        userStats?.committed,
        poolStats?.committed,
        selectedPool,
    ]);

    const handleClaim = useCallback(async () => {
        if (!signer || !address) return openConnectModal?.();

        // if (!!userStats?.claimedCount && userStats?.claimedCount >= POOLS[selectedPool].vestingPercent.length)
        //   return toast.warn("Claim all");

        try {
            setSubmitting(true);
            await claim(chainId, selectedPool, signer);
            toast.success("Claim success");
            setSubmitting(false);
        } catch (error: any) {
            console.log(
                "🚀 ~ file: page.tsx:108 ~ handleCommit ~ error:",
                error
            );
            setSubmitting(false);
            toast.error(
                error?.error?.data?.message ||
                    error?.reason ||
                    error?.data?.message ||
                    error?.message ||
                    error
            );
        }
    }, [chainId, signer, address, userStats?.claimedCount, selectedPool]);

    return (
        <div className="flex px-2 tablet:px-[32px] pt-[80px] tablet:pt-[120px] text-[#f1f1f1]">
            <div className="flex flex-col mx-auto w-full !max-w-[1080px] gap-6 mt-[50px]">
                {/* <div className="flex justify-end gap-x-2">
                    {[EPool.OG].map((type) => (
                        <Button
                            key={type}
                            handler={() => setSelectedPool(type)}
                            text={`${POOLS[type].name} POOL`}
                            className={clsx(
                                "text-[12px] tablet:text-[16px] max-w-[147px] tablet:max-w-[205px] !pt-[51px] hover:brightness-100",
                                {
                                    "brightness-50": type != selectedPool,
                                }
                            )}
                        />
                    ))}
                </div> */}

                <div className="p-2 desktop:p-6 border rounded-3xl border-[#ffffff66] grid tablet:grid-cols-2 desktop:grid-cols-3 bg-[#1A1C24] gap-2 desktop:gap-6">
                    <div className="tablet:col-span-2 desktop:col-span-1 flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 desktop:p-6">
                        <div className="w-[60px] h-[60px] relative">
                            <Image
                                src="/assets/images/ido/ido.svg"
                                alt="ido"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>
                            <div className="text-[24px] font-medium">
                                Polysport
                            </div>
                            <div className="text-[#C6C6C6]">PLS</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 desktop:p-6">
                        <div className="w-[60px] h-[60px] relative">
                            <Image
                                src="/assets/images/ido/user.svg"
                                alt="user"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>
                            <div className="text-[24px] font-medium">
                                {numberWithCommas(poolStats?.contributors)}
                            </div>
                            <div className="text-[#C6C6C6]">
                                Total Contributor
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 desktop:p-6">
                        <div className="w-[60px] h-[60px] relative">
                            <Image
                                src="/assets/images/ido/supply.svg"
                                alt="supply"
                                fill
                                sizes="any"
                            />
                        </div>
                        <div>
                            <div className="text-[24px] font-medium">
                                {numberWithCommas(POOLS[selectedPool].supply)}
                            </div>
                            <div className="text-[#C6C6C6]">PLS</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border rounded-3xl border-[#ffffff66] bg-[#1A1C24] gap-6">
                    <div className="grid grid-cols-1 tablet:grid-cols-2 gap-2">
                        <div className="flex items-center gap-3">
                            <div className="min-w-[66px] h-[66px] relative">
                                <Image
                                    src="/assets/logo.png"
                                    alt="logo"
                                    fill
                                    sizes="any"
                                />
                            </div>

                            <div className="flex flex-col justify-between">
                                <div className="text-[24px] font-bold">
                                    Polysport
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 px-1.5 py-1 bg-[#ffffff26] rounded-2xl ">
                                        <div className="w-[18px] h-[18px] relative">
                                            <Image
                                                src="/assets/images/ido/polygon.png"
                                                alt="logo"
                                                fill
                                                sizes="any"
                                            />
                                        </div>
                                        <div>Polygon</div>
                                    </div>

                                    {/* <div className="bg-[#A23EF0] rounded-2xl text-[12px] px-1.5 py-1">
                    PRIVATE
                  </div> */}

                                    <Status
                                        start={POOLS[selectedPool].start}
                                        end={POOLS[selectedPool].end}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            {/* {!!launchpad ? (
                <div className="font-bold text-[16px] tablet:text-[20px] desktop:text-[24px] text-[#F1F1F1] pb-3 border-b border-b-[#2D313E]">
                  Launchpad {statusToText(timeStartDiff.status)}
                </div>
              ) : (
                <div className="skeleton w-[80px] h-[19px] tablet:h-[23px] desktop:h-[28px] bg-[#2D313E]" />
              )} */}

                            <div className="text-[14px] text-[#C6C6C6]">
                                Sale {statusToText(timeStartDiff.status)}
                            </div>

                            <div className="flex justify-between tablet:justify-start gap-0 tablet:gap-3 desktop:gap-8">
                                <CountDown
                                    start={POOLS[selectedPool].start}
                                    end={POOLS[selectedPool].end}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 desktop:grid-cols-2 mt-6 gap-6">
                        <div className="flex flex-col gap-[20px]">
                            <div className="grid tablet:hidden grid-cols-1 gap-2 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Total raise
                                    </div>
                                    <div className="font-medium">
                                        {numberWithCommas(
                                            POOLS[selectedPool].raise
                                        )}{" "}
                                        USDT
                                    </div>
                                </div>
                                <div className="min-h-[1px] border-b border-b-[#2D313E]" />
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Total sale
                                    </div>
                                    <div className="font-medium">
                                        {numberWithCommas(
                                            POOLS[selectedPool].sale
                                        )}{" "}
                                        PLS
                                    </div>
                                </div>
                                <div className="min-h-[1px] border-b border-b-[#2D313E]" />
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Rate
                                    </div>
                                    <div className="font-medium">
                                        1 PLS ={" "}
                                        {numberWithCommas(
                                            POOLS[selectedPool].rate
                                        )}{" "}
                                        USDT
                                    </div>
                                </div>
                            </div>
                            <div className="hidden tablet:flex items-center justify-between bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Total raise
                                    </div>
                                    <div className="font-medium">
                                        {numberWithCommas(
                                            POOLS[selectedPool].raise
                                        )}{" "}
                                        USDT
                                    </div>
                                </div>
                                <div className="min-h-[49px] border-r border-r-[#2D313E]" />
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Total sale
                                    </div>
                                    <div className="font-medium">
                                        {numberWithCommas(
                                            POOLS[selectedPool].sale
                                        )}{" "}
                                        PLS
                                    </div>
                                </div>
                                <div className="min-h-[49px] border-r border-r-[#2D313E]" />
                                <div>
                                    <div className="text-[14px] text-[#C6C6C6]">
                                        Rate
                                    </div>
                                    <div className="font-medium">
                                        1 PLS ={" "}
                                        {numberWithCommas(
                                            POOLS[selectedPool].rate
                                        )}{" "}
                                        USDT
                                    </div>
                                </div>
                            </div>

                            {timeStartDiff.status !== STATUS.END && (
                                <>
                                    {loadingUserStats ? (
                                        <div className="skeleton w-full flex-1 rounded-2xl bg-[#2D313E]" />
                                    ) : !userStats?.isWhitelist ? (
                                        <div className="flex-1 text-capital flex items-center justify-center bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                                            <Button
                                                text="YOU ARE NOT ELIGIBLE"
                                                className="bg_btn_normal w-full max-w-[289px] text-[16px]"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-[12px] text-[#C6C6C6]">
                                                        USDT balance:
                                                    </div>
                                                    <div className="text-[12px]">
                                                        {numberWithCommas(
                                                            userStats?.usdtBalance ??
                                                                "0"
                                                        )}{" "}
                                                        USDT
                                                    </div>
                                                </div>
                                                <input
                                                    value={commitAmount}
                                                    onChange={(e) =>
                                                        setCommitAmount(
                                                            e.target.value
                                                        )
                                                    }
                                                    className={clsx(
                                                        "border border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]"
                                                    )}
                                                    type="text"
                                                    placeholder="Enter amount"
                                                />
                                            </div>

                                            <div className="text-center font-medium bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                                                You will receive:{" "}
                                                {numberWithCommas(
                                                    +commitAmount /
                                                        +POOLS[selectedPool]
                                                            .rate
                                                )}{" "}
                                                PLS
                                            </div>

                                            <div className="flex items-center justify-center">
                                                <Button
                                                    handler={handleCommit}
                                                    loading={submitting}
                                                    enable={true}
                                                    text="Buy"
                                                    className={clsx(
                                                        "text-[12px] tablet:text-[16px] w-[206px] !pt-[51px]  "
                                                    )}
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            )}

                            {timeStartDiff.status === STATUS.END && (
                                <>
                                    <div className="grid grid-cols-2  border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
                                        <div className="col-span-2 text-[16px] tablet:text-[20px] desktop:text-[24px] pb-3 border-b border-b-[#2D313E] font-bold text-[#F1F1F1]">
                                            Vesting schedule
                                        </div>
                                        <div className="py-3 border-b border-b-[#2D313E] ">
                                            Time
                                        </div>
                                        <div className="py-3 text-right border-b border-b-[#2D313E] ">
                                            Amount
                                        </div>
                                        {POOLS[selectedPool].vestingPercent.map(
                                            (v, idx) => (
                                                <>
                                                    <div
                                                        className={clsx(
                                                            "py-3 border-b border-b-[#2D313E]",
                                                            timeStartDiff.current >
                                                                (POOLS[
                                                                    selectedPool
                                                                ].end +
                                                                    POOLS[
                                                                        selectedPool
                                                                    ]
                                                                        .vestingTime[
                                                                        idx
                                                                    ]) *
                                                                    1000 &&
                                                                +(
                                                                    userStats?.claimedCount ??
                                                                    0
                                                                ) > idx
                                                                ? "text-[#B920ED]"
                                                                : "text-[#f1f1f166]"
                                                        )}
                                                    >
                                                        {dayjs
                                                            .utc(
                                                                (POOLS[
                                                                    selectedPool
                                                                ].end +
                                                                    POOLS[
                                                                        selectedPool
                                                                    ]
                                                                        .vestingTime[
                                                                        idx
                                                                    ]) *
                                                                    1000
                                                            )
                                                            .format(
                                                                "MMM DD YYYY HH:mm"
                                                            )}{" "}
                                                        UTC
                                                    </div>
                                                    <div
                                                        className={clsx(
                                                            "text-right py-3 border-b border-b-[#2D313E]",
                                                            timeStartDiff.current >
                                                                (POOLS[
                                                                    selectedPool
                                                                ].end +
                                                                    POOLS[
                                                                        selectedPool
                                                                    ]
                                                                        .vestingTime[
                                                                        idx
                                                                    ]) *
                                                                    1000 &&
                                                                +(
                                                                    userStats?.claimedCount ??
                                                                    0
                                                                ) > idx
                                                                ? "text-[#B920ED]"
                                                                : "text-[#f1f1f166]"
                                                        )}
                                                    >
                                                        {numberWithCommas(
                                                            (v *
                                                                +(
                                                                    userStats?.committed ??
                                                                    0
                                                                )) /
                                                                (+POOLS[
                                                                    selectedPool
                                                                ].rate *
                                                                    100)
                                                        )}{" "}
                                                        PLS
                                                    </div>
                                                </>
                                            )
                                        )}
                                    </div>

                                    <div className="flex items-center justify-center">
                                        <Button
                                            handler={handleClaim}
                                            loading={submitting}
                                            enable={true}
                                            text="Claim"
                                            className={clsx(
                                                "text-[12px] tablet:text-[16px] w-[206px] !pt-[51px]  "
                                            )}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
                            <div className="text-[16px] tablet:text-[20px] desktop:text-[24px] pb-3 border-b border-b-[#2D313E] font-bold text-[#F1F1F1]">
                                Launchpad information
                            </div>
                            {/* <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                  Soft Cap
                </div>
                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                  {numberWithCommas(POOLS[selectedPool].soft)} USDT
                </div>
              </div>
              <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                  Hard Cap
                </div>
                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                  {numberWithCommas(POOLS[selectedPool].raise)} USDT
                </div>
              </div> */}
                            <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                    Start time
                                </div>
                                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                    {dayjs
                                        .utc(POOLS[selectedPool].start * 1000)
                                        .format("MMM DD YYYY HH:mm")}{" "}
                                    UTC
                                </div>
                            </div>
                            <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                    End time
                                </div>
                                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                    {dayjs
                                        .utc(POOLS[selectedPool].end * 1000)
                                        .format("MMM DD YYYY HH:mm")}{" "}
                                    UTC
                                </div>
                            </div>

                            {/* <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                  Vesting
                </div>
                {!!launchpad ? (
                  <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                    {POOLS[selectedPool].vestingPercent[0] / 1000}% on TGE
                  </div>
                ) : null}
              </div> */}
                            <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                    Min / Max commit
                                </div>
                                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                    {numberWithCommas(POOLS[selectedPool].min)}{" "}
                                    /{" "}
                                    {numberWithCommas(POOLS[selectedPool].max)}{" "}
                                    USDT
                                </div>
                            </div>

                            <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                    My Committed
                                </div>
                                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                    {numberWithCommas(
                                        userStats?.committed ?? 0
                                    )}{" "}
                                    USDT
                                </div>
                            </div>
                            <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                                <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                    My Allocation
                                </div>
                                <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                    {numberWithCommas(
                                        +(userStats?.committed ?? 0) /
                                            +POOLS[selectedPool].rate
                                    )}{" "}
                                    PLS
                                </div>
                            </div>
                            <div className="mt-3">
                                <div className="flex justify-between">
                                    <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                        Total committed
                                    </div>
                                    <div className="text-[14px] tablet:text-[16px] font-medium text-[#F1F1F1]">
                                        {numberWithCommas(poolStats?.committed)}{" "}
                                        USDT
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    {/* {!!launchpad ? ( */}
                                    <progress
                                        className="progress progress-accent h-[16px] mt-3"
                                        value={
                                            (+(poolStats?.committed ?? "0") /
                                                +POOLS[selectedPool].raise) *
                                            100
                                        }
                                        max="100"
                                    ></progress>
                                    {/* ) : null} */}
                                    <div className="flex justify-between">
                                        <div className="text-[12px] tablet:text-[14px] text-[#C6C6C6]">
                                            Process
                                        </div>
                                        {/* {!!launchpad ? ( */}
                                        <div className="text-[12px] tablet:text-[14px] text-[#F1F1F1]">
                                            {numberWithCommas(
                                                (+(
                                                    poolStats?.committed ?? "0"
                                                ) /
                                                    +POOLS[selectedPool]
                                                        .raise) *
                                                    100
                                            )}
                                            %
                                        </div>
                                        {/* ) : null} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
