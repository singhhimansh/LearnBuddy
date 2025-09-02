import { createClient } from "@/server/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      return NextResponse.json({ error: loginError.message }, { status: 401 });
    } else {
      const userId = data.user?.id;

      const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", userId).single();
      console.log(profileError);
      console.log(profile);

      if (profileError) {
        return NextResponse.json({ error: profileError?.message || "Internal server error" }, { status: 500 });
      }else if (!profile) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(
        { message: "User logged in successfully",data:profile },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error logging in user:", JSON.stringify(error));
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
