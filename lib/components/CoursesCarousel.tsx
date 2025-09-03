"use client";

import { TCourse } from "../types/courses.types";
import { EnrolledCourse } from "../types/user.types";
import CourseCard from "./CourseCard";
import Loader from "./Loader";

export default function CoursesCarousel({
  title,
  subtitle,
  isLoading,
  coursesList,
  isEnrolled,
  fallback,
}: {
  title: string | React.ReactNode;
  subtitle: string;
  isLoading: boolean;
  coursesList: EnrolledCourse[] | TCourse[] | undefined;
  isEnrolled: boolean;
  fallback: string;
}) {
  return (
    <section className="bg-base-200 p-5 px-8 border  border-base-300 rounded-lg">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-base-content">{subtitle}</p>
      {isLoading && <Loader isLoading={isLoading} />}
      {!isLoading && coursesList?.length! > 0 ? (
        <div className="flex  overflow-x-auto py-4 justify-start  gap-5 my-6">
          {coursesList?.map((course) => {
            const courseId = 'courseId' in course ? course.courseId : course.id;
            return (
              <CourseCard
                key={courseId}
                courseId={courseId}
                enrolled={isEnrolled}
                {...course}
              />
            );
          })}
        </div>
      ) : (
        coursesList?.length! === 0 && <p className="text-base-content py-4 text-sm" >{fallback}</p>
      )}
    </section>
  );
}
