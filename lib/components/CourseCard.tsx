import Image from "next/image";
import Badge from "./Badge";
import { CoursesStatusMap } from "../utils/common";

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
    <div className="card bg-base-100 min-w-96 max-w-fit shadow-sm hover:shadow-lg hover:scale-[1.02]  transition-all cursor-pointer">
      {/* <Image width={100} height={100} src={thumbnail} alt={title}  /> */}
      <div className="relative w-full h-40 rounded-t-2xl  overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          style={{ objectFit: "cover", overflow: "hidden" }}
        />
      </div>

      <div className="card-body ">
        <div className="flex justify-between items-center">
          <h5 className="card-title no-wrap whitespace-nowrap">{title}</h5>
          {status && (
            <Badge
              label={CoursesStatusMap[status?.toLowerCase()]}
              variant="accent"
            />
          )}
        </div>
        <p className="text-xs text-neutral font-mono">By {author}</p>
        <p className="text-sm text-base-content ">{description}</p>
        <div className="flex gap-2 align-start ">
          {keywords &&
            keywords?.slice(0, 3)?.map((i) => {
              return (
                <Badge
                  className="text-xs capitalize whitespace-nowrap"
                  key={i}
                  label={i}
                />
              );
            })}
        </div>
        <div className="card-actions mt-4">
          <button className="btn btn-primary">Enroll</button>
        </div>
      </div>
    </div>
  );
}
