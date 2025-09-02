import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/server/supabase/serverClient";

// enroll a courses
const allowedEnrollStatus = ["NOTSTARTED","INPROGRESS","COMPLETED","WITHDRAWN"]
export async function PATCH(request: NextRequest,{ params }: { params: { courseId: string } }) {
  try {
    const queryParams = await params;
    const courseId = queryParams?.courseId;
    const body = await request.json();

    const {status}=body;

    if(!allowedEnrollStatus.includes(status.toUpperCase())){
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    
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
      .update({
        status:status.toUpperCase() ,
        updated_at: new Date(),
      })
      .eq("course_id", courseId )
      .eq("user_id", userData?.user?.id);
      

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
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in updating erollment:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
