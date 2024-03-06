import { View, Text } from 'react-native'
import React, {useState} from 'react'
import {useWindowDimensions, TouchableOpacity} from 'react-native';
import { Link } from "expo-router"

import DatabaseIcon from '../assets/icons/database';
import HandIcon from '../assets/icons/hand';
import HeartIcon from '../assets/icons/hearticon';
import ReportIcon from '../assets/icons/report';

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
      
      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3, alignItems:'center', justifyContent:'center'}}  onLayout={onLayout}>
        <Link href="/documents">
          <DatabaseIcon/>
        </Link>
      </View>

      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3, alignItems:'center', justifyContent:'center'}}>
        <Link href="/homefinding">
          <HandIcon/>
        </Link>
      </View>

      <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3, alignItems:'center', justifyContent:'center'}}>
        <Link href="/reports">
          <ReportIcon/>
        </Link>
      </View>

      {width < 400 ? null :
        <View style={{height: '80%', width: menuItemWidth, backgroundColor:'white', borderRadius:menuItemWidth/3, alignItems:'center', justifyContent:'center'}}>
          <Link href="/user">
            <HeartIcon/>
          </Link>
        </View>
        }
    </View>
  )
}