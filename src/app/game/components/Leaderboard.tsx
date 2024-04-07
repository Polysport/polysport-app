"use client";

import { truncatedAddress } from "@/utils/helper/address";
import clsx from "clsx";
import { useState } from "react";

const TABS = ["Ranking NFT", "Ranking Winner"];

export default function Leaderboard() {
    const [activeTab, setActiveTab] = useState<number>(0);

    return (
        <section className="flex flex-col items-center justify-center gap-2">
            <ul className="w-full flex tablet:hidden gap-0 justify-between tablet:justify-start tablet:gap-4 border-b-[0.5px] border-b-[#6b6b6b] font-bold">
                {TABS.map((t, idx) => (
                    <li
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={clsx(
                            "px-4 py-2 cursor-pointer hover:border-b hover:text-[#F1F1F1]",
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
                <div className="block tablet:hidden w-full">
                    <div className="w-full">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "grid grid-cols-6 p-4",
                                    idx % 2 !== 0
                                        ? "bg-gradient-to-t from-white/10 to-white/5"
                                        : ""
                                )}
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress("0x0000000000000000000")}
                                </div>
                                <div className="col-span-3 text-right">
                                    0 PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 1 && (
                <div className="block tablet:hidden w-full">
                    <div className="w-full">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "grid grid-cols-6 p-4",
                                    idx % 2 !== 0
                                        ? "bg-gradient-to-t from-white/10 to-white/5"
                                        : ""
                                )}
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress("0x0000000000000000000")}
                                </div>
                                <div className="col-span-3 text-right">
                                    0 PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="hidden tablet:flex gap-8 w-full max-w-[800px]">
                <div className="hidden tablet:block w-full">
                    <div className="text-[#F1F1F1] font-semibold text-[18px] text-center border-b pb-2">
                        Ranking NFT
                    </div>
                    <div className="w-full">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "grid grid-cols-6 p-4",
                                    idx % 2 !== 0
                                        ? "bg-gradient-to-t from-white/10 to-white/5"
                                        : ""
                                )}
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress("0x0000000000000000000")}
                                </div>
                                <div className="col-span-3 text-right">
                                    0 PLS
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden tablet:block w-full">
                    <div className="text-[#F1F1F1] font-semibold text-[18px] text-center border-b pb-2">
                        Ranking Winner
                    </div>
                    <div className="w-full">
                        {new Array(10).fill("").map((_, idx) => (
                            <div
                                key={idx}
                                className={clsx(
                                    "grid grid-cols-6 p-4",
                                    idx % 2 !== 0
                                        ? "bg-gradient-to-t from-white/10 to-white/5"
                                        : ""
                                )}
                            >
                                <div>{idx + 1}</div>
                                <div className="col-span-2">
                                    {truncatedAddress("0x0000000000000000000")}
                                </div>
                                <div className="col-span-3 text-right">
                                    0 PLS
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
