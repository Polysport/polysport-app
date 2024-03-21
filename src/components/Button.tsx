import clsx from "clsx";

export default function Button({
  enable,
  text,
  loading,
  handler,
  className,
}: {
  enable: boolean;
  text: string;
  loading: boolean;
  handler: () => any;
  className: string;
}) {
  return (
    // <button
    //   className={clsx("txt-stroke flex-1 button py-[12px]", className, {
    //     "opacity-50 cursor-not-allowed": !enable || loading,
    //   })}
    //   onClick={handler}
    //   disabled={!enable || loading}
    // >
    //   {loading ? (
    //     <span className="loading loading-spinner loading-xs"></span>
    //   ) : (
    //     text
    //   )}
    // </button>

    <div className="relative "></div>
  );
}
