import config from "@/config/config";

import Home from "@/pages/home/home";
import About from "@/pages/about/about";
import Tags from "@/pages/tags/tags";


export const pulicRoutes = [
    {path: config.routes.home, component: Home},
    {path: config.routes.about, component: About},
    {path: config.routes.tags, component: Tags}
]

export const privateRoutes = [];