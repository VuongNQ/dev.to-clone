import { EAppRouter } from "@/types/app";
import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Page404 from "./404";
import Middleware from "./middleware";
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={EAppRouter.root}
      element={<Middleware />}
      errorElement={
        <Suspense fallback={<>Loading</>}>
          <Page404 />
        </Suspense>
      }
    >
      <Route index lazy={() => import("./home")} />
      <Route path={EAppRouter.about} lazy={() => import("./about")} />
      <Route path={EAppRouter.tags} lazy={() => import("./tag")} />
      <Route path={EAppRouter.admin}>
        <Route index lazy={() => import("./admin")} />
      </Route>
    </Route>
  )
);
