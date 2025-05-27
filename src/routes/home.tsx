import { createRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Route as RootRoute } from "./__root";
import SignatureForm from "@/components/signature-form";
import SignatureCard from "@/components/signature-card";
import "@/styles/signature.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateGmailSignature } from "@/lib/gmail";

interface SignatureData {
  name: string;
  title: string;
  phone: string;
  email: string;
  degree?: string;
  width: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [signatureData, setSignatureData] = useState<SignatureData | null>(
    null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // 로그인한 사용자의 이메일 가져오기
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const { email } = JSON.parse(userInfo);
      setUserEmail(email);
    }

    // 로컬스토리지에서 저장된 데이터 가져오기
    const savedData = localStorage.getItem("emailSignatureData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setSignatureData({
        ...parsedData,
        width: Number(parsedData.width),
      });
    } else if (userEmail) {
      // 저장된 데이터가 없고 이메일이 있는 경우 기본값 설정
      setSignatureData({
        name: "",
        title: "",
        phone: "",
        email: userEmail,
        width: 400,
      });
    }
  }, [userEmail]);

  const handleSignatureUpdate = (data: SignatureData) => {
    setSignatureData(data);
  };

  const handleUpload = async () => {
    if (!signatureData) {
      alert("서명 데이터가 없습니다.");
      return;
    }

    try {
      setIsUploading(true);
      await updateGmailSignature(signatureData);
      alert("서명이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error uploading signature:", error);
      alert("서명 업데이트에 실패했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate({ to: "/login" });
  };

  return (
    <div className="flex justify-center items-start gap-8 p-8 pt-16 min-h-screen bg-gray-50">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="absolute -top-12 left-0"
          >
            로그아웃
          </Button>
          <SignatureForm
            onUpdate={handleSignatureUpdate}
            defaultEmail={userEmail}
          />
        </div>
        <Button
          onClick={handleUpload}
          disabled={!signatureData || isUploading}
          className="w-full"
        >
          {isUploading ? "업로드 중..." : "Gmail 서명 업로드"}
        </Button>
      </div>
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
