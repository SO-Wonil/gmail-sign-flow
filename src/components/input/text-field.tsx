import { FieldValues, Path } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextFieldProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

const TextField = <TFieldValues extends FieldValues>({
  register,
  name,
  label,
  type,
  placeholder,
}: TextFieldProps<TFieldValues>) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        {...register(name as Path<TFieldValues>)}
        id={name}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
