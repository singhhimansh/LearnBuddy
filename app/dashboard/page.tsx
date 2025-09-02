"use client";
import Avatar from "@/lib/components/Avatar";
import Card from "@/lib/components/CardContainer";
import CourseCard from "@/lib/components/CourseCard";
import { StoreState } from "@/lib/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state: StoreState) => state.user.user);
  return (
    <main className="flex flex-col justify-start gap-4 mt-4">
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

      <section className="bg-base-100 p-5 px-8 border-2 border-base-200 rounded-lg">
        <h3 className="font-semibold">Your Courses</h3>
        <p className="text-sm text-base-content">Pick up where you left</p>
        <div className="flex flex-col justify-start gap-2 my-6">
          {user?.enrolledCourses?.map((course) => (
            <CourseCard key={course.courseId} {...course} />
          ))}
        </div>
      </section>
      <section className="bg-base-100 p-5  px-8 border-2 border-base-200 rounded-lg ">
        <h3 className="font-semibold">What's trending</h3>
        <p className="text-sm text-base-content">Recommended courses for you</p>
        <div className="flex flex-col justify-start  gap-2 my-6">
          {user?.enrolledCourses?.map((course) => (
            <CourseCard key={course.courseId} {...course} />
          ))}
        </div>
      </section>
    </main>
  );
}
