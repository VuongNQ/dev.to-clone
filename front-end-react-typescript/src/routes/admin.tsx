import config from "@/config/config";

import Home from "@/pages/home/home";
import About from "@/pages/about/about";
import Tags from "@/pages/tags/tags";
import Latest from "@/pages/home/component/Lastest/lastest";

export const pulicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.about, component: About},
    {path: config.routes.tags, component: Tags},
    {path: config.routes.latest, component: Latest}
]

export const privateRoutes = [];