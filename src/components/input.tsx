interface inputProps {
  placeholder: string;
  reference?: any;
  width?: string;
  modal ? : boolean
}

export const InputComp = ({ placeholder, reference,modal }: inputProps) => {
  return (
    <div className="mt-4 ">
      <input
        className={` outline-none sm:px-12 sm:py-2  border-slate-400 border rounded-md 
             ${modal && "sm:py-3 py-3 w-[335px]"}  `}
        type="text"
        placeholder={placeholder}
        ref={reference}
      />
    </div>
  );

//   className={` outline-none sm:px-12 sm:py-2 px-6 py-2 border-slate-400 border rounded-md ${
//     width && "w-[335px]"
//   } ${modal && "sm:py-3 py-3"} `}
//   type="text"
//   placeholder={placeholder}
//   ref={reference}
// />
};
