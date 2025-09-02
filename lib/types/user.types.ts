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
};

export interface GetUserResponse {
  message: string;
  data: User;
};
