import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const CloseComponent = (props: SvgProps) => (
  <Svg
    width={800}
    height={800}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m18 18-6-6m0 0L6 6m6 6 6-6m-6 6-6 6"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default CloseComponent