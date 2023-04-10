import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import CloseComponent from '../assets/x';
import ResponsiveModal from './ResponsiveModal';

export default function DocumentModal(props) {
  
  // let formData = {}
  const [formData, setFormData] = useState({})
  const [formDataInit, setFormDataInit] = useState(false)
  // const [formData, setFormData] = useState(()=>{
  //   const initialFormData = {};
  //   props.columns.forEach((columnName) => {
  //     initialFormData[columnName] = null;
  //   });
  //   return initialFormData;
  // })

  const { width, height } = useWindowDimensions();

  const justify = width < 660 ? 'center' : null

  useEffect(() => {
    console.log("Form javascript object loaded")
    // console.log(props.data)
  
    for (let i = 0; i < props.columns.length; i++){
      const newName = props.columns[i]
      const newObj = {}
      newObj[newName] = false
      setFormData(formData => ({...formData, ...newObj}))
      // console.log(formData)
    }
    setFormDataInit(true)
  }, [])

  const bool = (index) => {
    // console.log(index)
    // console.log(props.columns[index])
    // const keys = Object.keys(formData);
    const i = props.columns[index];
    const newFormData = {
      ...formData,
      [i]: formData[i] ? !formData[i] : true,
    };
    console.log(i + ' set to ' + newFormData[i])
    setFormData(newFormData);
    // console.log(formData)
  }
  
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
            <View style={{width:'50%', minWidth:250, height:'', backgroundColor:'', justifyContent:'', alignContent:'', alignSelf:'flex-start'}}>
              <View style={{height:60, alignSelf:'center', alignContent:'center', width: '80%', flexDirection:'row'}}>
                <Text style={{alignSelf:'center', marginBottom:15}}>{props.columns[count] + ':'}</Text>
                {/* <input type="checkbox" checked={formData[props.columns[count]]} onChange={() => bool(id)}/>  */}
                {/* <Text>{id}</Text> */}
                <Checkbox style={styles.checkbox} value={formData[props.columns[id]]} onValueChange={() => bool(id)}/>
                <View style={{height:10}}></View>
              </View>
            </View>
          )
        }
        else {
        localGroup.push(
          <View style={{width:'50%', minWidth:250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
            <View style={{backgroundColor:'', height:60, alignSelf:'center', width: '80%'}}>
              <Text>{props.columns[count] + ':'}</Text>
              <View style={{height:5}}/>
              <TextInput style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
              <View style={{height:10}}></View>
            </View>
          </View>
        )
        }
        
        count ++
      }
      
      //build new section w title
      //title:
      formContent.push(
          <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
            <View style={{height:50, width: '100%', justifyContent:'center', backgroundColor:''}}>
              <View style={{width:'100%', alignSelf:'center', backgroundColor:''}}>
                <Text style={styles.sectionTitle}>{props.specs.groupings[i].section + ':'}</Text>
              </View>
            </View>
            <View style={{width:'50%'}}></View>
          </View>
        )
      //inputs:
      formContent.push(<View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', justifyContent:justify, backgroundColor:''}}>{localGroup}</View>)
    }
    return (formContent)
  }

  return (
    <ResponsiveModal setModalVisible={props.setModalVisible}>

            <View style={{height:20}}></View>
            {formDataInit ? <View style={{width:'100%', backgroundColor:''}}>{buildTable()}</View> : null}
            <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}><Button title="Submit" ></Button></View>
            
    </ResponsiveModal>
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
      marginBottom:25,
      marginLeft:'auto',
      alignSelf:'center'
    },
})