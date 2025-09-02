export default function Avatar({
  firstName,
  lastName,
  url,
}: {
  firstName?: string;
  lastName?: string | null;
  url?: string | null;
}) {
  return (
    <div className="avatar avatar-placeholder w-full ">
      <div className="bg-neutral text-neutral-content w-full  rounded-full">
        {url ? (
          <img src={url} alt={firstName ?? "avatar" + lastName ?? ""} />
        ) : (
          <span className="">
            {firstName?.charAt(0)?.toUpperCase() ?? "NA"}
            {lastName?.charAt(0)?.toUpperCase() ?? ""}
          </span>
        )}
      </div>
    </div>
  );
}
