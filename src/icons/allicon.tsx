import allogo from "../assets/apps.png";

interface AllIconProps {
  size: number;
}

export const AllIcon = (props: AllIconProps) => {
  return (
    <>
      <img src={allogo} width={props.size} />
    </>
  );
};
