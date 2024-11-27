export interface Sizeprops {
  size: "sm" | "md" | "lg";
}

type SizeProps = "sm" | "md" | "lg";

export const sizeStyles = new Map<SizeProps, string>();
sizeStyles.set("lg", "size-6");
sizeStyles.set("md", "size-4");
sizeStyles.set("sm", "size-3");

export interface iconsProps {
  size: "sidebar" | "cards";
}

type sizeType = "sidebar" | "cards";

export const sizeStylesIcons = new Map<sizeType, string>();
sizeStylesIcons.set("sidebar", "25px");
sizeStylesIcons.set("cards", "18px");
