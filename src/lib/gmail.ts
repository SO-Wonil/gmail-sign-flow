interface SignatureData {
  name: string;
  title: string;
  phone: string;
  email: string;
  degree?: string;
  width: number;
}

export async function updateGmailSignature(data: SignatureData) {
  const userInfo = localStorage.getItem("userInfo");
  if (!userInfo) {
    throw new Error("User not authenticated");
  }

  const { accessToken } = JSON.parse(userInfo);

  // HTML 서명 생성
  const signatureHtml = `
    <table cellpadding="0" cellspacing="0" border="0" style="width: ${
      data.width
    }px; table-layout: auto; border-collapse: collapse">
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align: top; width: 100%;">
                <table>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 14px; font-weight: 600;">${
                      data.name
                    }</td>
                  </tr>
                  <tr><td style="height: 4px;"></td></tr>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 12px; font-weight: 400; color: #808080; white-space: nowrap;">${
                      data.title
                    }</td>
                  </tr>
                  ${
                    data.degree
                      ? `<tr><td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 12px; font-weight: 400; color: #808080;">${data.degree}</td></tr>`
                      : ""
                  }
                  <tr><td style="height: 16px;"></td></tr>
                </table>
              </td>
              <td style="vertical-align: top;">
                <table>
                  <tr><td></td></tr>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 10px; line-height: 1.4; white-space: nowrap; color: #808080;">
                      <b style="font-weight: 600; color: #000;">t.</b> 82.2.783.3116
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 10px; line-height: 1.4; white-space: nowrap; color: #808080;">
                      <b style="font-weight: 600; color: #000;">m.</b> ${
                        data.phone
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 10px; line-height: 1.4; white-space: nowrap; color: #808080;">
                      <b style="font-weight: 600; color: #000;">e.</b> ${
                        data.email
                      }
                    </td>
                  </tr>
                  <tr>
                    <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 10px; line-height: 1.4; white-space: nowrap; color: #808080;">
                      <b style="font-weight: 600; color: #000;">w.</b> https://sonco.kr
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top: 8px;">
          <img src="https://cdn.prod.website-files.com/652cda7e4101a54c2c782902/6805dd00a4cba42428d42d82_banner.png" width="100%" style="display: block; height: auto;" alt="divider" />
        </td>
      </tr>
      <tr>
        <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 8px; line-height: 1.4; color: #cdcdcd;">
          This email and any attachments to it may be confidential and are intended solely for the use of the individual to whom it is addressed. Any views or opinions expressed are solely those of the author and do not necessarily represent those of SO & COMPANY Inc. If you are not the intended recipient of this email, you must neither take any action based on its contents nor copy or show it to anyone.Please contact the sender if you believe you have received this email in error.
        </td>
      </tr>
    </table>
  `;

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
