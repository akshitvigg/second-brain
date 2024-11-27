import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcons?: ReactElement;
  endIcon?: any;
  width?: string;
  center?: boolean;
  modalwidth?: string;
  disabled?: any;
  onClick?: () => void;
}
type Variants = "primary" | "secondary";

const variantStyle = new Map<Variants, string>();
variantStyle.set(
  "primary",
  "bg-purple-600 hover:bg-purple-500 font-apple text-white active:bg-purple-500 "
);
variantStyle.set(
  "secondary",
  " font-apple bg-purple-300 text-purple-600 hover:bg-purple-500 hover:text-white active:bg-purple-600 "
);

type Sizes = "sm" | "md" | "lg";

const sizeStyles = new Map<Sizes, string>();
sizeStyles.set("lg", " py-2 px-5 text-xl rounded-lg");
sizeStyles.set("md", "py-2 px-4 text-lg rounded-md ");
sizeStyles.set("sm", "py-1 px-2 text-xs rounded-md");

export const Button = (props: ButtonProps) => {
  return (
    <>
      <button
        onClick={props.onClick}
        className={`${variantStyle.get(props.variant)} ${sizeStyles.get(
          props.size
        )} transition-all duration-300 ease-in-out active:scale-95 ${
          props.width && "w-72"
        } ${props.modalwidth && "w-96"} `}
      >
        <div
          className={
            props.center
              ? "flex items-center justify-center"
              : "flex items-center"
          }
        >
          {props.startIcons}
          <div className="pl-2">{props.text}</div>
        </div>
      </button>
    </>
  );
};
