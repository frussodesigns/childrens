import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput, Modal } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import CloseComponent from '../assets/x';
import ResponsiveModal from './ResponsiveModal';
import AdminModal from './AdminModal';
import AdminSingleSupervisorModal from './AdminSingleSupervisorModal';
import { fetchSupervisors } from '../apiCallsSupervisors';
import { newSupervisor } from '../apiCallsSupervisors';
import { useAppContext } from '../hooks/useAppContext';


async function getSupervisors () {
  // let supervisors = {}
  let supervisors = await fetchSupervisors()
  return supervisors
}


export default function AdminSupervisorsModal(props) {

  // const { state, dispatch } = useAppContext()
  const [selectedBorough, setselectedBorough] = useState('all')

  // const [supervisors, setSupervisors] = useState(null)
  
  let supervisorsTemp

  // const [supervisors, setSupervisors] = useState([]) //moved to admin.tsx

  useEffect(() => {

    if (!props.state.supervisors){
      fetchSupervisors(props.dispatch)
    }

  }, [])

  useEffect(() => {
    console.log(props.supervisors)
  
  }, [props.supervisors])

  useEffect(() => {
    console.log(props.state)
    console.log(Object.keys(props.state))
    // console.log(props.state.supervisors)
  
  }, [props.state.supervisors])
  
  

  const supervisorsBak = [
    {
      name: 'Bill Jenkins',
      borough: 'all',
      numKids: 20,
      kidIds: [ 21, 50, 88]
    },
    {
      name: 'Tod Jenkins',
      borough: 'manhattan',
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

  const selectBorough = (borough) => {
    console.log(borough)
    setselectedBorough(borough)
    console.log(selectedBorough)
  }

  const newEntry = () => {
    props.setModSupModalNew(true)
    props.setModSupModalVisible(true)
  }

  const openSup = (sup) => {
    props.setModSupModalNew(false)
    props.setSelectedSup(sup)
    props.setModSupModalVisible(true)
  }

  const { width, height } = useWindowDimensions();
    let modWidth = width > 800 ? '60%' : '95%'
    let modMinWidth = width > 800 ? 750 : null
    let modHeight = width > 800 ? '75%' : '80%'

  function calculateMarginLeft(role) {
    return role === 'director' ? 0 : (role === 'supervisor' ? '10%' : '20%');
  }

  function calculateWidth(role) {
    return role === 'director' ? '100%' : (role === 'supervisor' ? '90%' : '80%');
  }

  function supName(sup){
    const formattedBorough = sup.borough.charAt(0).toUpperCase() + sup.borough.slice(1)
    const formattedName = sup.role == 'director' ? sup.name + " (" + formattedBorough + ")" : sup.name
    return formattedName
  }

  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>

        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', width: modWidth, minWidth: modMinWidth, height: modHeight}]}>
          
          {/* Top Bar: */}
          <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text>{}</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => props.setModalVisible(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
            </View>
          </View>

        {/* Title and New Entry Button */}
          {/* <View style={{height:10}}></View> */}
        {/* <Text>{props.modalId}</Text> */}
        <View style={{width:'80%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:'',}}>
          <View style={{height:50, width: '100%', justifyContent:'center', backgroundColor:''}}>
            <View style={{width:'100%', alignSelf:'start', backgroundColor:'', flexDirection:'row'}}>
              <Text style={[styles.sectionTitle, {marginRight:'auto'}]}>{"Supervisors:"}</Text>
              <Pressable activeOpacity={1} onPress={()=>newEntry()}>
                  <View style={{cursor: 'pointer', width: 140, height:30, marginTop:-2, marginRight:10, borderRadius:15, backgroundColor:'lightblue', alignItems:'center', justifyContent:'center'}}>
                      <Text>New Entry</Text>
                  </View>
              </Pressable>
            </View>
          </View>
          <View style={{width:'50%'}}></View>
        </View>

          {/* Passthrough View: */}

          {/* Borough Selection */}
            <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center', height: 40, width: '100%', paddingVertical: 28, backgroundColor: 'lightgrey'}}>
              <Pressable onPress={()=>selectBorough('all')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'all' ? 'bold' : 'normal'}}>All </Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>selectBorough('manhattan')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'manhattan' ? 'bold' : 'normal'}}>Manhattan</Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>selectBorough('bronx')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'bronx' ? 'bold' : 'normal'}}>Bronx</Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>selectBorough('brooklyn')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'brooklyn' ? 'bold' : 'normal'}}>Brooklyn</Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>selectBorough('staten island')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'staten island' ? 'bold' : 'normal'}}>Staten Island</Text>
                </View>
              </Pressable>
              <Pressable onPress={()=>selectBorough('queens')}>
                <View style={{width: 100, height: 30, backgroundColor: 'white', borderRadius: 20, justifyContent: 'center' }}>
                  <Text style={{textAlign: 'center', justifyContent: 'center', alignSelf: 'center', fontWeight: selectedBorough === 'queens' ? 'bold' : 'normal'}}>Queens</Text>
                </View>
              </Pressable>
            </View>

          {/* Supervisors List Section */}
          <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'flex-start', width:'100%', height:'100%', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor:''}}>
            
            <ScrollView nestedScrollEnabled={true} scrollEnabled={true} showsVerticalScrollIndicator={true}  style={{width: '100%', height:'100%'}}>
              <View style={{width:'80%', height: '100%', alignItems:'center', alignSelf:'center', justifyContent:'center',paddingTop: 21, backgroundColor:''}}>
                {/* <ScrollView showsVerticalScrollIndicator={false}  style={{height:'100%',}}> */}
                
                  {props.state.supervisors && props.state.supervisors.map((sup) => {
                    //Check Each Borough Matches selectedBorough
                    if (selectedBorough === 'all') {
                      return(
                        <View style={{
                          backgroundColor: '#F9F9F9', borderRadius: 20, padding: 5, margin: 5, marginLeft: calculateMarginLeft(sup.role), width: calculateWidth(sup.role), 
                          }}>
                            <View style={{width: '100%'}}>
                            <Pressable onPress={() => openSup(sup)}>
                              <Text style={{}}>{supName(sup)}</Text>
                            </Pressable>
                          </View>
                        </View>
                        
                      )
                    }
                    else if (sup.borough === selectedBorough) {
                      return(
                        <View style={{
                          backgroundColor: '#F9F9F9', borderRadius: 20, padding: 5, margin: 5, marginLeft: calculateMarginLeft(sup.role), width: calculateWidth(sup.role), 
                          }}>
                            <View style={{width: '100%'}}>
                            <Pressable onPress={() => openSup(sup)}>
                              <Text style={{}}>{sup.name}</Text>
                            </Pressable>
                          </View>
                        </View>
                        
                      )}

                      return null
                    
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