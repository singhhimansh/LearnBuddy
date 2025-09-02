export default function Loader({
  isLoading,
  overlay,
}: {
  isLoading?: boolean;
  overlay?: boolean;
}) {
  return (
    isLoading && (
      <div
        className={
          overlay
            ? "fixed inset-0 z-50 bg-background flex justify-center flex-col items-center "
            : "flex justify-center items-center mt-40"
        }
      >
        <span className="loading loading-dots loading-xl bg-neutral scale-120"></span>
        <p className="text-center text-neutral text-lg font-bold">Loading...</p>
      </div>
    )
  );
}
