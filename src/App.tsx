import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import Auth from "./components/pages/Auth";
import Layout from "./components/pages/Layout";
import { Toaster } from "./components/ui/toaster";
import { DBContext, initializeDB } from "./database";
import { KanbanDB } from "./database/types";

const router = createBrowserRouter([
  { path: "", element: <Layout /> },
  { path: "/login", element: <Auth /> },
  { path: "/signup", element: <Auth /> },
]);

function App() {
  const [db, setDb] = useState<KanbanDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      const _db = await initializeDB();
      setDb(_db);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <DBContext.Provider value={db}>
        {!isLoading && <RouterProvider router={router} />}
      </DBContext.Provider>
      <Toaster />
    </>
  );
}

export default App;
