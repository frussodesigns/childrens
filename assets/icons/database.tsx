import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const DatabaseIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="-0.5 0 21 21"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M4 12V8h2v2h8V8h2v4H4ZM2 2h16V0H2v2Zm0 16h16V6H2v12Zm-2 2h20V4H0v16Z"
    />
  </Svg>
)
export default DatabaseIcon
