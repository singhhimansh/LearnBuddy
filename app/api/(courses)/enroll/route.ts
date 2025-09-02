import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/server/supabase/serverClient";

// enroll a courses
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const courseId = body?.courseId;
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: userError?.message || userError || "Internal server error" },
        { status: 500 }
      );
    } else if (!userData?.user?.id) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { data: enrolledData, error: enrolledError } = await supabase
      .from("courses_enrolled")
      .insert({
        course_id: courseId,
        user_id: userData?.user?.id,
      });

    if (enrolledError) {
      return NextResponse.json(
        {
          error:
            enrolledError?.message || enrolledError || "Internal server error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Course enrolled successfully", data: enrolledData },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in enrolling to courses:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
