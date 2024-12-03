interface inputProps {
  placeholder: string;
  reference?: any;

  type?: string;
}

export const AuthInputcomp = ({ placeholder, reference, type }: inputProps) => {
  return (
    <div className="mt-4 ">
      <input
        className={`outline-none py-2 sm:w-72 w-64 pl-2  border-slate-400 border rounded-md  `}
        type={type}
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );
};
