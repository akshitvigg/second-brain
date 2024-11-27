import notelogo from "../assets/sticky-note.png";

interface NoteIconProps {
  size: number;
}

export const NoteIcon = (props: NoteIconProps) => {
  return (
    <>
      <img src={notelogo} width={props.size} />
    </>
  );
};
