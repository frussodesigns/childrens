import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput, Modal } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import { useAppContext } from '../hooks/useAppContext';
import Checkbox from 'expo-checkbox';
import CloseComponent from '../assets/x';
import ResponsiveModal from './ResponsiveModal';
import NeuView from './NeuView';
import { LoadFonts, color2 } from '../presets';
import CustomButton from './customButton';
import { postHomeFormData, patchFormData } from '../apiCalls';
import AutocompleteDropdown from './AutocompleteDropdown';

export default function HomefindingModal(props) {
  
  const { state, dispatch } = useAppContext()
  
  // let formData = {}
  const [formData, setFormData] = useState({})
  const [formDataInit, setFormDataInit] = useState(false)
  const [properties, setProperties] = useState([])
  const [error, setError] = useState(null)
  const [confirmation, setConfirmation] = useState(false)
  const [autocompleteActive, setAutocompleteActive] = useState()
  const [caseWorkerID, setCaseWorkerID] = useState(null)
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
    LoadFonts()

    console.log("Form javascript object loaded")
    console.log(props.data)
    console.log(props.index)
    console.log(props.data[props.data.length - 1])
    const keys = Object.keys(props.data[props.data.length - 1])
    setProperties(keys)
    console.log(properties)
    
  
  }, [])

  //initial form init
  useEffect(() => {
    
    if (props.newEntry == true){

      for (let i = 0; i < properties.length; i++){
        const newName = properties[i]
        const newObj = {}

        if (props.types[i-1] == 'bool') newObj[newName] = false
        else if (props.types[i-1] == 'status') newObj[newName] = 'In Progress'
        else newObj[newName] = ''

        setFormData(formData => ({...formData, ...newObj}))
        // console.log(formData)
      }
      setFormDataInit(true)
    }
    else if (props.newEntry == false) {
      const obj = props.data[props.index]
      console.log(props.index)

      for (let i = 0; i < properties.length; i++){
        const newProperty = properties[i]
        let newObj = {}
        // console.log(obj[keys[i]])
        newObj[newProperty] = obj[properties[i]]
        // console.log(newObj)
        setFormData(formData => ({...formData, ...newObj}))
      }
      console.log(formData)
      setFormDataInit(true)
    }

  }, [properties])
  

  const onChange = (text, id) => {
    const newObj = {}
    newObj[properties[id]] = text
    // console.log(newObj)
    setFormData(formData => ({...formData, ...newObj}))
  }

  const modData = (text, type) => {
    onChange(text, caseWorkerID)
  }

  const autocomplete = (type, supervisor, trigger) => {
    console.log('autocomplete...')
    console.log(trigger)
    trigger == true ? setAutocompleteActive(type) : setAutocompleteActive(null)
  }

  const bool = (index) => {
    // console.log(index)
    // console.log(props.columns[index])
    // const keys = Object.keys(formData);
    const i = properties[index];
    const newFormData = {
      ...formData,
      [i]: formData[i] ? !formData[i] : true,
    };
    console.log(i + ' set to ' + newFormData[i])
    setFormData(newFormData);
    // console.log(formData)
  }

  const checkDates = () => {
    const arr = Object.keys(formData)
    var dateFormat = /^\d{1,2}\/\d{1,2}\/\d{4}$/

    for (let i = 0; i < arr.length; i++) {
      const formInput = formData[arr[i+1]]
      
      if(props.types[i] === 'date'){

        if (dateFormat.test(formInput) || formInput === '' || !formInput) {}
        else {
          setError('All Dates Must Match MM/DD/YYYY Format')
          console.log('error')
          return false
        }
      }
    }
    return true
  }

  // legacy from docModal
  // const confirmCIN = () => {
  //   console.log(formData.cIN)

  //   if (!formData.cIN) {
  //     setError("'CIN' must have a value")
  //     return false
  //   }
  //   else return true
  // }

  const submitForm = async () => {

    // const cinValid = confirmCIN()
    const datesValid = checkDates()


    if (!datesValid) return

    if (props.newEntry == true) postHomeFormData(formData, setError, setConfirmation, dispatch, state)

    if (props.newEntry == false) patchFormData(formData, setError, setConfirmation, dispatch, state)

  }

  const closeConfirmation = () => {
    setConfirmation(false)
    props.setModalVisible(false)
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
                <Checkbox style={styles.checkbox} value={formData[properties[id+1]]} onValueChange={() => bool(id+1)}/>
                <View style={{height:10}}></View>
              </View>
            </View>
          )
        }
        else if (props.types[count] === 'date' || props.types[count] === 'number') {
        localGroup.push(
          <View style={{width:'50%', minWidth:250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
            <View style={{backgroundColor:'', height:60, alignSelf:'center', width: '80%'}}>
              <Text>{props.columns[count] + ':'}</Text>
              <View style={{height:5}}/>
              <TextInput value={formData[properties[id+1]]} inputMode={'numeric'} onChangeText={text => onChange(text, id+1)} style={{backgroundColor:color2, paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
              <View style={{height:10}}></View>
            </View>
          </View>
        )
        }
        else if (props.types[count] === 'supervisor'){
          if (!caseWorkerID) setCaseWorkerID(id+1)
        localGroup.push(
          <View style={{width:'50%', minWidth:250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
            <View style={{backgroundColor:'', height:60, alignSelf:'center', width: '80%'}}>
              <Text>{props.columns[count] + ':'}</Text>
              <View style={{height:5}}/>
              <TextInput value={formData[properties[id+1]]} 
                onChangeText={text => onChange(text, id+1)} 
                onFocus={(e) => autocomplete('caseWorkers', null, true)}
                onBlur={(e) => { setTimeout(() => autocomplete('caseWorkers', null, false), 200)}}
                style={{backgroundColor:color2, paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} 
                />
              {autocompleteActive && 
                <AutocompleteDropdown type={'caseWorker'} supervisor={formData[properties[id+1]]} modData={modData} supervisors={props.supervisors} formdata={formData} autocompleteActive={autocompleteActive} />
              }
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
              <TextInput value={formData[properties[id+1]]} onChangeText={text => onChange(text, id+1)} style={{backgroundColor:color2, paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
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
    <>
      <ResponsiveModal setModalVisible={props.setModalVisible}>

              <View style={{height:20}}></View> {/* <= Top Gap */}
              {formDataInit ? <View style={{width:'100%', backgroundColor:''}}>{buildTable()}</View> : null}
              <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}>
                {/* <Button title="Submit" ></Button> */}
                <CustomButton title="Submit" onPress={() => submitForm()} color='#8183FF' />
              </View>
              
      </ResponsiveModal>

      {/* Error */}
      <Modal
        transparent
        visible={error ? true : false}
        animationType="fade"
        onRequestClose={() => {
          setError(null);
          
        }}
      >
        <ResponsiveModal small={true} setModalVisible={setError}>
          <Text style={[styles.sectionTitle, {marginTop:30, color:'red'}]}>{'Error:'}</Text>
          <Text style={{color: 'red'}}>{error ? error : null}</Text>
        </ResponsiveModal>
        
      </Modal>

      {/* Confirmation Modal: */}
      <Modal
        transparent
        visible={confirmation}
        animationType="fade"
        onRequestClose={() => closeConfirmation()}
      >
        <ResponsiveModal small={true} setModalVisible={closeConfirmation}>
          <Text style={[styles.sectionTitle, {marginTop:30}]}>{'Success!'}</Text>
          <Text style={{}}>{'Entry has been successfully logged.'}</Text>
        </ResponsiveModal>
        
      </Modal>
    </>
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