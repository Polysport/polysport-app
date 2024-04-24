"use client";

import { GAME_API } from "@/configs";
import { ChainId } from "@/configs/type";
import { getTokenBalance } from "@/services";
import { truncatedAddress } from "@/utils/helper/address";
import { numberWithCommas } from "@/utils/helper/number";
import axios from "axios";
import clsx from "clsx";
import { ethers } from "ethers";
import { useState } from "react";
import useSWRImmutable from "swr/immutable";
import { Address } from "wagmi";

const TABS = ["Ranking NFT", "Ranking Winner"];

type IUser = {
    id: string;
    accMinted: string;
    accRewarded: string;
};

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const {
        data,
        isLoading: isLoadingUser,
        mutate: mutateStats,
    } = useSWRImmutable<{
        topNft: IUser[];
        topRewarded: IUser[];
    }>(
        ["leader"],
        async () => {
            const [topNft, topRewarded] = await Promise.all([
                axios.get(`${GAME_API}/leader-board/nft`),
                axios.get(`${GAME_API}/leader-board/rewarded`),
            ]);
            console.log(topNft.data, topRewarded.data);
            return {
                topNft: topNft.data,
                topRewarded: topRewarded.data,
            };
        },
        {
            revalidateOnMount: true,
        }
    );

    console.log(data);

    return (
        <section className="flex flex-col items-center justify-center gap-2">
            <ul className="w-full flex tablet:hidden gap-0 justify-between tablet:justify-start tablet:gap-4 border-b-[0.5px] border-b-[#6b6b6b] font-bold">
                {TABS.map((t, idx) => (
                    <li
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={clsx(
                            "px-4 py-2 font-bold cursor-pointer hover:border-b hover:text-[#F1F1F1]",
                            {
                                "text-[#F1F1F1] border-b": idx === activeTab,
                            }
                        )}
                    >
                        {t}
                    </li>
                ))}
            </ul>
            {activeTab === 0 && (
                <div className="block tablet:hidden w-full bg-gradient-to-t from-white/10 to-white/5">
                    <div className="w-full border-[0.5px] border-[#777777]">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-6 p-4 border-b-[0.5px] border-b-[#777777]"
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress(
                                        data?.topNft[idx]?.id ??
                                            "0x0000000000000000000"
                                    )}
                                </div>
                                <div className="col-span-3 text-right">
                                    {numberWithCommas(
                                        ethers.utils.formatEther(
                                            data?.topRewarded[idx]?.accMinted ??
                                                "0"
                                        )
                                    )}{" "}
                                    PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 1 && (
                <div className="block tablet:hidden w-full bg-gradient-to-t from-white/10 to-white/5">
                    <div className="w-full border-[0.5px] border-[#777777]">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-6 p-4 border-b-[0.5px] border-b-[#777777]"
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress(
                                        data?.topRewarded[idx]?.id ??
                                            "0x0000000000000000000"
                                    )}
                                </div>
                                <div className="col-span-3 text-right">
                                    {numberWithCommas(
                                        ethers.utils.formatEther(
                                            data?.topRewarded[idx]
                                                ?.accRewarded ?? "0"
                                        )
                                    )}{" "}
                                    PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="hidden tablet:flex gap-8 w-full max-w-[800px]">
                <div className="hidden tablet:block w-full">
                    <div className="text-[#F1F1F1] font-bold text-[18px] text-center pb-2">
                        Ranking NFT
                    </div>
                    <div className="w-full bg-gradient-to-t from-white/10 to-white/5 border-[0.5px] border-[#777777]">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-6 p-4 border-b-[0.5px] border-b-[#777777]"
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress(
                                        data?.topNft[idx]?.id ??
                                            "0x0000000000000000000"
                                    )}
                                </div>
                                <div className="col-span-3 text-right">
                                    {numberWithCommas(
                                        ethers.utils.formatEther(
                                            data?.topRewarded[idx]?.accMinted ??
                                                "0"
                                        )
                                    )}{" "}
                                    PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden tablet:block w-full">
                    <div className="text-[#F1F1F1] font-bold text-[18px] text-center pb-2">
                        Ranking Winner
                    </div>
                    <div className="w-full bg-gradient-to-t from-white/10 to-white/5 border-[0.5px] border-[#777777]">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className="grid grid-cols-6 p-4 border-b-[0.5px] border-b-[#777777]"
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress(
                                        data?.topRewarded[idx]?.id ??
                                            "0x0000000000000000000"
                                    )}
                                </div>
                                <div className="col-span-3 text-right">
                                    {numberWithCommas(
                                        ethers.utils.formatEther(
                                            data?.topRewarded[idx]
                                                ?.accRewarded ?? "0"
                                        )
                                    )}{" "}
                                    PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <div className="overflow-x-auto max-w-[400px]">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Blue</td>
                        </tr>
                    </tbody>
                </table>
            </div> */}
        </section>
    );
}
