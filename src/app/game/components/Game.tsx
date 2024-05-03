"use client";
import { GAME_API, GRADE } from "@/configs";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCallback, useState } from "react";
import { Address, useAccount, useChainId, useSigner } from "wagmi";
// import useSWR from "swr";
import { useRootStore } from "@/store";
import { numberWithCommas } from "@/utils/helper/number";
import { burnNft, getTokenBalance } from "@/services";
import { ChainId } from "@/configs/type";
import clsx from "clsx";
import { toast } from "react-toastify";
import axios from "axios";
import { getContract } from "@/utils/constracts/get-contracts";
import { ethers } from "ethers";
import { getGamePoolReward, getUserRewarded } from "@/services/game";
import Button from "@/components/Button";
import useSWRImmutable from "swr/immutable";

enum EWin {
    LOSE,
    WIN,
    JACKPOT,
}

type INft = {
    id: number;
    image: string;
    nftId: number;
};

type ICard = {
    id: number;
    cardId: number;
    account: string;
    win: number;
    nftId: boolean;
    reward: number | string;
    flipped: boolean;
    userFlipped: boolean;
};

export default function Game() {
    const chainId = useChainId();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    const { openConnectModal } = useConnectModal();

    const [submitting, setSubmitting] = useState<boolean>(false);
    const [burning, setBurning] = useState<boolean>(false);
    const [selectedNftBurn, setSelectedNftBurn] = useState<INft | undefined>();

    const txHash = useRootStore((s) => s.txHash);

    const {
        data: poolStats,
        isLoading: isLoadingPool,
        mutate: mutatePool,
    } = useSWRImmutable<{
        reward: string;
    }>(
        ["pool", chainId],
        async ([_, chainId]) => {
            const balance = await getGamePoolReward(chainId as ChainId);
            return { reward: balance };
        },
        {
            // refreshInterval: 60,
            revalidateOnMount: true,
        }
    );

    const {
        data: userStats,
        isLoading: isLoadingUser,
        mutate: mutateStats,
    } = useSWRImmutable<{
        tokenBalance: string;
        burnedNft: INft;
        nfts: INft[];
        numOfFlip: number;
        rewarded: string;
        cards: ICard[];
    }>(
        ["game", chainId, address],
        async ([_, chainId, address]) => {
            if (!address)
                return {
                    tokenBalance: "0",
                    nfts: [],
                    clicks: [],
                    earnings: 0,
                    board: [],
                };
            const [tokenBalance, stats, _stats] = await Promise.all([
                getTokenBalance(chainId as ChainId, address as Address),
                axios.get(`${GAME_API}/stats?account=${address}`),
                getUserRewarded(chainId as ChainId, address as Address),
            ]);

            return {
                tokenBalance,
                ...stats.data,
                rewarded: _stats.toString(),
            };
        },
        {
            // refreshInterval: 60,
            revalidateOnMount: true,
        }
    );

    const handleFlipCard = useCallback(
        async (idx: number) => {
            try {
                if (submitting || !poolStats?.reward) return;

                const cardClicked = userStats?.cards?.find(
                    (c) => c.cardId === idx
                );
                if (cardClicked) return;

                if (!userStats?.numOfFlip)
                    return toast.error("No have flip clicks");

                if (!signer) return openConnectModal?.();

                setSubmitting(true);
                const signature = await signer.signMessage(`FLIP ${idx}`);

                const res = await axios.post<{
                    tx: any;
                    win: EWin;
                    reward: string;
                    card: ICard;
                }>(`${GAME_API}/flip`, {
                    account: address,
                    signature: signature,
                    cardId: idx,
                });

                // useRootStore.setState({ txHash: Date.now().toString() });
                setSubmitting(false);
                if (res.data.win === EWin.LOSE) {
                    mutateStats({
                        ...userStats,
                        numOfFlip: userStats.numOfFlip - 1,
                    });
                    return toast.error("Lose!");
                }

                mutateStats({
                    ...userStats,
                    numOfFlip: userStats.numOfFlip - 1,
                    cards: [...userStats.cards, res.data.card],
                    rewarded: (
                        +userStats.rewarded +
                        +ethers.utils.formatUnits(res.data.reward, 18)
                    ).toString(),
                });
                mutatePool({
                    ...poolStats,
                    reward: (
                        +poolStats?.reward -
                        +ethers.utils.formatUnits(res.data.reward, 18)
                    ).toString(),
                });
                if (res.data.win === EWin.JACKPOT) {
                    toast.success("Jackpot!");
                } else if (res.data.win === EWin.WIN) {
                    toast.success("Win!");
                }
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
        [
            chainId,
            address,
            signer,
            openConnectModal,
            userStats?.cards,
            userStats?.numOfFlip,
        ]
    );

    const handleBurnNft = useCallback(async () => {
        if (!signer) return openConnectModal?.();
        if (!selectedNftBurn || !userStats) return;

        try {
            if (burning) return;
            setBurning(true);
            if (!signer) return openConnectModal?.();
            const tx = await burnNft(chainId, signer, selectedNftBurn.id);
            await axios.post(`${GAME_API}/burn`, {
                txHash: tx.txHash,
            });
            // useRootStore.setState({ txHash: tx.txHash });

            mutateStats({
                ...userStats,
                nfts: userStats.nfts.filter(
                    (nft) => nft.id !== selectedNftBurn.id
                ),
                numOfFlip: selectedNftBurn.nftId,
                cards: [],
            });

            setBurning(false);
            toast.success("Burn success");
        } catch (error: any) {
            setBurning(false);
            toast.error(
                error?.error?.data?.message ||
                    error?.reason ||
                    error?.data?.message ||
                    error?.message ||
                    error
            );
        }
    }, [chainId, address, signer, openConnectModal, selectedNftBurn]);

    const handleWithdraw = useCallback(async () => {
        if (!signer) return openConnectModal?.();

        if (!userStats?.rewarded) return toast.error("Nothing to withdraw");

        if (
            !confirm(
                "There is a 40% withdrawal penalty for withdrawing less than 24 hours before your earnings and a 15% penalty for withdrawing less than 72 hours before your earnings. Please be aware of this before continuing."
            )
        ) {
            return;
        }

        try {
            if (submitting) return;
            if (!signer) return openConnectModal?.();
            const signature = await signer.signMessage(
                `WITHDRAW ${userStats.rewarded}`
            );

            const tx = await axios.post<EWin>(`${GAME_API}/withdraw`, {
                account: address,
                signature: signature,
                amount: userStats.rewarded,
            });

            useRootStore.setState({ txHash: Date.now().toString() });
            toast.success("Withdrawal successful!");
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
    }, [chainId, address, signer, openConnectModal, userStats?.rewarded]);

    return (
        <section className="flex flex-col-reverse tablet:flex-row relative gap-10">
            {(isLoadingPool || isLoadingUser || submitting) && (
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0006] flex flex-col z-[999]">
                    <span className="m-auto loading loading-spinner loading-lg"></span>
                </div>
            )}

            <div className="flex-1 flex flex-col items-center gap-4">
                <div className="w-full hidden tablet:block">
                    <section className="flex desktop:gap-4 mobile:gap-2 desktop:items-end mobile:items-center mobile:flex-col desktop:flex-row">
                        <div className="tablet:flex gap-4 mobile:grid mobile:grid-cols-4 desktop:flex-row">
                            <div className="mobile:col-span-2 game-info-item">
                                <label>Balances</label>
                                <div className="frame">
                                    <span className="flex gap-2">
                                        <span id="balancePoly">
                                            {numberWithCommas(
                                                userStats?.tokenBalance ?? 0
                                            )}
                                        </span>{" "}
                                        PLS{" "}
                                        <img
                                            src="assets/images/wallet.png"
                                            alt="wallet"
                                        />
                                    </span>
                                </div>
                            </div>
                            <div className="mobile:col-span-2 game-info-item">
                                <label>Reward Winner</label>
                                <div className="frame">
                                    <span id="rewardWinner">
                                        {numberWithCommas(
                                            userStats?.rewarded ?? "0"
                                        )}{" "}
                                        PLS
                                    </span>
                                </div>
                            </div>
                            <div className="mobile:col-start-2 mobile:col-span-2 game-info-item">
                                <label>Number of click</label>
                                <div className="frame">
                                    <span id="noClick">
                                        {userStats?.numOfFlip ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex gap-4 py-4">
                    <img
                        src="/assets/images/trophy.png"
                        alt="trophy"
                        className="cursor-pointer"
                    />
                    <img
                        src="/assets/images/how-to-play.png"
                        alt="how-to-play"
                        className="cursor-pointer"
                    />
                    <img
                        onClick={handleWithdraw}
                        id="iconWithdraw"
                        src="/assets/images/money-withdrawal.png"
                        alt="withdraw"
                        className="cursor-pointer"
                    />
                </div> */}
                    </section>
                </div>
                <section className="w-full flex flex-wrap gap-2 items-center justify-between max-w-[800px]">
                    {new Array(50).fill("").map((e, idx) => {
                        const cardClicked = userStats?.cards?.find(
                            (c) => c.cardId === idx
                        );

                        const userCardClicked = userStats?.cards?.find(
                            (c) => c.cardId === idx && !!c.userFlipped
                        );

                        return (
                            <div
                                key={idx}
                                className={clsx(
                                    "card-game",
                                    userCardClicked?.cardId == idx &&
                                        "card-game-clicked"
                                )}
                                id="card-game"
                                onClick={() => handleFlipCard(idx)}
                            >
                                <div
                                    id="card-game-inner"
                                    className={clsx({
                                        "[transform:rotateY(180deg)]":
                                            !!cardClicked,
                                    })}
                                >
                                    <div id="card-game-front relative">
                                        <img
                                            className="absolute top-0 left-0 w-full h-full"
                                            src="/assets/images/card-game-hover.jpg"
                                        />
                                        <img
                                            className="absolute top-0 left-0 w-full h-full hover:opacity-0 transition-all duration-500"
                                            src="/assets/images/card-game.jpg"
                                        />
                                    </div>
                                    <div id="card-game-back">
                                        <img
                                            src={
                                                !!cardClicked
                                                    ? `/assets/images/player-card/${cardClicked.nftId}.png`
                                                    : "/assets/images/card-back.png"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
                {/* <section className="mt-4 grid tablet:hidden grid-cols-4 place-items-center gap-2 w-full">
            {new Array(12).fill("").map((e, idx) => {
                const cardClicked = userStats?.cards?.find(
                    (c) => c.cardId === idx
                );

                return (
                    <div
                        key={idx}
                        className="card-game"
                        id="card-game"
                        onClick={() => handleFlipCard(idx)}
                    >
                        <div
                            id="card-game-inner"
                            className={clsx({
                                "[transform:rotateY(180deg)]":
                                    !!cardClicked,
                            })}
                        >
                            <div id="card-game-front relative">
                                <img
                                    className="absolute top-0 left-0 w-full h-full"
                                    src="/assets/images/card-game-hover.jpg"
                                />
                                <img
                                    className="absolute top-0 left-0 w-full h-full hover:opacity-0 transition-all duration-500"
                                    src="/assets/images/card-game.jpg"
                                />
                            </div>
                            <div id="card-game-back">
                                <img
                                    src={
                                        !!cardClicked
                                            ? `/assets/images/player-card/${cardClicked.nftId}.png`
                                            : "/assets/images/card-back.png"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </section> */}
            </div>
            <div className="grid grid-cols-2 tablet:grid-cols-1 gap-6">
                <div>
                    <div className="flex justify-center gap-2">
                        <div className="game-info-item">
                            <label style={{ color: "yellowgreen" }}>
                                Pool Reward
                            </label>
                            <div className="frame">
                                <span
                                    id="poolRewards"
                                    style={{
                                        color: "yellowgreen",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {numberWithCommas(poolStats?.reward ?? 0)}{" "}
                                    PLS
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center gap-2">
                        <>
                            <section
                                className="flex flex-col items-center mt-24 gap-3"
                                style={{ marginTop: 20 }}
                            >
                                <img
                                    src={
                                        selectedNftBurn
                                            ? `/assets/images/player-card/${selectedNftBurn.nftId}.png`
                                            : userStats?.burnedNft
                                            ? `/assets/images/player-card/${userStats.burnedNft.nftId}.png`
                                            : "/assets/images/card-back.png"
                                    }
                                    alt="NFT"
                                    className="desktop:w-[182px] desktop:h-[250px] mobile:w-[150px] mobile:h-[200px]"
                                />
                                <div className="text-center text-white flex flex-col items-center mt-3">
                                    <Button
                                        handler={handleBurnNft}
                                        loading={burning}
                                        // enable={true}
                                        text="Burn NFT"
                                        className={clsx(
                                            "text-[16px] tablet:text-[16px] w-[160px] !pt-[51px]  "
                                        )}
                                    />
                                </div>
                                <div className="hidden tablet:block">
                                    <img src="/assets/images/my-nft.png" />
                                    <div
                                        id="gameBoardListNFT"
                                        className="grid grid-cols-4 gap-2"
                                    >
                                        {userStats?.nfts?.map((nft) => (
                                            <img
                                                key={nft.id}
                                                id="nft-${thisNft[0]}"
                                                onClick={() =>
                                                    setSelectedNftBurn(nft)
                                                }
                                                src={`/assets/images/player-card/${nft.nftId}.png`}
                                                alt="NFT"
                                                className="desktop:w-[40px] desktop:h-[50px] mobile:w-[30px] mobile:h-[40px]"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </>
                    </div>
                </div>

                <div className="flex tablet:hidden flex-col gap-3">
                    <div className="game-info-item">
                        <label>Balances</label>
                        <div className="frame">
                            <span className="flex gap-2">
                                <span id="balancePoly">
                                    {numberWithCommas(
                                        userStats?.tokenBalance ?? 0
                                    )}
                                </span>{" "}
                                PLS{" "}
                                <img
                                    src="assets/images/wallet.png"
                                    alt="wallet"
                                />
                            </span>
                        </div>
                    </div>
                    <div className="game-info-item">
                        <label>Reward Winner</label>
                        <div className="frame">
                            <span id="rewardWinner">
                                {numberWithCommas(userStats?.rewarded ?? "0")}{" "}
                                PLS
                            </span>
                        </div>
                    </div>
                    <div className="game-info-item">
                        <label>Number of click</label>
                        <div className="frame">
                            <span id="noClick">
                                {userStats?.numOfFlip ?? 0}
                            </span>
                        </div>
                    </div>

                    <div>
                        <img src="/assets/images/my-nft.png" />
                        <div
                            id="gameBoardListNFT"
                            className="grid grid-cols-4 gap-2"
                        >
                            {userStats?.nfts?.map((nft) => (
                                <img
                                    key={nft.id}
                                    id="nft-${thisNft[0]}"
                                    onClick={() => setSelectedNftBurn(nft)}
                                    src={`/assets/images/player-card/${nft.nftId}.png`}
                                    alt="NFT"
                                    className="desktop:w-[40px] desktop:h-[50px] mobile:w-[30px] mobile:h-[40px]"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
