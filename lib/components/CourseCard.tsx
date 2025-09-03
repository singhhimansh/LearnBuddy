import Image from "next/image";
import Badge from "./Badge";
import { CoursesStatusMap } from "../utils/common";
import Button from "./Button";
import {
  useEnrollCourseMutation,
  useGetUserQuery,
  useUpdateEnrollmentMutation,
} from "../store/slices/apiSlice";
import Toast from "./Toast";
import { useCallback } from "react";

type CourseCardProps = {
  title: string;
  description: string;
  keywords?: string[];
  author: string;
  thumbnail: string;
  status?: string;
  enrolled?: boolean;
  courseId: string | number;
};

export default function CourseCard({
  courseId,
  title,
  description,
  thumbnail,
  keywords,
  author,
  enrolled,
  status,
}: CourseCardProps) {
  const {isFetching: isUserFetching} = useGetUserQuery(undefined, {
    skip: false,
  });


  const [
    updateEnrollment,
    { error: updateEnrollmentError, isLoading: updateEnrollmentLoading, isSuccess: updateEnrollmentSuccess },
  ] = useUpdateEnrollmentMutation();
  const [
    enrollCourse,
    { error: enrollCourseError, isLoading: enrollCourseLoading, isSuccess: enrollCourseSuccess },
  ] = useEnrollCourseMutation();


  const isSubmittingEnroll = updateEnrollmentLoading || (updateEnrollmentSuccess && isUserFetching);
  const isSubmittingWithdraw = enrollCourseLoading || (enrollCourseSuccess && isUserFetching);

  const handleEnroll = useCallback(({
    courseId,
    status,
  }: {
    courseId: string | number;
    status?: string;
  }) => {
    if (enrolled) {
      // patch api
      updateEnrollment({
        enrolmentId: courseId,
        body: { status },
      })
        .unwrap()
        .then((res) => {
          Toast.info("Course withdrawn successfully");
        })
        .catch((error: any) => {
          Toast.error(
            error?.data?.error || error?.message || "Internal server error"
          );
          console.log(error);
        });
    } else {
      // post api
      enrollCourse({ courseId })
        .unwrap()
        .then((res) => {
          Toast.success("Course enrolled successfully");
          // refetch();
        })
        .catch((error: any) => {
          console.log(error);
          Toast.error(
            error?.data?.error || error?.message || "Internal server error"
          );
          console.log(error);
        });
    }
  }, [enrolled,updateEnrollment,enrollCourse]);
  return (
    <div className="card bg-base-100 min-w-88 max-w-88 shadow-sm hover:shadow-lg hover:scale-[1.02]  transition-all cursor-pointer">
      {/* <Image width={100} height={100} src={thumbnail} alt={title}  /> */}
      <div className="relative w-full h-40 rounded-t-2xl  overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
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
            isLoading={isSubmittingEnroll || isSubmittingWithdraw}
            onClick={() =>
              handleEnroll({
                courseId,
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
