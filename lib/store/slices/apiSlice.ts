import { GetUserResponse } from "@/lib/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TCoursesResponse, TCoursesContentResponse } from "@/lib/types/courses.types";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:  `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
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
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getAllCourses: builder.query<TCoursesResponse, void>({
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
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useLogoutMutation,
  useGetAllCoursesQuery,
  useGetCourseContentByIdQuery,
} = apiSlice;
export default apiSlice;
