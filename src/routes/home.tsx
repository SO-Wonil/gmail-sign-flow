import { createRoute, redirect, useRouteContext } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import { Button } from "@/components/ui/button";
import SignatureForm from "@/components/signature-form";

const Home = () => {
  const { user } = useRouteContext({ from: "/" });
  console.log(user);

  return (
    <div>
      <SignatureForm />
      <div>
        <Button>Update Signature</Button>
      </div>
    </div>
  );
};

export const Route = createRoute({
  path: "/",
  getParentRoute: () => RootRoute,
  beforeLoad: () => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      throw redirect({ to: "/login" });
    }

    const parsedUserInfo = JSON.parse(userInfo);
    return {
      user: parsedUserInfo,
    };
  },
  component: Home,
});
