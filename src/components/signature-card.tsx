interface SignatureData {
  name: string;
  title: string;
  phone: string;
  email: string;
  degree?: string;
  width: number;
}

interface SignatureCardProps {
  data: SignatureData | null;
}

export default function SignatureCard({ data }: SignatureCardProps) {
  if (!data) return null;

  return (
    <table
      className="signature-card"
      cellPadding="0"
      cellSpacing="0"
      border={0}
      style={{
        width: "auto",
        tableLayout: "auto",
        borderCollapse: "collapse",
        maxWidth: `${data.width}px`,
      }}
    >
      <tbody>
        <tr className="profile-section">
          <td colSpan={1}>
            <table
              width="100%"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              style={{ width: "100%" }}
            >
              <tbody>
                <tr>
                  <td className="info-block">
                    <table>
                      <tbody>
                        <tr>
                          <td className="name title">{data.name}</td>
                        </tr>
                        <tr>
                          <td
                            className="space-block"
                            style={{ height: "4px" }}
                          ></td>
                        </tr>
                        <tr>
                          <td
                            className="title_department subtitle"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {data.title}
                          </td>
                        </tr>
                        {data.degree && (
                          <tr>
                            <td className="degree subtitle">{data.degree}</td>
                          </tr>
                        )}
                        <tr>
                          <td
                            className="space-block"
                            style={{ height: "16px" }}
                          ></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className="contact-block">
                    <table>
                      <tbody>
                        <tr>
                          <td className="space-block"></td>
                        </tr>
                        <tr>
                          <td className="contact">
                            <b className="contact-title">t.</b>
                            <span> 82.2.783.3116</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="contact">
                            <b className="contact-title">m.</b>
                            <span>{data.phone}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="contact">
                            <b className="contact-title">e.</b>
                            <span>{data.email}</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="contact">
                            <b className="contact-title">w.</b> https://sonco.kr
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>

        <tr className="divider-section">
          <td style={{ paddingTop: "8px" }}>
            <img
              src="https://cdn.prod.website-files.com/652cda7e4101a54c2c782902/6805dd00a4cba42428d42d82_banner.png"
              width="100%"
              style={{ display: "block", height: "auto" }}
              alt="divider"
            />
          </td>
        </tr>

        <tr className="disclaimer-section">
          <td className="disclaimer-text">
            This email and any attachments to it may be confidential and are
            intended solely for the use of the individual to whom it is
            addressed. Any views or opinions expressed are solely those of the
            author and do not necessarily represent those of SO & COMPANY Inc.
            If you are not the intended recipient of this email, you must
            neither take any action based on its contents nor copy or show it to
            anyone.Please contact the sender if you believe you have received
            this email in error.
          </td>
        </tr>
      </tbody>
    </table>
  );
}
