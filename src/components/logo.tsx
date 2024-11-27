interface LogoProps {
  size: number;
  src: string;
}

export const MainLogo = (props: LogoProps) => {
  return (
    <>
      <div>
        <img src={props.src} width={props.size} />
      </div>
    </>
  );
};
