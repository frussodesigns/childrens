import { View, Text } from 'react-native'
import React, {useState} from 'react'
import {useWindowDimensions} from 'react-native';

export default function MobileMenu() {
    const {height, width} = useWindowDimensions();
    const [menuItemWidth, setWidth] = useState(0);

    const onLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        setWidth(height);
        // console.log(menuItemWidth)
    };

  return (
    <View style={{height:'100%', width:'100%', flexDirection:'row', gap:20, backgroundColor:'', alignItems:'center', justifyContent:'center'}}>
      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3}}  onLayout={onLayout}></View>
      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3}}></View>
      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3}}></View>
      {width < 400 ? null :
      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3}}></View>
        }
    </View>
  )
}