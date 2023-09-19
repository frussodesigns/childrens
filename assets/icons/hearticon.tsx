import * as React from "react"
import Svg, { SvgProps, G, Path, Text } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const HeartIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    data-name="Layer 1"
    viewBox="0 0 100 125"
    width={24}
    height={24}
    {...props}
  >
    <G data-name="Group">
      <Path
        d="M69.3 11.6h-.2a28.9 28.9 0 0 0-18.4 6.9c-5.8-5.2-11.4-7.8-16.5-7.8a25.9 25.9 0 0 0-18.7 7.9 26.9 26.9 0 0 0-7.1 13.8 3 3 0 0 0 5.9 1.1 20.9 20.9 0 0 1 5.6-10.8 19.9 19.9 0 0 1 14.4-6.1c4 0 9 2.7 14.3 7.9a3.2 3.2 0 0 0 4.5 0 23.3 23.3 0 0 1 16.3-7 17 17 0 0 1 12.3 5.1 21.1 21.1 0 0 1 6 14.8 21.7 21.7 0 0 1-1.2 6.9H63.9a3 3 0 0 0-2.2.9l-9.1 9.6-10.4-23.5a3 3 0 0 0-5.3-.4l-8.3 13.6H9.4a3 3 0 0 0 0 6h20.9a3 3 0 0 0 2.5-1.5L39 39l10 22.6a3 3 0 0 0 2.2 1.7h.5a3 3 0 0 0 2.2-.9l11.3-12h18l-1.5 1.8-31 30-24.4-23.7a3 3 0 1 0-4.2 4.3l26.6 25.7a3 3 0 0 0 4.2 0l33.1-32a27.4 27.4 0 0 0 0-38 22.9 22.9 0 0 0-16.7-6.9Z"
        data-name="Path"
      />
    </G>
    <Text
      y={115}
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      fontSize={5}
      fontWeight="bold"
    >
      {"Created by Focus"}
    </Text>
    <Text
      y={120}
      fontFamily="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"
      fontSize={5}
      fontWeight="bold"
    >
      {"from the Noun Project"}
    </Text>
  </Svg>
)
export default HeartIcon
