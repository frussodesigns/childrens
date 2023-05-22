import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput, Modal } from 'react-native'
import { Pressable, ScrollView } from 'react-native';
import React, {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker'
import CloseComponent from '../assets/x';
import ResponsiveModal from './ResponsiveModal';
import ConfirmDischargeModal from './ConfirmDischargeModal';
import SuccessModal from './SuccessModal';
import { getDischargeList, discharge } from '../apiCalls';

const tempObj = [
  {
    cIN: 22,
    firstName: 'Billy',
    middleName: '',
    lastName: 'Bob',
    dob: '12/12/12',
  },
  {
    cIN: 28,
    firstName: 'Alice',
    middleName: 'Beverly',
    lastName: 'Clark',
    dob: '12/12/12',
  },
]

export default function CsvModal(props) {
  
  // let formData = {}
  const [selectedFile, setSelectedFile] = useState(null)
  const [fetchError, setFetchError] = useState(false)
  const [error, setError] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  const [data, setData] = useState([])
  const [confirmModalVisible, setConfirmModalVisible] = useState(false)
  const [formDataInit, setFormDataInit] = useState(false)
  const [formData, setFormData] = useState(()=>{
    const initialFormData = [];
    tempObj.forEach((child, index) => {
      initialFormData[index] = child;
      initialFormData[index]['selected'] = false
    });
    return initialFormData;
  })

  useEffect(() => {
    console.log(formData)

  }, [formData])
  

  const { width, height } = useWindowDimensions();
  let modWidth = width > 800 ? '60%' : '95%'
  let modMinWidth = width > 800 ? 750 : null
  let modHeight = width > 800 ? '75%' : '80%'

  const justify = width < 660 ? 'center' : null

  useEffect(() => {
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])
  

  const bool = (index) => {
    let newArray = [...data]
    let child = {...newArray[index]}
    child.selected = !data[index].selected
    console.log(child)
    newArray[index] = child
    setData(newArray);

    // console.log(formData)
  }

  const selectFile = async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        type: 'application/csv', // Adjust the file type according to your needs
      });
  
      if (response.type === 'success') {
        setSelectedFile(response);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
    }
  }

  const submitForm = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('http://your-api-endpoint', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Error uploading file');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
  


  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>

        <Modal
        transparent
        visible={confirmModalVisible}
        animationType="fade"
        onRequestClose={() => setConfirmModalVisible(false)}
        >
            <ConfirmDischargeModal numSelected={data.filter(e => {if (e.selected==true) return true}).length} confirm={''} cancel={setConfirmModalVisible} />
        </Modal>

        <Modal
        transparent
        visible={confirmation}
        animationType="fade"
        onRequestClose={() => setConfirmation(false)}
        >
            <SuccessModal cancel={setConfirmation} />
        </Modal>


    <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', width: modWidth, minWidth: modMinWidth, height: modHeight}]}>
      
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

      <View style={{height:20}}></View>
        {/* <Text>{props.modalId}</Text> */}
        <View style={{width:'80%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:'',}}>
          <View style={{height:50, width: '100%', justifyContent:'center', backgroundColor:''}}>
            <View style={{width:'100%', alignSelf:'start', backgroundColor:'', flexDirection:'row'}}>
              <Text style={[styles.sectionTitle, {marginRight:'auto'}]}>{"Upload CSV:"}</Text>
              {/* <Pressable activeOpacity={1} onPress={()=>setConfirmModalVisible(true)}>
                  <View style={{cursor: 'pointer', width: 140, height:30, marginTop:-2, marginRight:10, borderRadius:15, backgroundColor:'rgba(245, 0, 0, 0.6)', alignItems:'center', justifyContent:'center'}}>
                      <Text>Commit Changes</Text>
                  </View>
              </Pressable> */}
            </View>
          </View>
          <View style={{width:'50%'}}></View>
        </View>

        <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'center', width:'100%', height:'100%', flexWrap: 'wrap', alignItems:'flex-start', backgroundColor:''}}>
        <View style={{flexDirection:'column', gap: 8}}>
        <Text style={{width:500, alignSelf:'center', textAlign:'center'}}>Here you can upload a CSV (comma-separated values) spreadsheet to append to this app's document records.</Text>
        <br />
        <Pressable activeOpacity={1} onPress={selectFile}>
            <View style={{cursor: 'pointer', width: 140, height:30, marginTop:-2, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
                <Text>Choose File</Text>
            </View>
        </Pressable>
        {selectedFile && (
          <>
            <Text>Selected File: {selectedFile.name}</Text>
              <Pressable activeOpacity={1} onPress={selectFile}>
                <View style={{cursor: 'pointer', width: 140, height:30, marginTop:-2, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
                    <Text>Upload Data</Text>
                </View>
              </Pressable>
              <Pressable activeOpacity={1} onPress={() => setSelectedFile(null)}>
                <View style={{cursor: 'pointer', width: 140, height:30, marginTop:-2, marginRight:10, borderRadius:15, backgroundColor:'rgba(245, 0, 0, 0.6)', alignItems:'center', alignSelf:'center', justifyContent:'center'}}>
                    <Text>Cancel Selection</Text>
                </View>
              </Pressable>
          </>
        )}
        </View>
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