import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress';



const circularProgress = () => {
  return (
    <AnimatedCircularProgress
    size={120}
    width={15}
    fill={100}
    tintColor="#00e0ff"
    onAnimationComplete={() => console.log('onAnimationComplete')}
    backgroundColor="#3d5875" />
  )
}

export default circularProgress