import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/server/supabase/serverClient";


//single course content 
export async function GET(request: NextRequest,{ params }: { params: { courseId: string } }) {
  try {
    const queryParams = await params;
    const courseId = queryParams?.courseId;
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*").eq("id", courseId).or('isArchived.eq.false,isArchived.is.null').single();

    
    if (error) {
      return NextResponse.json(
        { error: error?.message || error || "Internal server error" },
        { status: 500 }
      );
    }else if (!data) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const { data: lessons, error: lessonsError } = await supabase.from("lessons").select("*").eq("course_id", courseId).order("order", { ascending: true });

    if (lessonsError) {
      return NextResponse.json(
        { error: lessonsError?.message || lessonsError || "Internal server error" },
        { status: 500 }
      );
    }
    
    data.lessons = lessons;
    
    
    return NextResponse.json(
      { data },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error fetching course content:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
    
