import { StyleSheet, View, Text, Button, useWindowDimensions, TextInput } from 'react-native'
import { ScrollView, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react'
import Checkbox from 'expo-checkbox';
import CloseComponent from '../assets/x';


export default function AdminModal(props) {
  
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

  useEffect(() => {
    console.log("Form javascript object loaded")
    // console.log(props.data)
  
    for (let i = 0; i < props.users.length; i++){
      if (props.users[i].id == props.modalId) {
        setFormData({...props.users[i]})
        setFormDataInit(true)
        return
      }
    }
    
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
            <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
              <View style={{height:60, alignSelf:'center', alignContent:'center', width: '80%', flexDirection:'row'}}>
                <Text style={{alignSelf:'center'}}>{props.columns[count] + ':'}</Text>
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
          <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
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
      formContent.push(
          <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
            <View style={{height:50, width: '50%', justifyContent:'center', backgroundColor:''}}>
              <View style={{width:'80%', alignSelf:'center', backgroundColor:''}}>
                <Text style={styles.sectionTitle}>{props.specs.groupings[i].section + ':'}</Text>
              </View>
            </View>
            <View style={{width:'50%'}}></View>
          </View>
        )
      formContent.push(<View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>{localGroup}</View>)
    }
    return (formContent)
  }

  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white'}]}>
          <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text style={{fontWeight:'bold'}}>{'User Settings'}</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => props.setModalVisible(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
            </View>
          </View>
          <View style={{flexDirection:'row', flex:1, marginTop:0, justifyContent:'flex-start', backgroundColor:'', width:'80%', minWidth:700, flexWrap: 'wrap', alignItems:'flex-start', }}>
            <ScrollView showsVerticalScrollIndicator={false}  style={{height:'100%',}}>
            <View style={{height:20}}></View>
              {/* <Text>{props.modalId}</Text> */}
              <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
                <View style={{height:50, width: '50%', justifyContent:'center', backgroundColor:''}}>
                  <View style={{width:'80%', alignSelf:'center', backgroundColor:''}}>
                    <Text style={styles.sectionTitle}>{formData.name}</Text>
                  </View>
                </View>
                <View style={{width:'50%'}}></View>
              </View>

            <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', backgroundColor:''}}>
              <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', height:60, alignSelf:'center', width: '80%'}}>
                  <Text>{'Email:'}</Text>
                  <View style={{height:5}}/>
                  <TextInput defaultValue={formData.email} style={{ backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
                  <View style={{height:10}}></View>
                </View>
              </View>
              <View style={{width:'50%', height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', height:60, alignSelf:'center', width: '80%'}}>
                  <Text>{'Password Recovery:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{cursor: 'pointer', backgroundColor:'#F9F9F9', paddingLeft: 10, height:27, borderRadius: 5, width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Text>Send Password Revovery Email</Text>
                  </View>
                  {/* <TextInput style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} /> */}
                  <View style={{height:10}}></View>
                </View>
              </View>
              
              <View style={{width:'50%', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', alignSelf:'center', width: '80%'}}>
                  <Text>{'Permissions:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Admin</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={true} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Document Database</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Adoption Database</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>KinGap Database</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Homefinding</Text>
                  </View>
                  <View style={{height:10}}></View>
                </View>
              </View>
              
              <View style={{width:'50%', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', alignSelf:'center', width: '80%'}}>
                  <Text>{'Boroughs:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={true} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Bronx</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Brooklyn</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Manhattan</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Staten Island</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Queens</Text>
                  </View>
                  <View style={{height:10}}></View>
                </View>
              </View>
              
              <View style={{width:'50%', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', alignSelf:'center', width: '80%'}}>
                  <Text>{'Document Permissions:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Suggest Modifications</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Make Modifications</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={false} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Request</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={true} onValueChange={null}/>
                    <Text style={{marginTop:7}}>View</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={true} onValueChange={null}/>
                    <Text style={{marginTop:7}}>Generate Reports</Text>
                  </View>
                  
                  <View style={{height:10}}></View>
                </View>
              </View>
          

            </View>
              {/* {formDataInit ? <View>{buildTable()}</View> : null} */}
              {/* <View>{buildTable()}</View> */}
            
            {/* <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}><Button title="Submit" ></Button></View> */}
            
            </ScrollView>
            
            
            {/* <Text>Modal content goes here</Text>
            <Text>{props.modalId}</Text> */}
          </View>
            {/* <View style={{height:10}}></View> */}

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