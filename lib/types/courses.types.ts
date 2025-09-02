export interface TCourse {
  id: number;
  created_at: string;            
  title: string;
  description: string;
  keywords?: string[];            
  author: string;
  thumbnail: string;
  isArchived?: boolean | null; 
};

export interface TCoursesResponse {
  data: TCourse[];
};

export interface TLesson {
  id: number;
  created_at: string;          
  title: string;
  description: string;
  course_id: number;
  order: number ;
};

export interface TCourseContent {
  id: number;
  created_at: string;          
  title: string;
  description: string;
  keywords?: string[];
  author: string;
  isArchived?: boolean | null;
  lessons?: TLesson[];
};

export interface TCoursesContentResponse {
  data: TCourseContent;
};


