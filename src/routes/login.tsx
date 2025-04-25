import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";

const Login = () => {
  return <div>Login Page</div>;
};

export const Route = createRoute({
  path: "/login",
  getParentRoute: () => RootRoute,
  component: Login,
});
