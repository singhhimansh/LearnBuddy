"use client";
import { useRouter } from "next/navigation";
import en from "../constants/en";
import Button from "./Button";
import { useSelector } from "react-redux";
import { StoreState } from "../store";
import apiSlice, { useGetUserQuery, useLogoutMutation } from "../store/slices/apiSlice";
import APP_ROUTES from "../constants/appRoutes";
import { setUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Avatar from "./Avatar";
import Loader from "./Loader";
import Toast from "./Toast";

export default function Navbar() {
  const router = useRouter();
  const user = useSelector((state: StoreState) => state.user.user);
  const dispatch = useDispatch();

  const [logout] = useLogoutMutation();

  const {
    data,
    isSuccess: isUserSuccess,
    isLoading: isUserLoading,
    
  } = useGetUserQuery(undefined, {
    skip: Boolean(user),
  });

  useEffect(() => {
    if (isUserSuccess && data?.data) {
      dispatch(setUser(data?.data));
    }
  }, [data, isUserSuccess]);

  const isLoggedIn = Boolean(user);

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(setUser(null));
        dispatch(apiSlice.util.resetApiState());
        router.push(APP_ROUTES.LOGIN);
        Toast.success("User logged out!");
      })
      .catch((err) => {
        Toast.error("Logout failed");
        console.log("Logout failed", err);
      });
  };

  if (isUserLoading) return <Loader isLoading={isUserLoading} overlay />;

  return (
    <div className="navbar bg-base-100 shadow-sm px-8">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{en.navbar.title}</a>
      </div>
      <div className="flex-none">
        {/* login /signup */}
        {isLoggedIn ? (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <p>Hi {user?.firstname},</p>

              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Avatar
                    firstName={user?.firstname}
                    lastName={user?.lastname}
                    url={user?.photoUrl}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              {/* <li>
                <a>Settings</a>
              </li> */}
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Button label="Login" onClick={() => router.push(APP_ROUTES.LOGIN)} />
        )}
      </div>
    </div>
  );
}
