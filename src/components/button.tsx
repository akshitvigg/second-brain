import { ReactElement, ReactNode } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: ReactNode;
  startIcons?: ReactElement;
  endIcon?: any;
  width?: string;
  center?: boolean;
  modalwidth?: string;
  disabled?: boolean;
  loading?: boolean;
  modal?: boolean;
  space?: boolean;
  onClick?: () => void;
}

type Variants = "primary" | "secondary";

const variantStyle = new Map<Variants, string>();
variantStyle.set(
  "primary",
  "bg-purple-600 hover:bg-purple-500  text-white active:bg-purple-500"
);
variantStyle.set(
  "secondary",
  "  bg-purple-300 text-purple-600 hover:bg-purple-500 hover:text-white active:bg-purple-600"
);

type Sizes = "sm" | "md" | "lg";

const sizeStyles = new Map<Sizes, string>();
sizeStyles.set("lg", "py-2 sm:px-5 px-4 text-sm  sm:text-xl rounded-lg");
sizeStyles.set("md", "py-2 sm:px-4 px-2 sm:text-lg text-sm  rounded-md");
sizeStyles.set("sm", "py-1 px-2 text-xs rounded-md");

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
      className={`${variantStyle.get(props.variant)} ${sizeStyles.get(
        props.size
      )} transition-all duration-300 ease-in-out active:scale-95 ${
        props.width ? "w-72" : ""
      } ${props.modalwidth ? "w-[335px]" : ""} relative ${
        props.loading ? "ld-ext-right running" : ""
      } ${props.modal && "sm:py-3 py-2"} ${props.space && "mr-4"}`}
    >
      <div
        className={
          props.center
            ? "flex items-center justify-center"
            : "flex items-center"
        }
      >
        {props.startIcons && !props.loading && props.startIcons}{" "}
        <div className="pl-2">{props.loading ? "" : props.text}</div>{" "}
        {props.loading && <div className="ld ld-ring ld-spin"></div>}{" "}
      </div>
    </button>
  );
};
