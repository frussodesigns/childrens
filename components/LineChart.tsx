import {Canvas, Circle} from "@shopify/react-native-skia";
import { Animated } from 'react-native';
import {useEffect} from 'react'

export const LineChart = () => {
    const r = 128
    return (
        <Canvas style={{ flex: 1 }}>
            <Circle cx={r} cy={r} r={r} color="lightblue" />
        </Canvas>
    )
}

export default LineChart