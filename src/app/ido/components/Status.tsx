"use client";

import clsx from "clsx";
import { useState, useEffect, useMemo } from "react";
import { STATUS, timeDiff, statusToColor } from "../utils";
import Image from "next/image";

export default function Status({
    start,
    end,
}: {
    start: number | undefined;
    end: number | undefined;
}) {
    // const [status, setStatus] = useState<undefined | STATUS>(undefined);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (!start || !end) return;
    //         const time = timeDiff(Date.now(), start * 1000, end * 1000);
    //         setStatus(time.status);
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, [start, end]);

    return (
        <div
            className={clsx(
                "flex items-center gap-1 py-1.5 px-3 rounded-2xl status-inprogress-bg"
            )}
        >
            <div className="w-2 h-2 relative">
                <Image
                    src={`/assets/images/ido/inprogress.svg`}
                    alt={`inprogress`}
                    fill
                    sizes="any"
                />
            </div>
            <div
                className={clsx(
                    "text-[12px] capitalize font-medium text-[#6CFF7B]"
                )}
            >
                Success
            </div>
        </div>
    );
}
