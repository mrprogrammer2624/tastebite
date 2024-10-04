import { useState } from "react";
import { axiosApi } from "@/axiosApi";
import { useNavigate } from "react-router-dom";

const LoginHook = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!credentials.email) tempErrors.email = "Email is required.";
    if (!credentials.password) tempErrors.password = "Password is required.";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const response = await axiosApi({
        method: "post",
        url: ``,
        data: credentials,
      });

      const { token, role } = response.data;
      if (token) {
        document.cookie = `auth-token=${token}; path=/`;

        // Role-based redirection
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "user") {
          navigate("/");
        } else {
          console.error("Unknown role:", role);
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return {
    errors,
    rememberMe,
    loading,
    credentials,
    handleChange,
    setRememberMe,
    handleSubmit,
  };
};

export default LoginHook;
