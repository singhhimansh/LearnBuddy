import { createClient } from "@/server/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      return NextResponse.json({ error: logoutError.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "User logged out successfully" },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error logging out user:", JSON.stringify(error));
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
