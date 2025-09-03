import { GetUserResponse } from "@/lib/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  TCoursesResponse,
  TCoursesContentResponse,
} from "@/lib/types/courses.types";
import { RTK_TAGS } from "@/lib/constants/tags";

const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [RTK_TAGS.COURSES, RTK_TAGS.ENROLLMENTS, RTK_TAGS.USER],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<GetUserResponse, void>({
      providesTags: [RTK_TAGS.USER],
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getAllCourses: builder.query<TCoursesResponse, void>({
      providesTags: [RTK_TAGS.COURSES],
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
    }),
    getCourseContentById: builder.query<
      TCoursesContentResponse,
      { courseId: string }
    >({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}`,
        method: "GET",
      }),
    }),
    enrollCourse: builder.mutation({
      invalidatesTags: [RTK_TAGS.USER, RTK_TAGS.COURSES],
      query: (body) => ({
        url: `/enroll`,
        method: "POST",
        body,
      }),
    }),
    updateEnrollment: builder.mutation({
      invalidatesTags: [RTK_TAGS.USER, RTK_TAGS.COURSES],
      query: ({ enrolmentId, body }) => ({
        url: `/enroll/${enrolmentId}`,
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useLogoutMutation,
  useGetAllCoursesQuery,
  useGetCourseContentByIdQuery,
  useEnrollCourseMutation,
  useUpdateEnrollmentMutation,
} = apiSlice;
export default apiSlice;
