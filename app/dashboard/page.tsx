"use client";
import Avatar from "@/lib/components/Avatar";
import Card from "@/lib/components/CardContainer";
import CourseCard from "@/lib/components/CourseCard";
import Loader from "@/lib/components/Loader";
import { StoreState } from "@/lib/store";
import { useGetAllCoursesQuery } from "@/lib/store/slices/apiSlice";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state: StoreState) => state.user.user);
  // const courses = useSelector((state: StoreState) => state.courses.courses);

  const {
    data: coursesData,
    error: coursesError,
    isLoading: coursesLoading,
  } = useGetAllCoursesQuery();


  const availableCourses = useMemo(()=>{
    const enrolledCourseIdSet= new Set(user?.enrolledCourses?.map((course) => course.courseId));
    const unEnrolledCourses = coursesData?.data?.filter((course) => !enrolledCourseIdSet.has(course.id));
    return unEnrolledCourses;
  },[coursesData,user]);


  return (
    <main className="flex flex-col justify-start gap-4 my-10">
      <Card className="rounded-lg">
        <div className="flex items-center gap-2 justify-start">
          <div className="w-12">
            <Avatar
              firstName={user?.firstname}
              lastName={user?.lastname}
              url={user?.photoUrl}
            />
          </div>
          <h3 className="font-semibold">Welcome back {user?.firstname},</h3>
          {user?.gender && <p>{user?.gender}</p>}
        </div>
      </Card>

      <section className="bg-base-200 p-5 px-8 border border-base-300 rounded-lg">
        <h3 className="font-semibold">Your Courses</h3>
        <p className="text-sm text-base-content">Pick up where you left</p>
        <div className="flex flex-col justify-start gap-2 my-6">
          {user?.enrolledCourses?.map((course) => (
            <CourseCard key={course.courseId} {...course} />
          ))}
        </div>
      </section>
      <section className="bg-base-200 p-5  px-8 border border-base-300 rounded-lg  ">
        <h3 className="font-semibold">What's trending</h3>
        <p className="text-sm text-base-content">Recommended courses for you</p>
        {coursesLoading && <Loader isLoading={coursesLoading} />}
        {!coursesLoading && availableCourses?.length! >0 ? (
          <div className="flex  overflow-x-auto py-4 justify-start  gap-5 my-6">
            {availableCourses?.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          availableCourses?.length! === 0 && <p>No courses found</p>
        )}
      </section>
    </main>
  );
}
