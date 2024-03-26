import clsx from "clsx";

export default function Button({
  text,
  enable = true,
  loading = false,
  handler,
  className,
}: {
  text: string;
  enable?: boolean;
  loading?: boolean;
  handler?: () => any;
  className?: string;
}) {
  return (
    <button
      className={clsx(
        `relative bg_btn_primary txt-stroke flex-1 pt-[25.1%]`,
        className,
        {
          "opacity-50 cursor-not-allowed": !enable || loading,
        }
      )}
      onClick={handler}
      disabled={!enable || loading}
    >
      <span className="russo-one-font absolute top-[50%] translate-y-[-50%] left-0 right-0 text-center">
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          text
        )}
      </span>
    </button>
  );
}
