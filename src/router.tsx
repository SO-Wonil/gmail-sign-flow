import { createRouter } from "@tanstack/react-router";
import { Route as RootRoute } from "./routes/__root";
import { Route as LoginRoute } from "./routes/login";
import { Route as HomeRoute } from "./routes/home";

const routeTree = RootRoute.addChildren([LoginRoute, HomeRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
