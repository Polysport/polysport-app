export enum EPool {
  OG = "OG",
  WL = "WL",
  PUBLIC = "PUBLIC",
}

export const POOLS = {
  [EPool.OG]: {
    type: EPool.OG,
    supply: "45000000",
    raise: "300000",
    sale: "45000000",
    rate: "0.006",
    start: 1711825200,
    end: 1711908000,
    min: 10,
    max: 100,
  },
  [EPool.WL]: {
    type: EPool.WL,
    supply: "45000000",
    raise: "300000",
    sale: "45000000",
    rate: "0.0066",
    start: 1711825200,
    end: 1711908000,
    min: 10,
    max: 100,
  },
  [EPool.PUBLIC]: {
    type: EPool.PUBLIC,
    supply: "45000000",
    raise: "300000",
    sale: "45000000",
    rate: "0.0066",
    start: 1711908000,
    end: 1711994400,
    min: 10,
    max: 100,
  },
};

export enum STATUS {
  UPCOMING = "upcoming",
  INPROGRESS = "inprogress",
  END = "ended",
}

export function timeDiff(current: number, start: number, end: number) {
  let status = STATUS.END;
  if (current < start) status = STATUS.UPCOMING;
  else if (current < end) status = STATUS.INPROGRESS;

  const diff =
    status === STATUS.UPCOMING
      ? start - current
      : status === STATUS.INPROGRESS
      ? end - current
      : current - end;
  let msec = diff;
  const d = Math.floor(msec / 1000 / 24 / 60 / 60);
  msec -= d * 1000 * 24 * 60 * 60;
  const h = Math.floor(msec / 1000 / 60 / 60);
  msec -= h * 1000 * 60 * 60;
  const m = Math.floor(msec / 1000 / 60);
  msec -= m * 1000 * 60;
  const s = Math.floor(msec / 1000);

  return { d, h, m, s, status };
}

export const statusToColor = (status: STATUS | undefined) => {
  switch (status) {
    case STATUS.UPCOMING:
      return {
        text: "text-[#FFE86C]",
        bg: "status-upcoming-bg",
      };

    case STATUS.INPROGRESS:
      return {
        text: "text-[#6CFF7B]",
        bg: "status-inprogress-bg",
      };

    case STATUS.END:
      return {
        text: "text-[#FF6C6C]",
        bg: "status-end-bg",
      };

    default:
      return {
        text: "",
        bg: "",
      };
  }
};

export const statusToText = (status: STATUS | undefined) => {
  switch (status) {
    case STATUS.UPCOMING:
      return "starts in:";

    case STATUS.INPROGRESS:
      return "ends after:";

    case STATUS.END:
      return "ends from:";

    default:
      return "";
  }
};
