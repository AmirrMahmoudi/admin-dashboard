import { createBrowserRouter } from "react-router-dom";
import Login, { loginAction } from "./features/identity/components/login/Login";
import Register, {
  registerAction,
} from "./features/identity/components/register/Register";
import IdentityLayout from "./layouts/IdentityLayout";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Courses, { coursesLoader } from "./pages/Courses";
import CourseCategories, { categoriesLoader } from "./pages/CourseCategories";
import CourseDetails, {
  courseDetailsLoader,
} from "./features/courses/components/CourseDetails";
import { CategoryProvider } from "./features/categories/components/CategoryContext";
import NotFound from "./pages/NotFound";
import UnhandledException from "./pages/UnhandledException";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <UnhandledException />,
    children: [
      {
        index: true,
        element: <Courses />,
        loader: coursesLoader,
      },
      {
        path: "courses/:id",
        element: <CourseDetails />,
        loader: courseDetailsLoader,
      },
      {
        path: "course-categories",
        element: (
          <CategoryProvider>
            <CourseCategories />
          </CategoryProvider>
        ),
        loader: categoriesLoader,
      },
    ],
  },
  {
    element: <IdentityLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
        errorElement: <Login />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
        errorElement: <Register />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
