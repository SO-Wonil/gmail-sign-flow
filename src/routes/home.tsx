import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";

const Home = () => {
  return <div>Home</div>;
};

export const Route = createRoute({
  path: "/",
  getParentRoute: () => RootRoute,
  component: Home,
});
