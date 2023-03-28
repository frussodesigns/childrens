import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'

export default function DocumentModal(props) {
  const [groupCount, setGroupCount] = useState(0)

  const { width, height } = useWindowDimensions();

  const form = {
    question1: 'sample',
    question2: 'sample',
    question3: 'sample',
    question4: 'sample',
    question5: 'sample',
    question6: 'sample',
    question7: 'sample',
    question8: 'sample',
    questione1: 'sample',
    questione2: 'sample',
    questione3: 'sample',
    questione4: 'sample',
    questione5: 'sample',
    questione6: 'sample',
    questione7: 'sample',
    questione8: 'sample',
    
  }

  useEffect(() => {
    console.log(props.data)
  
    return () => {
      
    }
  }, [])
  

  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white'}]}>
          <View style={{backgroundColor:'', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text>{}</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable onPress={() => props.setModalVisible(false)}><Text>Close</Text></Pressable>
            </View>
          </View>
          <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'flex-start', backgroundColor:'', width:'80%', minWidth:700, flexWrap: 'wrap', alignItems:'flex-start', }}>
            <ScrollView showsVerticalScrollIndicator={false}  style={{height:'100%',}}>
              <View style={{height:50}}></View>
            {
              props.specs.groupings.map((group, index) =>
              <View> 
              <Text>{group.section}</Text>
                <View>
                  {
                    props.columns.slice(0, props.specs.groupings[index].fields).map((question, indexx) =>
                    <Text style={{marginLeft:100}}>{question}</Text>
                    )
                  }
                </View>
              </View>
              )
            }
            <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
            {
              
              props.columns.map((question) => 
              <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignSelf:'flex-start'}}>
                <Text>{question + ':'}</Text>
                <TextInput style={{backgroundColor:'rgb(243,243,244)', height:'2em', borderRadius: 5, width:'80%'}} />
                <View style={{height:10}}></View>
              </View>
              )
            }
            
            
            </View>
            </ScrollView>
            
            
            {/* <Text>Modal content goes here</Text>
            <Text>{props.modalId}</Text> */}
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
})