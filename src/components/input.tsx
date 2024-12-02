interface inputProps {
  placeholder: string;
  reference?: any;
  width?: string;
  modal ? : boolean
}

export const InputComp = ({ placeholder, reference }: inputProps) => {
  return (
    <div className="mt-4 ">
      <input
        className={` sm:py-3 sm:w-80 pl-2 py-2 w-64 border-slate-400 border rounded-md 
       `}
        type="text"
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );


};
