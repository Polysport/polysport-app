"use client";
import Button from "@/components/Button";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
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
dayjs.extend(utc);

export default function IdoPage() {
  const chainId = useChainId();
  const { address } = useAccount();
  const account = useSigner();

  const { data: userStats } = useSWR<{
    usdtBalance: string;
  }>(["ido", address, chainId], async ([_, address, chainId]) => {
    const [usdtBalance] = await Promise.all([
      getUSDTBalance(chainId as ChainId, address as Address),
    ]);

    return {
      usdtBalance,
    };
  });

  const [selectedPool, setSelectedPool] = useState<EPool>(EPool.OG);
  const [timeStartDiff, setTimeStartDiff] = useState<{
    d: number;
    h: number;
    m: number;
    s: number;
    status: STATUS | undefined;
  }>({
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
  }, [POOLS[selectedPool]?.start, POOLS[selectedPool]?.end]);

  return (
    <div className="flex px-2 md:px-[32px] ">
      <div className="flex flex-col mx-auto w-full !max-w-[1080px] gap-6 mt-[50px]">
        <div className="flex justify-end gap-x-2">
          {Object.values(POOLS).map((p) => (
            <Button
              key={p.type}
              handler={() => setSelectedPool(p.type)}
              text={`${p.type} POOL`}
              className={clsx(
                "text-[12px] md:text-[16px] max-w-[147px] md:max-w-[205px] !pt-[51px] hover:brightness-100",
                {
                  "brightness-50": p.type != selectedPool,
                }
              )}
            />
          ))}
        </div>

        <div className="p-2 xl:p-6 border rounded-3xl border-[#ffffff66] grid md:grid-cols-2 xl:grid-cols-3 bg-[#1A1C24] gap-2 xl:gap-6">
          <div className="md:col-span-2 xl:col-span-1 flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 xl:p-6">
            <div className="w-[60px] h-[60px] relative">
              <Image
                src="/assets/images/ido/ido.svg"
                alt="ido"
                fill
                sizes="any"
              />
            </div>
            <div>
              <div className="text-[24px] font-medium">Polysport</div>
              <div className="text-[#C6C6C6]">PLS</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 xl:p-6">
            <div className="w-[60px] h-[60px] relative">
              <Image
                src="/assets/images/ido/user.svg"
                alt="user"
                fill
                sizes="any"
              />
            </div>
            <div>
              <div className="text-[24px] font-medium">{100}</div>
              <div className="text-[#C6C6C6]">Total Contributor</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-2 xl:p-6">
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
                {POOLS[selectedPool].supply}
              </div>
              <div className="text-[#C6C6C6]">PLS</div>
            </div>
          </div>
        </div>

        <div className="p-6 border rounded-3xl border-[#ffffff66] bg-[#1A1C24] gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center gap-3">
              <div className="min-w-[66px] h-[66px] relative">
                <Image src="/assets/logo.png" alt="logo" fill sizes="any" />
              </div>

              <div className="flex flex-col justify-between">
                <div className="text-[24px] font-bold">Polysport</div>
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
                <div className="font-bold text-[16px] md:text-[20px] xl:text-[24px] text-[#F1F1F1] pb-3 border-b border-b-[#2D313E]">
                  Launchpad {statusToText(timeStartDiff.status)}
                </div>
              ) : (
                <div className="skeleton w-[80px] h-[19px] md:h-[23px] xl:h-[28px] bg-[#2D313E]" />
              )} */}

              <div className="text-[14px] text-[#C6C6C6]">
                Sale {statusToText(timeStartDiff.status)}
              </div>

              <div className="flex justify-between md:justify-start gap-0 md:gap-3 xl:gap-8">
                <CountDown
                  start={POOLS[selectedPool].start}
                  end={POOLS[selectedPool].end}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 mt-6 gap-6">
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center justify-between bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                <div>
                  <div className="text-[14px] text-[#C6C6C6]">Total raise</div>
                  <div className="font-medium">
                    {numberWithCommas(POOLS[selectedPool].raise)} USDT
                  </div>
                </div>
                <div className="min-h-[49px] border-r border-r-[#2D313E]" />
                <div>
                  <div className="text-[14px] text-[#C6C6C6]">Total sale</div>
                  <div className="font-medium">
                    {numberWithCommas(POOLS[selectedPool].sale)} PLS
                  </div>
                </div>
                <div className="min-h-[49px] border-r border-r-[#2D313E]" />
                <div>
                  <div className="text-[14px] text-[#C6C6C6]">Rate</div>
                  <div className="font-medium">
                    1 PLS = {numberWithCommas(POOLS[selectedPool].rate)} USDT
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="text-[12px] text-[#C6C6C6]">
                    USDT balance:
                  </div>
                  <div className="text-[12px]">
                    {numberWithCommas(userStats?.usdtBalance ?? "0")} USDT
                  </div>
                </div>
                <input
                  className={clsx(
                    "border border-[#2D313E] placeholder:opacity-30 appearance-none block w-full bg-[#0D0E12] rounded-2xl p-3 leading-tight focus:outline-none focus:bg-[#0D0E12]"
                  )}
                  type="text"
                  placeholder="Enter amount"
                />
              </div>

              <div className="flex items-center justify-between bg-[#0D0E12] border border-[#2D313E] rounded-3xl p-6">
                You will receiver:
              </div>

              <div className="flex items-center justify-center">
                <Button
                  // handler={() => setSelectedPool(p.type)}
                  text="Buy"
                  className={clsx(
                    "text-[12px] md:text-[16px] w-[206px] !pt-[51px]  "
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col border border-[#2D313E] bg-[#0D0E12] rounded-3xl p-6">
              <div className="text-[16px] md:text-[20px] xl:text-[24px] pb-3 border-b border-b-[#2D313E] font-bold text-[#F1F1F1]">
                Launchpad information
              </div>
              <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                  Start time
                </div>
                <div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
                  {dayjs
                    .utc(POOLS[selectedPool].start * 1000)
                    .format("MMM DD YYYY HH:mm")}{" "}
                  UTC
                </div>
              </div>
              <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                  End time
                </div>
                <div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
                  {dayjs
                    .utc(POOLS[selectedPool].end * 1000)
                    .format("MMM DD YYYY HH:mm")}{" "}
                  UTC
                </div>
              </div>

              {/* <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                  Vesting
                </div>
                {!!launchpad ? (
                  <div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
                    {POOLS[selectedPool].vestingPercent[0] / 1000}% on TGE
                  </div>
                ) : null}
              </div> */}
              <div className="flex justify-between py-3 border-b border-b-[#2D313E]">
                <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                  Min / Max commit
                </div>
                <div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
                  {numberWithCommas(POOLS[selectedPool].min)} /{" "}
                  {numberWithCommas(POOLS[selectedPool].max)} USDT
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between">
                  <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                    Total committed
                  </div>
                  <div className="text-[14px] md:text-[16px] font-medium text-[#F1F1F1]">
                    {numberWithCommas(
                      // ethers.formatUnits(
                      //   launchpadStatistics?.committed ?? "0",
                      //   POOLS[selectedPool].tokenRaise.decimals
                      // )
                      0
                    )}{" "}
                    USDT
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  {/* {!!launchpad ? ( */}
                  <progress
                    className="progress progress-accent h-[16px] mt-3"
                    value={
                      // (+(launchpadStatistics?.committed ?? "0") /
                      //   +POOLS[selectedPool].totalRaise) *
                      // 100
                      0
                    }
                    max="100"
                  ></progress>
                  {/* ) : null} */}
                  <div className="flex justify-between">
                    <div className="text-[12px] md:text-[14px] text-[#C6C6C6]">
                      Process
                    </div>
                    {/* {!!launchpad ? ( */}
                    <div className="text-[12px] md:text-[14px] text-[#F1F1F1]">
                      {/* {numberWithCommas(
                          (+(launchpadStatistics?.committed ?? "0") /
                            +POOLS[selectedPool].totalRaise) *
                            100
                        )} */}
                      0%
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
