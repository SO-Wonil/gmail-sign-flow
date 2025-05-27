import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const signatureSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  title: z.string().min(1, "직책과 팀을 입력해주세요"),
  phone: z.string().min(1, "전화번호를 입력해주세요"),
  email: z.string().email("올바른 이메일 형식이 아닙니다"),
  degree: z.string().optional(),
  width: z.number().min(360).max(500),
});

type SignatureFormData = z.infer<typeof signatureSchema>;

interface SignatureFormProps {
  onUpdate: (data: SignatureFormData) => void;
  defaultEmail: string;
}

export default function SignatureForm({
  onUpdate,
  defaultEmail,
}: SignatureFormProps) {
  const [formData, setFormData] = useState<SignatureFormData>({
    name: "",
    title: "",
    phone: "",
    email: defaultEmail,
    width: 400,
  });

  const {
    register,
    formState: { errors },
  } = useForm<SignatureFormData>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      width: 400,
    },
  });

  const [isEditingWidth, setIsEditingWidth] = useState(false);
  const [editingWidth, setEditingWidth] = useState<string | number>(400);
  const widthInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem("emailSignatureData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData({
        ...parsedData,
        width: Number(parsedData.width),
      });
    }
  }, []);

  useEffect(() => {
    setEditingWidth(formData.width);
  }, [isEditingWidth, formData.width]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignatureFormData
  ) => {
    const value = e.target.value;
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    localStorage.setItem("emailSignatureData", JSON.stringify(newData));
    onUpdate(newData);
  };

  const handleReset = () => {
    const resetData = {
      name: "",
      title: "",
      phone: "",
      email: defaultEmail,
      width: 400,
    };
    setFormData(resetData);
    localStorage.removeItem("emailSignatureData");
    onUpdate(resetData);
  };

  // width 직접 입력 핸들러
  const handleWidthInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditingWidth(value);
  };

  const handleWidthInputBlur = () => {
    let value = Number(editingWidth);
    if (isNaN(value) || value === 0) value = 360;
    if (value < 360) value = 360;
    if (value > 500) value = 500;
    if (value !== formData.width) {
      const newData = { ...formData, width: value };
      setFormData(newData);
      localStorage.setItem("emailSignatureData", JSON.stringify(newData));
      onUpdate(newData);
    }
    setIsEditingWidth(false);
  };

  const handleWidthInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      let value = Number(editingWidth);
      if (isNaN(value) || value === 0) value = 360;
      if (value < 360) value = 360;
      if (value > 500) value = 500;
      if (value !== formData.width) {
        const newData = { ...formData, width: value };
        setFormData(newData);
        localStorage.setItem("emailSignatureData", JSON.stringify(newData));
        onUpdate(newData);
      }
      setIsEditingWidth(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-white p-5 rounded-lg shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            placeholder="영어 이름을 입력하세요"
            {...register("name")}
            value={formData.name}
            onChange={(e) => handleChange(e, "name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title | Dept. *</Label>
          <Input
            id="title"
            placeholder="직책과 팀을 입력하세요"
            {...register("title")}
            value={formData.title}
            onChange={(e) => handleChange(e, "title")}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            placeholder="예: 82.10.0000.0000"
            {...register("phone")}
            value={formData.phone}
            onChange={(e) => handleChange(e, "phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            placeholder="예: abcdefg.hijk@sonco.kr"
            {...register("email")}
            value={formData.email}
            onChange={(e) => handleChange(e, "email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <p className="text-xs text-gray-500">미입력시 미표기</p>
          <Input
            id="degree"
            placeholder="예: RPh, PharmD"
            {...register("degree")}
            value={formData.degree}
            onChange={(e) => handleChange(e, "degree")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">서명란 너비</Label>
          <p className="text-xs text-gray-500">360px ~ 500px</p>
          <div className="flex items-center gap-4">
            <Slider
              id="width"
              min={360}
              max={500}
              step={1}
              value={[
                isEditingWidth
                  ? typeof editingWidth === "number"
                    ? editingWidth
                    : Number(editingWidth) || 360
                  : formData.width,
              ]}
              onValueChange={(value) => {
                if (isEditingWidth) {
                  setEditingWidth(value[0]);
                } else {
                  const newData = { ...formData, width: value[0] };
                  setFormData(newData);
                  localStorage.setItem(
                    "emailSignatureData",
                    JSON.stringify(newData)
                  );
                  onUpdate(newData);
                }
              }}
              className="w-[200px]"
              disabled={isEditingWidth && typeof editingWidth === "string"}
            />
            {isEditingWidth ? (
              <input
                ref={widthInputRef}
                type="number"
                min={360}
                max={500}
                value={editingWidth}
                onChange={handleWidthInputChange}
                onBlur={handleWidthInputBlur}
                onKeyDown={handleWidthInputKeyDown}
                className="w-[60px] border rounded px-1 py-0.5 text-center text-sm"
                autoFocus
              />
            ) : (
              <span
                className="min-w-[60px] cursor-pointer select-none border-b border-dotted border-gray-400 hover:bg-gray-100"
                onClick={() => setIsEditingWidth(true)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setIsEditingWidth(true);
                }}
                title="클릭해서 직접 입력"
              >
                {formData.width}px
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
