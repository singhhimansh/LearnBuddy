import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/server/supabase/serverClient";

// all courses
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("courses").select("*").or('isArchived.eq.false,isArchived.is.null');
    

    if (error) {
      return NextResponse.json(
        { error: error?.message || error || "Internal server error" },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { data },
      { status: 200 }
    );
    
  } catch (error: any) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
    
