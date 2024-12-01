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
        className={` sm:py-3 sm:px-[73px] py-3 px-6  border-slate-400 border rounded-md 
       `}
        type="text"
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );


};
