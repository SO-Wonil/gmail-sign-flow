import { SignatureData, SIGNATURE_TEMPLATES } from "../types/signature";

function getBannerHtml(data: SignatureData): string {
  const template = SIGNATURE_TEMPLATES.find((t) => t.id === data.template);

  // 10주년 기념 템플릿: 배너 이미지 표시
  if (template?.bannerUrl) {
    return `
      <tr>
        <td style="padding-top: 8px;">
          <img src="${template.bannerUrl}" width="100%" style="display: block; height: auto;" alt="banner" />
        </td>
      </tr>`;
  }

  // 기본 템플릿: 구분선 표시 (서명란 너비에 맞춤)
  if (template?.id === "default") {
    const lineColor = data.lineColor || "#4193c6";
    return `
      <tr>
        <td style="padding-top: 8px;">
          <table cellpadding="0" cellspacing="0" border="0" width="${data.width}" style="border-collapse: collapse;">
            <tr>
              <td style="height: 3px; background-color: ${lineColor}; line-height: 0; font-size: 0;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>`;
  }

  return "";
}

export function generateSignatureHtml(data: SignatureData): string {
  return `
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
                      <b style="font-weight: 600; color: #000;">w.</b> https://so.company
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>${getBannerHtml(data)}
      <tr>
        <td style="font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 8px; line-height: 1.4; color: #cdcdcd; padding-top: 8px;">
          This email and any attachments to it may be confidential and are intended solely for the use of the individual to whom it is addressed. Any views or opinions expressed are solely those of the author and do not necessarily represent those of SO & COMPANY Inc. If you are not the intended recipient of this email, you must neither take any action based on its contents nor copy or show it to anyone.Please contact the sender if you believe you have received this email in error.
        </td>
      </tr>
    </table>
  `;
}
