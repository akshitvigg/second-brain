import logoutLogo from "../assets/logout.png";

interface LogoutIconProps {
  size: number;
}

export const LogoutIcon = (props: LogoutIconProps) => {
  return (
    <>
      <img src={logoutLogo} width={props.size} />
    </>
  );
};
