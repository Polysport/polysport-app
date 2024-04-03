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
  const [status, setStatus] = useState<undefined | STATUS>(undefined);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!start || !end) return;
      const time = timeDiff(Date.now(), start * 1000, end * 1000);
      setStatus(time.status);
    }, 1000);

    return () => clearInterval(interval);
  }, [start, end]);

  const { text, bg } = useMemo(() => statusToColor(status), [status]);

  return !status ? (
    <div className="skeleton w-[80px] h-[30px] rounded-2xl bg-[#2D313E]" />
  ) : (
    <div
      className={clsx("flex items-center gap-1 py-1.5 px-3 rounded-2xl", bg)}
    >
      <div className="w-2 h-2 relative">
        <Image
          src={`/assets/images/ido/${status}.svg`}
          alt={`${status}`}
          fill
          sizes="any"
        />
      </div>
      <div className={clsx("text-[12px] capitalize font-medium", text)}>
        {status}
      </div>
    </div>
  );
}
