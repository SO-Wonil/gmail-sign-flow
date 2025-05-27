import { SignatureData } from "../types/signature";
import { generateSignatureHtml } from "./signature-generator";

export async function updateGmailSignature(data: SignatureData) {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    throw new Error("User not authenticated");
  }

  const { accessToken } = JSON.parse(userInfo);

  // HTML 서명 생성
  const signatureHtml = generateSignatureHtml(data);

  try {
    // Gmail API를 통해 서명 업데이트
    const response = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sendAs settings");
    }

    const sendAsSettings = await response.json();
    const primarySendAs = sendAsSettings.sendAs.find(
      (setting: any) => setting.isPrimary
    );

    if (!primarySendAs) {
      throw new Error("No primary sendAs setting found");
    }

    const updateResponse = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${encodeURIComponent(
        primarySendAs.sendAsEmail
      )}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: signatureHtml,
        }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update signature");
    }

    return true;
  } catch (error) {
    console.error("Error updating signature:", error);
    throw error;
  }
}
