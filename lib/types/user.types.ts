export type EnrolledCourse = {
  courseId: number;
  title: string;
  author: string;
  keywords?: string[];
  created_at: string;       
  description: string;
  status: string;          
};

export interface User {
  id: string;
  created_at: string;
  firstname: string;
  lastname?: string | null;
  age?: number | null;
  gender?: string | null;
  email: string;
  photoUrl?: string | null;
  dob?: string | null;
  interests?: string | null;
  updated_at?: string | null;
  enrolledCourses?: EnrolledCourse[];
};



export interface GetUserResponse {
  message: string;
  data: User;
};
