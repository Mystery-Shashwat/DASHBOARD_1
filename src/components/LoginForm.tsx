import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Castler_Logo from "../assets/images/cc.avif";
import toast from "react-hot-toast";

interface MyTextInputProps {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  id?: string;
}

const MyTextInput: React.FC<MyTextInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

// Add select input for role selection
interface MySelectInputProps {
  label: string;
  name: string;
  id?: string;
  children: React.ReactNode;
}

const MySelectInput: React.FC<MySelectInputProps> = ({
  label,
  children,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-semibold mb-2"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 ${
          meta.touched && meta.error ? "border-red-500" : ""
        }`}
        {...field}
        {...props}
      >
        {children}
      </select>
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs mt-1">{meta.error}</p>
      ) : null}
    </div>
  );
};

interface LoginFormValues {
  email: string;
  password: string;
  role: string;
}

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);

  const handleClick = () => {
    console.log("Clicking ....");
  };

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      if (values.role === "admin" && !values.email.includes("admin")) {
        throw new Error("Invalid email for admin role.");
      }

      const response = true;
      if (!response) {
        throw new Error("Login failed. Please try again.");
      }

      // Store authentication info including role
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", values.role);

      toast.success("Successfully Logged In!");

      // Navigate based on role
      if (values.role === "admin") {
        navigate("/home");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error("This didn't work.");
      setAuthError("Invalid email or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-cente">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div
          className="w-32 h-10 bg-no-repeat bg-contain bg-center"
          style={{ backgroundImage: "var(--logo-url)" }}
        />
      </div>

      <h2 className="text-2xl font-bold text-center text-textsecondary mb-6">
        Log in to Your Account
      </h2>

      {authError && (
        <p className="text-texterror text-sm text-center mb-4">{authError}</p>
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
          role: "user",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
          role: Yup.string().required("Please select a role"),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <MyTextInput
              label="Email"
              name="email"
              type="email"
              placeholder="yourname@example.com"
            />

            <div className="mt-4">
              <MyTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-4">
              <MySelectInput label="Login As" name="role">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </MySelectInput>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full button text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
              onClick={() => {
                handleClick();
              }}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>

            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-600 text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-textsecondary hover:underline font-semibold"
                >
                  Sign Up
                </Link>
              </p>
              <Link
                to="/forgot-password"
                className="text-textsecondary hover:underline text-sm font-semibold"
              >
                Forgot Password?
              </Link>
            </div>
          </Form>
        )}
      </Formik>
      <div className="flex flex-col items-center mt-6">
        <p className="text-center text-textsecondary text-sm">Powered By</p>
        <img src={Castler_Logo} alt="Castler Logo" className="w-25 h-10 mt-2" />
      </div>
    </div>
  );
};

export default LoginForm;
