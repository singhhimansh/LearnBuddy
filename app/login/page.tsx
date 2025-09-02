"use client";

import Input from "@/lib/components/Input";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Login</h1>
      <Input
        label="Email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        // startAdornment={
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     fill="none"
        //     stroke="currentColor"
        //     stroke-width="2"
        //     stroke-linecap="round"
        //     stroke-linejoin="round"
        //     className="lucide lucide-search-icon lucide-search"
        //   >
        //     <path d="m21 21-4.34-4.34" />
        //     <circle cx="11" cy="11" r="8" />
        //   </svg>
        // }
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}
