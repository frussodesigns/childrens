// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import { View, Text } from 'react-native'
import React from 'react'

export const color1 = 'rgb(255,255,255)' //white
export const color2 = 'rgb(249,249,249)' //light grey
export const color3 = 'rgb(242,242,242)' //darkest grey
export const color4 = 'rgb(245,247,249)' //slight blue grey

export const s = {
//Auth Screen Styles:
  screen:{
    backgroundColor:color4,
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
   },
  view:{
    backgroundColor:'',
    alignItems:'center',
    justifyContent:'center'
    // width:'60%',
    // height:'80%'
   },
  scrollView:{
    width:'100%',
    height:'100%',
    backgroundColor:''
   },
//Other Styles:
  next:{
    backgroundColor:'',
   },
}

export const LoadFonts = async () => {
  await useFonts();
  console.log('loaded font')
};

export const useFonts = async () =>
  await Font.loadAsync({
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    // indie: require('../assets/fonts/Ubuntu-BoldItalic.ttf'),
  });

function Fonts() {
    // const [fontsLoaded] = useFonts({
    //     'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    //   });


  
    return (
    <View>
      <Text>Fonts</Text>
    </View>
  )
}