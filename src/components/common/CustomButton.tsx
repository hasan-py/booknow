import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface ICustomButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title: string;
}

export default function CustomButton(props: ICustomButton) {
  return (
    <button
      className="w-full text-center p-2 md:px-4 md:py-2 cursor-pointer font-semibold uppercase text-xs rounded shadow hover:shadow-lg ease-linear transition-all duration-150 text-stone-600 border border-stone-300 hover:border-orange-500 hover:text-orange-500"
      {...props}
    >
      {props?.title}
    </button>
  );
}
