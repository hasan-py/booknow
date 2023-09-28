import { Controller, UseFormReturn } from "react-hook-form";
import CustomInputLabel from "./CustomInputLabel";

export default function CustomInput(props: {
  formSetup: UseFormReturn<any>;
  name: string;
  label?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const { formSetup, name, label, type, className, placeholder, onChange } =
    props;

  const {
    control,
    formState: { errors },
  } = formSetup;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={className || ""}>
          {label ? <CustomInputLabel label={label} name={name} /> : null}

          <input
            {...field}
            onChange={onChange || field.onChange}
            type={type || "text"}
            placeholder={placeholder || ""}
            className={`block w-full rounded-md p-1 px-2 md:p-2  ${
              errors[name]?.message
                ? "border-[1px] border-red-500"
                : "border-2 border-stone-200"
            } focus:outline-none sm:text-sm`}
          />

          {errors[name] && errors[name]?.message ? (
            <p className="text-red-500 text-xs">
              {`${errors[name]?.message || ""}`}
            </p>
          ) : null}
        </div>
      )}
    />
  );
}
