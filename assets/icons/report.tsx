import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const ReportIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#494c4e"
      d="M19 0H5C3.9 0 3 .9 3 2v20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2zm0 21.5c0 .28-.22.5-.5.5h-13c-.28 0-.5-.22-.5-.5v-19c0-.28.22-.5.5-.5h13c.28 0 .5.22.5.5v19z"
    />
    <Path
      fill="#494c4e"
      d="M12 20c-.553 0-1-.445-1-.994v-6.01c0-.55.447-.996 1-.996s1 .445 1 .994v6.01c0 .55-.447.996-1 .996zm-4 0c-.553 0-1-.44-1-.983v-3.033C7 15.44 7.447 15 8 15s1 .44 1 .983v3.033A.991.991 0 0 1 8 20zm8 0a1 1 0 0 1-1-1V6a1 1 0 1 1 2 0v13a1 1 0 0 1-1 1zM7 7.5a2.5 2.5 0 0 0 5 0H9.5V5A2.5 2.5 0 0 0 7 7.5z"
    />
    <Path fill="#494c4e" d="M13 6.5h-2.5V4A2.5 2.5 0 0 1 13 6.5z" />
  </Svg>
)
export default ReportIcon
