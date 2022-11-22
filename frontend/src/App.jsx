import {RouterProvider, createBrowserRouter} from "react-router-dom";

import {Index} from "./pages";
import {Create} from "./pages/create";
import {View} from "./pages/view";
import { Auth } from "./pages/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
