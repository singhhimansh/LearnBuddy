"use client";
import Avatar from "@/lib/components/Avatar";
import Card from "@/lib/components/CardContainer";
import CourseCard from "@/lib/components/CourseCard";
import Loader from "@/lib/components/Loader";
import Toast from "@/lib/components/Toast";
import { StoreState } from "@/lib/store";
import {
  useEnrollCourseMutation,
  useGetAllCoursesQuery,
  useGetUserQuery,
  useUpdateEnrollmentMutation,
} from "@/lib/store/slices/apiSlice";
import { setUser } from "@/lib/store/slices/userSlice";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state: StoreState) => state.user.user);
  const dispatch = useDispatch();

  const {
    data: userquery,
    error: userError,
    isLoading: userLoading,
    isFetching,
    refetch,
  } = useGetUserQuery(undefined, {});

  useEffect(() => {
    if (userquery?.data) {
      dispatch(setUser(userquery?.data));
    }
  }, [userquery]);

  const {
    data: coursesData,
    error: coursesError,
    isLoading: coursesLoading,
  } = useGetAllCoursesQuery();

  const availableCourses = useMemo(() => {
    const enrolledCourseIdSet = new Set(
      user?.enrolledCourses?.map((course) => course.courseId)
    );
    const unEnrolledCourses = coursesData?.data?.filter(
      (course) => !enrolledCourseIdSet.has(course.id)
    );
    return unEnrolledCourses;
  }, [coursesData, user]);

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

      <section className="bg-base-200 p-5 px-8 border  border-base-300 rounded-lg">
        <h3 className="font-semibold">Your Courses <span>({user?.enrolledCourses?.length})</span></h3>
        <p className="text-sm text-base-content">Pick up where you left</p>
        {userLoading && <Loader isLoading={userLoading} />}
        {!userLoading && user?.enrolledCourses?.length! > 0 ? (
          <div className="flex  overflow-x-auto py-4 justify-start  gap-5 my-6">
            {user?.enrolledCourses?.map((course) => (
              <CourseCard key={course.courseId} enrolled={true} {...course} />
            ))}
          </div>
        ) : (
          user?.enrolledCourses?.length! === 0 && <p>No courses is enrolled</p>
        )}
      </section>

      <section className="bg-base-200 p-5  px-8 border border-base-300 rounded-lg  ">
        <h3 className="font-semibold">What's trending</h3>
        <p className="text-sm text-base-content">Recommended courses for you</p>
        {coursesLoading && <Loader isLoading={coursesLoading} />}
        {!coursesLoading && availableCourses?.length! > 0 ? (
          <div className="flex  overflow-x-auto py-4 justify-start  gap-5 my-6">
            {availableCourses?.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                enrolled={false}
                {...course}
              />
            ))}
          </div>
        ) : (
          availableCourses?.length! === 0 && <p>No courses found</p>
        )}
      </section>
    </main>
  );
}
