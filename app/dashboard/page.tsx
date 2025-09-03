"use client";
import Avatar from "@/lib/components/Avatar";
import Card from "@/lib/components/CardContainer";
import CourseCard from "@/lib/components/CourseCard";
import CoursesCarousel from "@/lib/components/CoursesCarousel";
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
    isFetching: userFetching,
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

      <CoursesCarousel
        title={
          <span>
            Your Courses{" "}
            <span>
              {user?.enrolledCourses?.length! > 0 &&
                `(${user?.enrolledCourses?.length})`}
            </span>
          </span>
        }
        subtitle="Pick up where you left"
        isLoading={userLoading || userFetching}
        coursesList={user?.enrolledCourses}
        isEnrolled={true}
        fallback="No courses is enrolled!"
      />

      <CoursesCarousel
        title={"What's trending"}
        subtitle="Recommended courses for you"
        isLoading={coursesLoading}
        coursesList={availableCourses}
        isEnrolled={false}
        fallback="No courses found!"
      />
    </main>
  );
}
