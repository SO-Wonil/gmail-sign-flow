import { createRoute } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";

import LoginButton from "@/components/button/login-button";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LoginButton />
    </div>
  );
};

export const Route = createRoute({
  path: "/login",
  getParentRoute: () => RootRoute,
  component: Login,
});
