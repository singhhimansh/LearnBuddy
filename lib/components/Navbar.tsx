"use client";
import { useRouter } from "next/navigation";
import en from "../constants/en";
import Button from "./Button";

export default function Navbar() {
  //  const fetchUser = async () => {
  //   const supabase = await createClient();
  //   const { data: user } = await supabase.auth.getUser();
  //   return user;

  // };

  const router = useRouter();


  const isLoggedIn = false;

  const handleLoginClick = () => {
    router.push("/login");
  }
    
  

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{en.navbar.title}</a>
      </div>
      <div className="flex-none">
        {/* login /signup */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Button label="Login" onClick={handleLoginClick} />
        )}
      </div>
    </div>
  );
}
