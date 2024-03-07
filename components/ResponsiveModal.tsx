import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import CloseComponent from '../assets/x';

export default function ResponsiveModal(props) {
  
  const { width, height } = useWindowDimensions();
  let modWidth = width > 800 ? '60%' : '95%'
  let modMinWidth = width > 800 ? 750 : null
  let modHeight = width > 800 ? '75%' : '80%'

  if (props.small == true) {
    const modWidthSmall = parseInt(modWidth.replace('%', '')) / 2
    modWidth = modWidthSmall.toString() + '%'
    modMinWidth = modMinWidth / 2
    const modHeightSmall = parseInt(modHeight.replace('%', '')) / 3
    modHeight = modHeightSmall.toString() + '%'
    

  }

  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', maxHeight: props.maxHeight ? props.maxHeight : null, width: modWidth, minWidth: modMinWidth, height: modHeight}]}>
          
          {/* Top Bar: */}
          <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text>{props.title ? props.title : null}</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => props.setModalVisible(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
            </View>
          </View>

          {/* Passthrough View: */}
          <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'flex-start', width:'100%', height:'100%', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor:''}}>
            <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false}  style={{width: '100%', height:'100%'}}>
              <View style={{width:'80%', alignItems:'center', alignSelf:'center', justifyContent:'center', backgroundColor:''}}>
          {props.children}
              </View>
            </ScrollView>
          </View>
            
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    modalContainer: {
      flexDirection:'column',
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: '#eee',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      
      margin: 'auto',
      // padding: 30,
      shadowColor: 'black',
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 10,
      elevation: 8,
    },
    neu: {
      shadowColor: 'grey',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5, // for Android
      // borderColor: 'white',
      // borderWidth: 30,
    },
    secondShadow: {
      shadowColor: 'white',
      shadowOffset: {
        width: -3,
        height: -3,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      elevation: 5, // for Android
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 18
    },
    checkbox: {
      margin: 8,
      marginTop:9,
      marginLeft:'auto',
      alignSelf:'center'
    },
})