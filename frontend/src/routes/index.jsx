import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/layouts";

/* */
import { ForgotPassword, Login, Otp, SignUp } from "@/pages/Authentication";
import { PasswordUpdateSuccess } from "@/components/Authentication/PasswordUpdate";

/* */

const TaskPilotRoute = createBrowserRouter(
  /* All Paths */
  [
    {
      path: "/",
      children: [
        {
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: "home",
            },
            {
              path: "contactus",
              element: "contactus",
            },
            {
              path: "aboutus",
              element: "aboutus",
            },
            {
              path: "blog-upload",
              element: "blog-upload",
            },
          ],
        },
        {
          /* Authentication Routes For Super Admin */
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "signup",
              element: <SignUp />,
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "otp",
              element: <Otp />,
            },
            {
              path: "passwordupdate",
              element: <PasswordUpdateSuccess />,
            },
          ],
        },
      ],
    },
    {
      /* Admin Router */
      path: "/admin",
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              path: "signup",
              element: <SignUp />,
            },
          ],
        },
      ],
    },
    {
      /* Default Route (404) */
      path: "*",
      element: <>404 - Page Not Found</>,
    },
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default TaskPilotRoute;
