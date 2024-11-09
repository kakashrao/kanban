import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Auth from "./components/pages/Auth";
import Layout from "./components/pages/Layout";

const router = createBrowserRouter([
  { path: "", element: <Layout /> },
  { path: "/login", element: <Auth /> },
  { path: "/signup", element: <Auth /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
