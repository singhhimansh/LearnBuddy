import { createClient } from "@/server/supabase/serverClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, password, firstname, lastname, age, gender, photo } =
      body || {};

    if (!email || !password || !firstname) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = await createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return NextResponse.json({ error: signUpError.message }, { status: 400 });
    } else {
      const userId = data.user?.id;

      const { error: profileError } = await supabase.from("users").insert([
        {
          id: userId,
          email,
          firstname,
          lastname,
          age,
          gender,
        },
      ]);

      if (profileError && userId) {
        await supabase.auth.admin.deleteUser(userId); 
        return NextResponse.json(
          { error: profileError.message || "Failed to create user profile" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error("Error signing up user:", error);
    return NextResponse.json(
      { error: error?.message || error || "Internal server error" },
      { status: 500 }
    );
  }
}
