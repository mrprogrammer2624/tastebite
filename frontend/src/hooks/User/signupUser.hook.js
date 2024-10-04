import { useState } from "react";
import { axiosApi } from "@/axiosApi";

const SignupHook = () => {
  const [error, setError] = useState({});
  const [buttonLoader, setButtonLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoader(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const response = await axiosApi({
        method: "post",
        url: ``,
        data: formData,
        config,
      });

      console.log("Sign up successful:", response.data);
      setError({});
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("An error occurred during login.");
      }
    } finally {
      setButtonLoader(false);
    }
  };

  return {
    error,
    buttonLoader,
    formData,
    handleInputChange,
    handleSubmit,
  };
};

export default SignupHook;
