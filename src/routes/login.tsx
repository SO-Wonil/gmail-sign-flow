import { createRoute, useNavigate } from "@tanstack/react-router";
import { useGoogleLogin } from "@react-oauth/google";

import { Button } from "@/components/ui/button";
import { Route as RootRoute } from "./__root";
import { User } from "@/types/user";

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

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await response.json();

        // store user info in local storage
        const user: User = {
          email: userInfo.email,
          accessToken: accessToken,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          imageUrl: userInfo.picture,
        };
        localStorage.setItem("userInfo", JSON.stringify(user));

        navigate({ to: "/" });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (err) => console.log(err),
    scope: "https://www.googleapis.com/auth/gmail.settings.basic",
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
