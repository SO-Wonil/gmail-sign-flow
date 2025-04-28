import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";

const LoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
  return (
    <>
      <Button variant="ghost" onClick={() => login()}>
        Login
      </Button>
    </>
  );
};

export default LoginButton;
