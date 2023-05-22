import { View, Text } from 'react-native'
import React from 'react'
import NeuView from './NeuView'

export default function CustomButton(props) {
  return (
    <NeuView cursor={'pointer'} onPress={props.onPress} style={{borderRadius:12}}>
      <View style={{width:150, height:38, borderRadius:12, backgroundColor: props.color ? props.color : '#8183FF', justifyContent:'center', alignItems:'center'}}>
        <Text style={{fontSize:18, fontFamily:'Rubik', color:'white'}}>{props.title ? props.title : 'add title prop'}</Text>
      </View>
    </NeuView>
  )
}