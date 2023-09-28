import { Controller, UseFormReturn } from "react-hook-form";
import { TOptionType } from "./CustomCardSelelct";
import CustomInputLabel from "./CustomInputLabel";

export default function CustomSelect(props: {
  formSetup: UseFormReturn<any>;
  name: string;
  label?: string;
  className?: string;
  placeholder?: string;
  options: TOptionType[];
}) {
  const { formSetup, name, label, className, placeholder, options } = props;

  const {
    control,
    formState: { errors },
  }: any = formSetup;

  const isErrors =
    errors[name] && errors[name]["value"] && errors[name]["value"]?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={className || ""}>
          {label ? <CustomInputLabel label={label} name={name} /> : null}

          <select
            {...field}
            className={`block w-full rounded-md py-3 px-2 focus:outline-none sm:text-sm ${
              isErrors
                ? "border-[1px] border-red-500"
                : "border-2 border-stone-200"
            }`}
            value={field?.value?.value || "DEFAULT"}
            onChange={(e) => {
              field.onChange(
                options?.find((item) => item?.value === e.target.value)
              );
            }}
          >
            <option value="DEFAULT" disabled>
              {"Choose one"}
            </option>

            {options?.map((item, index) => (
              <option key={index} value={item?.value}>
                {item?.label}
              </option>
            ))}
          </select>

          {isErrors ? (
            <p className="text-red-500 text-xs">
              {`${errors[name]["value"]?.message || ""}`}
            </p>
          ) : null}
        </div>
      )}
    />
  );
}
