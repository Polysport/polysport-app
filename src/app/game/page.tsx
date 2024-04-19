"use client";
import clsx from "clsx";
import { useState } from "react";
import Game from "./components/Game";
import Leaderboard from "./components/Leaderboard";
import Withdraw from "./components/WIthdraw";

export default function GamePage() {
    const [activeTab, setActiveTab] = useState<number>(0);

    const TABS = ["Game", "Leaderboard", "Withdraw"];

    return (
        <div className="px-2 tablet:px-[32px] pt-[80px] tablet:pt-[120px] text-[#f1f1f1] max-w-[1280px] mx-auto">
            <ul className="flex gap-0 justify-between tablet:justify-start tablet:gap-4 mb-8 border-b-[0.5px] border-b-[#6b6b6b] font-bold">
                {TABS.map((t, idx) => (
                    <li
                        key={idx}
                        onClick={() => setActiveTab(idx)}
                        className={clsx(
                            "text-[18px] font-extrabold px-2 py-2 tablet:px-4 tablet:py-2 cursor-pointer hover:border-b hover:text-[#F1F1F1]",
                            {
                                "text-[#F1F1F1] border-b": idx === activeTab,
                            }
                        )}
                    >
                        {t}
                    </li>
                ))}
            </ul>
            {activeTab === 0 && <Game />}

            {activeTab === 1 && <Leaderboard />}

            {activeTab === 2 && <Withdraw />}
        </div>
    );
}
