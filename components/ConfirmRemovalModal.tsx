import { View, Text, Pressable } from 'react-native'
import ResponsiveModal from './ResponsiveModal'
import React from 'react'

const ConfirmRemovalModal = (props) => {
  return (
    <ResponsiveModal title={'Confirm Deletion'} setModalVisible={props.cancel} small={true}>
        <View style={{height:20}} />
    <View style={{justifyContent:'center', height:'100%', backgroundColor:''}}>
      <Text>Are you sure you would like to delete this household?</Text>
      <View style={{height:20}} />
        <View style={{alignItems:'center', }}>
        <Pressable activeOpacity={1} onPress={()=>props.confirm()}>
            <View style={{cursor: 'pointer', width: 200, height:30, marginTop:-2, marginBottom:10, borderRadius:15, backgroundColor:'rgba(245, 0, 0, 0.6)', alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'white'}}>Confirm And Remove</Text>
            </View>
        </Pressable>
        <Pressable activeOpacity={1} onPress={()=>props.cancel(false)}>
            <View style={{cursor: 'pointer', width: 200, height:30, marginTop:-2, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                <Text>Cancel and Return Back</Text>
            </View>
        </Pressable>
        </View>
    </View>
    </ResponsiveModal>
  )
}

export default ConfirmRemovalModal