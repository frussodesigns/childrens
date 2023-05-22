import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  useDerivedValue
} from 'react-native-reanimated';

export default function NeuView(props) {

  const [isHovered, setIsHovered] = useState(false);
  const [animationState, setAnimation] = useState(100);
  const animation = useSharedValue(0);

  useEffect(() => {
    if (isHovered === true){
      aniDown()
    }
    else if (isHovered === false){
      aniUp()
    }

  }, [isHovered])
  

  const aniDown = () => {
    animation.value = withTiming(0, { duration: 300, easing: Easing.ease });
  };

  const aniUp = () => {
    animation.value = withTiming(100, { duration: 300, easing: Easing.ease });
  };

  // const animatedStyle = useAnimatedStyle(() => {
  //   return {
  //     shadowOffset: {
  //       width: 2*animation.value/100,
  //       height: 2*animation.value/100,
  //     },
  //     shadowOpacity: 0.2*animation.value/100,
  //   };
  // }, [animation]);

  const derived = useDerivedValue(() => {
    setAnimation(animation.value)
  }, [animation]);

  return (
    <Pressable onPress={props.onPress ? () => props.onPress(props.id) : null} style={[props.style, {cursor: props.cursor ? props.cursor : 'default'}]} onHoverIn={()=>setIsHovered(true)} onHoverOut={()=>setIsHovered(false)}>
      <View style={[styles.secondShadow, {
        shadowColor: props.shadowColor ? props.shadowColor : 'white',
        shadowOffset: {
          width: -3,
          height: -3,
        },
        shadowOpacity: ((animation.value/100)+.5), 
        // shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5, // for Android
        padding:0, margin:0, flex: 1, justifyContent: 'center', 
        borderRadius: props.style && props.style.borderRadius ? props.style.borderRadius : null,
        borderTopLeftRadius: props.style && props.style.borderTopLeftRadius ? props.style.borderTopLeftRadius : null,
        borderTopRightRadius: props.style && props.style.borderTopRightRadius ? props.style.borderTopRightRadius : null,
        borderBottomLeftRadius: props.style && props.style.borderBottomLeftRadius ? props.style.borderBottomLeftRadius : null,
        borderBottomRightRadius: props.style && props.style.borderBottomRightRadius ? props.style.borderBottomRightRadius : null,
        
        }]}>
        
        <View style={{padding:0, margin:0, flex: 1, justifyContent: props.style && props.style.justifyContent ? props.style.justifyContent : null,
          shadowColor: 'grey',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.15*animation.value/100+.05,
          shadowRadius: 6,
          elevation: 5, // for Android
          transform: [{translateY: -1*animation.value/100}, {translateX: -1*animation.value/100}],
          borderRadius: props.style && props.style.borderRadius ? props.style.borderRadius : null, 
          borderTopLeftRadius: props.style && props.style.borderTopLeftRadius ? props.style.borderTopLeftRadius : null,
          borderTopRightRadius: props.style && props.style.borderTopRightRadius ? props.style.borderTopRightRadius : null,
          borderBottomLeftRadius: props.style && props.style.borderBottomLeftRadius ? props.style.borderBottomLeftRadius : null,
          borderBottomRightRadius: props.style && props.style.borderBottomRightRadius ? props.style.borderBottomRightRadius : null,
          // width:'100%',
          // height:'100%'
        }}>
              {props.children}
              {/* <Text>{animationState}</Text> */}
          </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    neu: {
        shadowColor: 'grey',
        // shadowOffset: {
        //   width: 2/100,
        //   height: 2,
        // },
        // shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5, // for Android
        // borderColor: 'white',
        // borderWidth: 30,
      },
      secondShadow: {
        width:'100%',
        height:'100%',
        shadowColor: 'white',
        shadowOffset: {
          width: -3,
          height: -3,
        },
        // shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5, // for Android
      },
})