import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgArrow = (props: SvgProps) => (
  <Svg
    baseProfile="tiny"
    xmlns="http://www.w3.org/2000/svg"
    width='100%'
    height='100%'
    viewBox="0 0 42 42"
    xmlSpace="preserve"
    fill="currentColor"
    {...props}
  >
    <Path
      fillRule="evenodd"
      d="M11 38.32 28.609 21 11 3.68 13.72 1 34 21.01 13.72 41z"
    />
  </Svg>
)

export default SvgArrow
