import { createBrowserRouter } from "react-router-dom";
import { Nails } from "./pages/Nails/Nails";
import { Photos } from "./pages/Photos/Photos";
import { Suspense } from "react";
import { App } from "./App";
import { Task } from "./pages/Task/Task";

export const AppRouter = () =>
  createBrowserRouter([
    {
      element: (
        <Suspense fallback={<div>Загрузка...</div>}>
          <App />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <Nails />,
        },
        {
          path: "/photos",
          element: <Photos />,
        },
        {
          path: "/task",
          element: <Task />,
        },
      ],
    },
  ]);
