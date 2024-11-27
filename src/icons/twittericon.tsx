import { iconsProps, sizeStylesIcons } from "./iconStyles";

export const TwitterIcon = (props: iconsProps) => {
  return (
    <>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width={sizeStylesIcons.get(props.size)}
          height={sizeStylesIcons.get(props.size)}
          viewBox="0,0,256,256"
        >
          <g
            fill="none"
            fillRule="nonzero"
            stroke="#414d5d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeDasharray=""
            strokeDashoffset="0"
            fontFamily="none"
            fontWeight="none"
            fontSize="none"
            textAnchor="none"
          >
            <g transform="scale(8,8)">
              <path d="M5.296,15.689c-0.062,3.099 2.27,5.352 6,5.811c-1.399,1.375 -3.73,1.833 -6.527,1.833c1.865,2.292 5.128,3.667 8.391,3.667c10.482,0 14.229,-8.005 14.229,-15.347c1.043,-0.992 1.266,-1.461 1.611,-2.577l-0.917,-0.524c0,0 0.897,-1.318 0.897,-2.689c-1.35,0.076 -2.301,0.327 -3.294,0.991c-1.214,-1.199 -2.377,-1.854 -4.016,-1.854c-3.148,0 -5.345,2.219 -5.287,5.473c-5.087,-0.431 -8.817,-2.265 -12.773,-4.598c-1.264,2.507 -0.706,5.541 3.024,6.458"></path>
              <path d="M4.022,10.93c-0.862,2.98 0.977,5.539 4.011,5.961"></path>
            </g>
          </g>
        </svg>
      </div>
    </>
  );
};
