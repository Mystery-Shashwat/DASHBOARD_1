import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Castler_Logo from "../assets/images/cc.avif";
import toast from "react-hot-toast";

interface SignUpFormProps {
  onSignup?: () => void;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignup }) => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      // Check if the role matches the email pattern
      // For admin: email should contain "admin"
      if (values.role === "admin" && !values.email.includes("admin")) {
        throw new Error("Email format is not valid for admin role.");
      }
      
      const response = true;
      // const response = await fetch("https://mockapi.com/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(values),
      // });

      if (!response) {
        throw new Error("Signup failed. Please try again.");
      }

      // Store role information
      localStorage.setItem("userRole", values.role);

      if (onSignup) {
        toast.success("Successfully Signed Up!");
        
        // Navigate based on role
        if (values.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    } catch (error: any) {
      setFieldError("email", error.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div
          className="w-32 h-10 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "var(--logo-url)" }}
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-textsecondary mb-6">
        Create an Account!
      </h2>

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user"
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Confirm Password is required"),
          role: Yup.string()
            .required("Please select a role")
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                placeholder="Your Name"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-texterror text-xs mt-1"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                placeholder="yourname@example.com"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-texterror text-xs mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <Field
                name="password"
                type="password"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-texterror text-xs mt-1"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Confirm Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-texterror text-xs mt-1"
              />
            </div>

            {/* Role Selection Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Account Type
              </label>
              <Field
                as="select"
                name="role"
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Field>
              <ErrorMessage
                name="role"
                component="p"
                className="text-texterror text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full button text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-textsecondary hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>

      {/* Powered By Section */}
      <div className="flex flex-col items-center mt-6">
        <p className="text-center text-textsecondary text-sm">Powered By</p>
        <img
          src={Castler_Logo}
          alt="Castler Logo"
          className="w-25 h-10 mt-2"
        />
      </div>
    </div>
  );
};

export default SignUpForm;