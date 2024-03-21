import React from "react";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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
            (!authenticationStatus || authenticationStatus === "authenticated");
          const address = account?.address;
          const truncatedAddress =
            address && `${address.slice(0, 6)}...${address.slice(-4)}`;

          if (!connected) {
            return (
              <div
                onClick={openConnectModal}
                id="wrapper-btn-wallet"
                className="relative shadow-btn rounded-[16px] transition-all cursor-pointer"
              >
                <div
                  id="btnConnectMM"
                  className="button-connect-wallet border-btn h-full px-5 py-2 flex-1 max-w-[180px] max-md:w-[160px] text-center"
                >
                  <p
                    id="btnConnectSuccess"
                    className="font-russo-one whitespace-nowrap"
                  >
                    Connect Wallet
                  </p>
                </div>
              </div>
            );
          }

          if (chain.unsupported) {
            return (
              <div
                onClick={openChainModal}
                id="wrapper-btn-wallet"
                className="relative shadow-btn rounded-[16px] transition-all cursor-pointer"
              >
                <div
                  id="btnConnectMM"
                  className="button-connect-wallet border-btn h-full px-5 py-2 flex-1 max-w-[180px] max-md:w-[160px] text-center"
                >
                  <p
                    id="btnConnectSuccess"
                    className="font-russo-one whitespace-nowrap"
                  >
                    Connect Wallet
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div
              onClick={openAccountModal}
              id="wrapper-btn-wallet"
              className="relative shadow-btn rounded-[16px] transition-all cursor-pointer"
            >
              <div
                id="btnConnectMM"
                className="button-connect-wallet border-btn h-full px-5 py-2 flex-1 max-w-[180px] max-md:w-[160px] text-center"
              >
                <p
                  id="btnConnectSuccess"
                  className="font-russo-one whitespace-nowrap"
                >
                  {truncatedAddress}
                </p>
              </div>
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
}

export default WalletConnectBtn;
