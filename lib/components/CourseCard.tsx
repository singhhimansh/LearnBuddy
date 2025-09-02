import Image from "next/image";
import Badge from "./Badge";

type CourseCardProps = {
  title: string;
  description: string;
  keywords?: string[];
  author: string;
  thumbnail: string;
  status?: string;
};

export default function CourseCard({
  title,
  description,
  thumbnail,
  keywords,
  author,
  status,
}: CourseCardProps) {
  return (
    <div className="card bg-base-100 w-80 shadow-sm hover:shadow-lg hover:scale-[1.02]  transition-all cursor-pointer">
      {/* <Image width={100} height={100} src={thumbnail} alt={title}  /> */}
      <div className="relative w-full h-40 rounded-t-2xl  overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: "cover", overflow:'hidden' }}
        />
      </div>

      <div className="card-body ">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-base-content">{description}</p>
        <div className="flex gap-2 align-start ">
          {keywords &&
            keywords?.slice(0, 3)?.map((i) => {
              return <Badge className="text-xs capitalize" key={i} label={i} />;
            })}
        </div>
        {/* <div className="card-actions">
          <button className="btn btn-primary">{status}</button>
        </div> */}
      </div>
    </div>
  );
}
