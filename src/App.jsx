import { RouterProvider } from "react-router-dom";
import Login from "./features/identity/components/Login";
import Register from "./features/identity/components/Register";
import router from "./router";

function App() {
  return (
    // <Login />
    <RouterProvider router={router} />
    //   sls
  );
}

export default App;
