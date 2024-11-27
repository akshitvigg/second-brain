interface inputProps {
  placeholder: string;
  reference?: any;
  width?: string;
}

export const InputComp = ({ placeholder, reference, width }: inputProps) => {
  return (
    <div className="mt-4 ">
      <input
        className={` outline-none px-10 py-2 border-slate-400 border rounded-md ${
          width && "w-96"
        } `}
        type="text"
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );
};
