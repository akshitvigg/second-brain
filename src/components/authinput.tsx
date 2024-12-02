interface inputProps {
    placeholder: string;
    reference?: any;
    width?: string;
  }
  
  export const AuthInputcomp = ({ placeholder, reference}: inputProps) => {
    return (
      <div className="mt-4 ">
        <input
          className={`outline-none py-2 sm:w-72 w-64 pl-2  border-slate-400 border rounded-md  `}
               
          type="text"
          placeholder={placeholder}
          ref={reference}
        />
      </div>
    );
};
  