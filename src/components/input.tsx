interface inputProps {
  placeholder: string;
  reference?: any;
  width?: string;
  modal ? : boolean
}

export const InputComp = ({ placeholder, reference, width,modal }: inputProps) => {
  return (
    <div className="mt-4 ">
      <input
        className={` outline-none sm:px-12 sm:py-2 px-7 py-2 border-slate-400 border rounded-md  `}
        type="text"
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );
};
