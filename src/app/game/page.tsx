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
        <div className="desktop:px-32 mobile:px-4">
            <ul className="flex gap-0 justify-between tablet:justify-start tablet:gap-4 mb-8 border-b-[0.5px] border-b-[#6b6b6b] font-bold">
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
            {activeTab === 0 && <Game />}

            {activeTab === 1 && <Leaderboard />}

            {activeTab === 2 && <Withdraw />}
        </div>
    );
}
