import { useState, useEffect } from "react";
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
    handleSubmit,
    formState: { errors },
  } = useForm<SignatureFormData>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      width: 400,
    },
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof SignatureFormData
  ) => {
    const value = e.target.value;
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const onSubmit = (data: SignatureFormData) => {
    localStorage.setItem("emailSignatureData", JSON.stringify(data));
    onUpdate(data);
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[400px] bg-white p-5 rounded-lg shadow-sm"
    >
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
              value={[formData.width]}
              onValueChange={(value) => {
                const newData = { ...formData, width: value[0] };
                setFormData(newData);
                onUpdate(newData);
              }}
              className="w-[200px]"
            />
            <span className="min-w-[60px]">{formData.width}px</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
