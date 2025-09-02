import Image from "next/image";
import Badge from "./Badge";
import { CoursesStatusMap } from "../utils/common";
import Button from "./Button";

type CourseCardProps = {
  title: string;
  description: string;
  keywords?: string[];
  author: string;
  thumbnail: string;
  status?: string;
  enrolled?: boolean;
  courseId: string | number;
  isLoading?: boolean;
  handleClick: ({ courseId, status, enrolled }: { courseId: string | number; status?: string; enrolled?: boolean })=> void
};

export default function CourseCard({  
  courseId,
  title,
  description,
  thumbnail,
  keywords,
  author,
  isLoading,
  enrolled,
  status,
  handleClick,
}: CourseCardProps) {
  return (
    <div className="card bg-base-100 min-w-88 max-w-88 shadow-sm hover:shadow-lg hover:scale-[1.02]  transition-all cursor-pointer">
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
        <h5 className="card-title  truncate">{title}</h5>
        <div className="flex justify-between items-center">
          <p className="text-xs  font-mono text-secondary">By {author}</p>
          {status && (
            <Badge
              label={CoursesStatusMap[status?.toLowerCase()]}
              className={"badge-sm"}
              variant="accent"
            />
          )}
        </div>
        <p className="text-sm text-base-content ">{description}</p>
        <div className="flex gap-2 align-start ">
          {keywords &&
            keywords?.slice(0, 3)?.map((i) => {
              return (
                <Badge
                  className="text-xs capitalize whitespace-nowrap font-mono"
                  key={i}
                  label={i}
                />
              );
            })}
        </div>
        <div className="card-actions mt-4 flex justify-center">
          <Button
            sx={{ button: "w-full" }}
            label={enrolled ? "Withdraw" : "Enroll Now"}
            isLoading={isLoading}
            onClick={() =>
              handleClick({
                courseId,
                enrolled,
                status: enrolled ? "WITHDRAWN" : "",
              })
            }
            variant={enrolled ? "outline" : "primary"}
          />
        </div>
      </div>
    </div>
  );
}
