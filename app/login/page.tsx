"use client";

import Button from "@/lib/components/Button";
import Card from "@/lib/components/Card";
import Input from "@/lib/components/Input";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  isSigningUp: false,
};

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signUpSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  firstname: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be at most 20 characters"),
  lastname: yup
    .string()
    .notRequired()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be at most 20 characters"),
});

export default function Login() {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const formik = useFormik<typeof initialValues>({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: isSigningUp ? signUpSchema : loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  return (
    <div className="flex justify-center items-center mt-40">
      <Card>
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold">
            {isSigningUp ? "Sign Up" : "Log In"}
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-4 w-full">
            {isSigningUp && (
              <>
                <Input
                  label="First Name"
                  name="firstname"
                  type="text"
                  required
                  placeholder="First Name"
                  error={formik.touched.firstname && formik.errors.firstname}
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <Input
                
                  label="Last Name"
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                  error={formik.touched.lastname && formik.errors.lastname}
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </>
            )}
            <Input
              label="Email"
              required
              name="email"
              type="text"
              placeholder="Email"
              error={formik.touched.email && formik.errors.email}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <Input
              required
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              error={formik.touched.password && formik.errors.password}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <div className="flex flex-col justify-end">
              <Button
                disabled={!formik.isValid}
                label={formik.values.isSigningUp ? "Sign Up" : "Login"}
                type="submit"
              />
              <Button
                label={
                  isSigningUp
                    ? "Already have an account? Login"
                    : "Not a user? Sign up"
                }
                name="isSigningUp"
                variant="neutral"
                sx={{ label: "text-gray-500 text-xs underline m-0 p-0 w-fit" }}
                onClick={() => setIsSigningUp((i) => !isSigningUp)}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
