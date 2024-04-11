"use client";
import Button from "@/components/Button";
import { EWithdrawOrder } from "@/services/game";
import { numberWithCommas } from "@/utils/helper/number";
import clsx from "clsx";
import { useState } from "react";

export default function Withdraw() {
    const [amount, setAmount] = useState("");
    const [orderType, setOrderType] = useState<EWithdrawOrder>(
        EWithdrawOrder.NOW
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
                            "border border-[#B920ED] rounded-2xl px-2 py-1",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.NOW,
                            }
                        )}
                    >
                        Now (65%)
                    </div>

                    <div
                        className={clsx(
                            "border border-[#B920ED] rounded-2xl px-2 py-1",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.ONE_DAY,
                            }
                        )}
                    >
                        24h (80%)
                    </div>

                    <div
                        className={clsx(
                            "border border-[#B920ED] rounded-2xl px-2 py-1",
                            {
                                "button-play-game":
                                    orderType == EWithdrawOrder.THREE_DAY,
                            }
                        )}
                    >
                        72h (100%)
                    </div>
                </div>
                <div className="flex justify-center">
                    <Button
                        // handler={handleBurnNft}
                        // loading={submitting}
                        // enable={true}
                        text="Withdraw"
                        className={clsx(
                            "text-[16px] tablet:text-[16px] w-[160px] !pt-[51px]  "
                        )}
                    />
                </div>
            </div>
            <div className="p-2 border border-[#2D313E] rounded-2xl">
                <div>There are 3 options to withdraw $PLS to your wallet:</div>
                <ul>
                    <li>Withdraw now: 65% amount of $PLS</li>
                    <li>Withdraw 24: 80% amount of $PLS</li>
                    <li>Withdraw 72h: 100% amount of $PLS</li>
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

                {/* {new Array(4).fill("").map((_, idx) => (
                    <div
                        key={idx}
                        className="grid grid-cols-2 tablet:grid-cols-3 gap-2 border-b border-b-[#2D313E] py-2 place-content-center"
                    >
                        <div className="text-[#F1F1F1] text-[14px] flex flex-col justify-center">
                            2024/04/01 07:00 UTC
                        </div>
                        <div className="text-[#F1F1F1] text-right flex flex-col justify-center">
                            {numberWithCommas(10000)} PLS
                        </div>
                        <div className="col-span-2 tablet:col-span-1 flex justify-center tablet:justify-end">
                            <Button
                                // handler={handleBurnNft}
                                // loading={submitting}
                                enable={false}
                                text="Claim"
                                className={clsx("text-[16px] !pt-[30px]")}
                            />
                        </div>
                    </div>
                ))} */}
            </div>
        </section>
    );
}
