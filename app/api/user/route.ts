import { createClient } from "@/server/supabase/serverClient";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data, error: errorGetUser } = await supabase.auth.getUser();

    if (errorGetUser) {
      return NextResponse.json(
        { error: errorGetUser.message },
        { status: 400 }
      );
    } else {
      const userId = data.user?.id;

      const { data: userData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError && !userId && !userData) {
        return NextResponse.json(
          { error: profileError.message || "Failed to get user profile" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "User fetched successfully", data: userData },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
