import { createRoute, redirect } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import SignatureForm from "@/components/signature-form";
import SignatureCard from "@/components/signature-card";
import "@/styles/signature.css";
import { useState, useEffect } from "react";

interface SignatureData {
  name: string;
  title: string;
  phone: string;
  email: string;
  degree?: string;
  width: number;
}

const Home = () => {
  const [signatureData, setSignatureData] = useState<SignatureData | null>(
    null
  );

  useEffect(() => {
    const savedData = localStorage.getItem("emailSignatureData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSignatureData({
        ...parsedData,
        width: Number(parsedData.width),
      });
    }
  }, []);

  const handleSignatureUpdate = (data: SignatureData) => {
    setSignatureData(data);
  };

  return (
    <div className="flex justify-center items-start gap-8 p-8 min-h-screen bg-gray-50">
      <SignatureForm onUpdate={handleSignatureUpdate} />
      <div className="sticky top-8 bg-white p-5 rounded-lg shadow-sm">
        <SignatureCard data={signatureData} />
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
