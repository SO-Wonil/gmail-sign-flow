import { createRoute, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";

import { Route as RootRoute } from "./__root";

const Login = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      navigate({ to: "/" });
    },
    onError: (err) => console.log(err),
  });

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Button variant="ghost" onClick={handleGoogleLogin}>
        Login
      </Button>
    </div>
  );
};

export const Route = createRoute({
  path: "/login",
  getParentRoute: () => RootRoute,
  component: Login,
});
