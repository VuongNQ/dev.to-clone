import { EAppRouter } from "@/types/app";
import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
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
      <Route path={EAppRouter.latest} lazy={() => import("./latest")} />
      <Route path={EAppRouter.top} lazy={() => import("./top")} />
      <Route path={EAppRouter.podcasts} lazy={() => import("./podcasts")} />
      <Route path={EAppRouter.videos} lazy={() => import("./videos")} />
      <Route path={EAppRouter.help} lazy={() => import("./help")} />
      <Route path={EAppRouter.getting} lazy={() => import("./getting")} />
      <Route path={EAppRouter.writing} lazy={() => import("./writing")} />
      <Route path={EAppRouter.customizing} lazy={() => import("./customizing")} />
      <Route path={EAppRouter.reacting} lazy={() => import("./reacting")} />
      <Route path={EAppRouter.badges} lazy={() => import("./badges")} />
      <Route path={EAppRouter.advertising} lazy={() => import("./advertising")} />
      <Route path={EAppRouter.bugs} lazy={() => import("./bugs")} />
      <Route path={EAppRouter.funStuff} lazy={() => import("./funStuff")} />
      <Route path={EAppRouter.community} lazy={() => import("./community")} />
      <Route path={EAppRouter.organizations} lazy={() => import("./organizations")} />
      <Route path={EAppRouter.advertise} lazy={() => import("./advertise")} />
      <Route path={EAppRouter.devshowcase} lazy={() => import("./devshowcase")} />
      <Route path={EAppRouter.contact} lazy={() => import("./contact")} />
      <Route path={EAppRouter.codeofconduct} lazy={() => import("./codeOfConduct")} />
      <Route path={EAppRouter.privacy} lazy={() => import("./privacy")} />
      <Route path={EAppRouter.terms} lazy={() => import("./terms")} />
      <Route path={EAppRouter.admin}>
        <Route index lazy={() => import("./admin")} />
      </Route>
      <Route path={EAppRouter.enter}>
        <Route index lazy={() => import("./enter")} />
      </Route>

    </Route>
  )
);
