import { useForm } from "react-hook-form";
import { Form, FormControl, FormItem, FormLabel } from "../ui/form";
import TextField from "@/components/input/text-field";

const SignatureForm = () => {
  const form = useForm();

  return (
    <>
      <Form {...form}>
        <FormItem>
          <TextField
            register={form.register}
            type="text"
            name="signature"
            label="hi"
          />
        </FormItem>
      </Form>
    </>
  );
};

export default SignatureForm;
