import { SignatureData } from "../types/signature";
import { generateSignatureHtml } from "@/lib/signature-generator";

interface SignatureCardProps {
  data: SignatureData | null;
}

export default function SignatureCard({ data }: SignatureCardProps) {
  if (!data) return null;

  return (
    <div
      className="signature-card"
      dangerouslySetInnerHTML={{ __html: generateSignatureHtml(data) }}
    />
  );
}
