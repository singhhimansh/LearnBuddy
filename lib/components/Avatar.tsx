export default function Avatar({ name, url }: { name?: string; url?: string| null }) {
  return (
    <div className="avatar avatar-placeholder w-full ">
      <div className="bg-neutral text-neutral-content w-full  rounded-full">
        {url ? (
          <img src={url} alt={name} />
        ) : (
          <span className="">{name?.charAt(0)?.toUpperCase() ?? "NA"}</span>
        )}
      </div>
    </div>
  );
}
