export type SignatureTemplate = "10th-anniversary" | "default";

export interface SignatureTemplateOption {
  id: SignatureTemplate;
  label: string;
  bannerUrl: string | null;
}

export const SIGNATURE_TEMPLATES: SignatureTemplateOption[] = [
  {
    id: "10th-anniversary",
    label: "10주년 기념",
    bannerUrl:
      "https://cdn.prod.website-files.com/652cda7e4101a54c2c782902/6805dd00a4cba42428d42d82_banner.png",
  },
  {
    id: "default",
    label: "기본",
    bannerUrl: null,
  },
];

export interface SignatureData {
  name: string;
  title: string;
  phone: string;
  email: string;
  degree?: string;
  width: number;
  template?: SignatureTemplate;
  lineColor?: string;
}
