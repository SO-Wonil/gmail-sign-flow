import { createRoute, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { Route as RootRoute } from "./__root";

const Login = () => {
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      const accessToken = res.access_token;

      // get user info from google
      try {
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const userInfo = await response.json();
        console.log("User Info:", userInfo);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }

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
