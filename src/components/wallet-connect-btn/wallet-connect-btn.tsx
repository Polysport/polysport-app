import React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "../Button";

function WalletConnectBtn() {
    return (
        <>
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== "loading";
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === "authenticated");
                    const address = account?.address;
                    const truncatedAddress = address
                        ? `${address.slice(0, 6)}...${address.slice(-4)}`
                        : "";

                    if (!connected) {
                        return (
                            <Button
                                handler={openConnectModal}
                                text="Connect Wallet"
                                className="text-[12px] tablet:text-[16px] w-[147px] tablet:w-[195px]"
                            />
                        );
                    }

                    if (chain.unsupported) {
                        return (
                            <Button
                                handler={openChainModal}
                                text="Unsupported Network"
                                className="text-[12px] tablet:text-[16px] w-[147px] tablet:w-[195px]"
                            />
                        );
                    }

                    return (
                        <Button
                            handler={openChainModal}
                            text={truncatedAddress}
                            className="text-[12px] tablet:text-[16px] w-[147px] tablet:w-[195px]"
                        />
                    );
                }}
            </ConnectButton.Custom>
        </>
    );
}

export default WalletConnectBtn;
