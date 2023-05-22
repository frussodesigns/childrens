import { View, Text, Pressable } from 'react-native'
import ResponsiveModal from './ResponsiveModal'
import React from 'react'

const SuccessModal = (props) => {
  return (
    <ResponsiveModal title={''} setModalVisible={props.cancel} small={true}>
        <View style={{height:40}} />
    <View style={{justifyContent:'center', height:'100%', backgroundColor:''}}>
      <Text>Operation successful.</Text>
      <View style={{height:20}} />
        <View style={{alignItems:'center', }}>
        
        <Pressable activeOpacity={1} onPress={()=>props.cancel(false)}>
            <View style={{cursor: 'pointer', width: 120, height:30, marginTop:-2, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                <Text>Ok</Text>
            </View>
        </Pressable>
        </View>
    </View>
    </ResponsiveModal>
  )
}

export default SuccessModal