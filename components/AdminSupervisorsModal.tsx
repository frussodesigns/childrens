import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import CloseComponent from '../assets/x';
import ResponsiveModal from './ResponsiveModal';
import AdminModal from './AdminModal';


export default function AdminSupervisorsModal(props) {

  useEffect(() => {
    
  }, [])

  const supervisors = [
    {
      name: 'Bill Jenkins',
      borough: 'Queens',
      numKids: 20,
      kidIds: [ 21, 50, 88]
    },
    {
      name: 'Tod Jenkins',
      borough: 'Queens',
      numKids: 21,
      kidIds: [ 21, 50, 88]
    },
    {
      name: 'Bill Jenkins',
      borough: 'Queens',
      numKids: 20,
      kidIds: [ 21, 50, 88]
    },
    {
      name: 'Bill Jenkins',
      borough: 'Queens',
      numKids: 20,
      kidIds: [ 21, 50, 88]
    },
  ]

  
  const buildTable = () => {
    let formContent = []
    let count = 0

    //build section inputs
    for (let i = 0; i < props.specs.groupings.length; i++){
      let localGroup = []

      //build single input
      for (let j = 0; j < props.specs.groupings[i].fields; j++){
        const id = count

        if (props.types[count] == 'bool') {
          localGroup.push(
            <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
            </View>
          )
        }
        else {
        count ++
      }
      
      //build new section w title
      formContent.push(
          <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
            
          </View>
        )
      formContent.push(<View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>{localGroup}</View>)
    }
    return (formContent)
  }

}

const { width, height } = useWindowDimensions();
  let modWidth = width > 800 ? '60%' : '95%'
  let modMinWidth = width > 800 ? 750 : null
  let modHeight = width > 800 ? '75%' : '80%'

  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', width: modWidth, minWidth: modMinWidth, height: modHeight}]}>
          
          {/* Top Bar: */}
          <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text>Supervisors Setup</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => props.setModalVisible(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
            </View>
          </View>

          {/* Passthrough View: */}
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', height: 40, width: '100%', backgroundColor: ''}}>
              <View style={{width: 100, height: 30, backgroundColor: 'lightgrey', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center'}}>Manhattan</Text>
              </View>
              <View style={{width: 100, height: 30, backgroundColor: 'lightgrey', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center'}}>Bronx</Text>
              </View>
              <View style={{width: 100, height: 30, backgroundColor: 'lightgrey', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center'}}>Brooklyn</Text>
              </View>
              <View style={{width: 100, height: 30, backgroundColor: 'lightgrey', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center'}}>Staten Island</Text>
              </View>
              <View style={{width: 100, height: 30, backgroundColor: 'lightgrey', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center'}}>Queens</Text>
              </View>
            </View>
          <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'flex-start', width:'100%', height:'100%', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor:''}}>
            
            <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={false}  style={{width: '100%', height:'100%'}}>
              <View style={{width:'80%', height: '100%', alignItems:'center', alignSelf:'center', justifyContent:'center', backgroundColor:''}}>
                {/* <ScrollView showsVerticalScrollIndicator={false}  style={{height:'100%',}}> */}
                
                  {supervisors.map((sup) => {
                    return(
                      <View style={{backgroundColor: 'red', width: '100%', borderRadius: 20, padding: 5, margin: 5}}>
                        <Text style={{}}>{sup.name}</Text>
                      </View>
                    )
                  })

                  }
                 

                {/* </ScrollView> */}
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
      height: '75%',
      margin: 'auto',
      // padding: 30,
      width: "60%",
      minWidth:750,
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
      // marginLeft:'auto',
      // alignSelf:'center'
    },
})