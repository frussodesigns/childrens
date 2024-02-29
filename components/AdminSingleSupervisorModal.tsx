import { ScrollView, View, Text, TextInput, Pressable, StyleSheet, useWindowDimensions, Modal } from 'react-native'
import React, {useState, useEffect} from 'react'
import CloseComponent from '../assets/x';
import Checkbox from 'expo-checkbox';
import CustomButton from './customButton';
import { newSupervisor, modSupervisor, delSupervisor } from '../apiCallsSupervisors';
import AutocompleteDropdown from './AutocompleteDropdown';


//todo
//✅ formData if new
// ✅ populate w some data
//1b. ✅ handle supervisor, director hiding if needed
//1c. handle form checking before submit
//1d. error popup
//2. passFormData if modification
//3. post api for new
//4. post api for modification
//5. api errors
//6. unfurling
//7. add to sup db from doc db
//8. supervisor dropdown, db checking
//9. show sup/dir in docs view
//

const AdminSingleSupervisorModal = (props) => {

    const { width, height } = useWindowDimensions();
    let modWidth = width > 800 ? '50%' : '95%'
    let modMinWidth = width > 800 ? 750 : null
    let modHeight = width > 800 ? '65%' : '80%'
    const [autocompleteActive, setAutocompleteActive] = useState(null)
    const [deleteButton, setDeleteButton] = useState(null)
    const [error, setError] = useState(false)

    const justify = width < 660 ? 'center' : null

    useEffect(() => {

      console.log(props.supervisors)

        //if existing supervisor is selected
        if (!props.modSupModalNew){
            console.log(props.selectedSup)
            setDeleteButton(true)
            
            setFormData({
              name: props.selectedSup.name,
              numChildren: props.selectedSup.numKids || 0,
              director: props.selectedSup.director || null,
              supervisor: props.selectedSup.supervisor || null,
              role: {
                director: props.selectedSup.role === 'director',
                supervisor: props.selectedSup.role === 'supervisor',
                caseWorker: props.selectedSup.role === 'caseWorker',
                vicePresident: props.selectedSup.role === 'vicePresident',
                president: props.selectedSup.role === 'president',
              },
              borough: {
                bronx: props.selectedSup.borough === 'bronx',
                brooklyn: props.selectedSup.borough === 'brooklyn',
                manhattan: props.selectedSup.borough === 'manhattan',
                statenIsland: props.selectedSup.borough === 'statenIsland',
                queens: props.selectedSup.borough === 'queens',
              }
            })
        }
        else {
            console.log('new')
            // console.log(props.selectedSup)
        }
    }, [])
    

    const [formData, setFormData] = useState({
        name: null,
        numChildren: 0,
        director: null,
        supervisor: null,
        role: {
            director: false,
            supervisor: false,
            caseWorker: false,
            vicePresident: false,
            president: false
        },
        borough: {
            bronx: false,
            brooklyn: false,
            manhattan: false,
            statenIsland: false,
            queens: false
        }
    })

    useEffect(() => {
      console.log(formData)
    
    }, [formData])
    

    const modData = (change, property) => {

        console.log('modData called with:', change, property);


         // Extract the value from the event object if 'change' is an event
        change = change.target ? change.target.value : change; //fixes synthetic base event bug

        setFormData(prevFormData => {
            // Create a shallow copy of formData using the spread operator
            const updatedFormData = { ...prevFormData };
    
            // Check if the property is under 'borough' or 'role'
            if (property.startsWith('borough') || property.startsWith('role')) {
                // Split the property string into nested keys
                const keys = property.split('.');
    
                // Get a reference to the parent property (borough or role)
                let parentProperty = updatedFormData;
    
                // Traverse the nested keys to access the parent property
                for (let key of keys.slice(0, -1)) {
                    parentProperty = parentProperty[key];
                }
    
                // Unset other boolean values under the same parent property
                for (let key in parentProperty) {
                    if (parentProperty.hasOwnProperty(key)) {
                        parentProperty[key] = false;
                    }
                }
    
                // Set the target property with the new value
                parentProperty[keys[keys.length - 1]] = change;
            } else {
                // If the property is not under 'borough' or 'role', update it directly
                updatedFormData[property] = change;
            }
    
            // Return the updated formData object
            return updatedFormData;
        });

        

    }

    const deleteState = () => {
      setDeleteButton('confirm')
      setTimeout(() => {setDeleteButton(true)}, 4000)
    }

    const saveEdits = () => {
      if (!props.modSupModalNew){
        modSupervisor(props.selectedSup._id, formData, props.dispatch, props.state, props.setModSupModalVisible)
      }
      else if (props.modSupModalNew){
        newSupervisor(formData, props.dispatch, props.state, props.setModSupModalVisible, setError)
      }

      // setError('test')
    }

    const autocomplete = (type, supervisor, trigger) => {
      // console.log('autocomplete...')
      trigger == true ? setAutocompleteActive(type) : setAutocompleteActive(null)
    }
    
    const visibility = (selectedSup, type) => {



      return selectedSup.role.director == true && type == 'supervisor' ? 'hidden'
      : selectedSup.role.supervisor == true && type == 'supervisor' ? 'hidden'
      : selectedSup.role.caseWorker == true && type == 'supervisor' ? ''

      : selectedSup.role.director == true && type == 'director' ? 'none'
      : selectedSup.role.supervisor == true && type == 'director' ? ''
      : selectedSup.role.caseWorker == true && type == 'director' ? '' : ''


    }


  return (
    <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
        <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', width: modWidth, minWidth: modMinWidth, height: modHeight}]}>
          
        {/* Top Bar */}
        <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
            <View style={{backgroundColor:'', flex:1, height:'100%'}}>
              <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                <Text>Edit Supervisor</Text>
              </View>
            </View>
            <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
              {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
              <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => props.setModSupModalVisible(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
            </View>
        </View>

        {/* Main Form Section */}
        <ScrollView showsVerticalScrollIndicator={false}  style={{height:'100%',}}>
        <View label={'top gap'} style={{height:40}}></View>
          <View style={{width: '100%', backgroundColor:'', flexDirection: 'row'}}>
          <View style={{width:'100%', flexDirection:'row', flexWrap: 'wrap', justifyContent: justify, }}>
              
            {/* Name Input */}
            <View style={{width:'50%', minWidth: 250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
            <View style={{backgroundColor:'', height:'60', alignSelf:'center', width: '80%'}}>
                <Text>{'Name:'}</Text>
                <View style={{height:5}}/>
                <TextInput defaultValue={formData.name} onChange={(e) => modData(e, 'name')} style={{ backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
                <View style={{height:10}}></View>
            </View>
            </View>
              
            {/* Number of Kids */}
            <View style={{width:'50%', minWidth:250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', height:'60', alignSelf:'center', width: '80%'}}>
                  <Text>{'Number of Kids:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{ backgroundColor:'#F9F9F9', paddingLeft: 10, height:27, borderRadius: 5, width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Text>{formData.numChildren}</Text>
                  </View>
                  {/* <TextInput style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} /> */}
                  <View style={{height:10}}></View>
                </View>
              </View>

              {/* Supervisors Inputs */}
              <View style={{width: '100%', flexDirection: 'row', display: visibility(formData, 'director')}}>

              {/* Director Input */}
              <View style={{width:'50%', minWidth: 250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', height:'60', alignSelf:'center', width: '80%'}}>
                  <Text>{'Director:'}</Text>
                  <View style={{height:5}}/>



                  <TextInput 
                    onFocus={(e) => autocomplete('directors', null, true)} 
                    onBlur={(e) => { setTimeout(() => autocomplete('directors', null, false), 200)}} 
                    value={formData.director} 
                    onChangeText={(e) => modData(e, 'director')} 
                    style={{ backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
                  
                  {autocompleteActive == 'directors' && 
                    <AutocompleteDropdown type={'director'} supervisor={formData.director} modData={modData} supervisors={props.state.supervisors} formdata={formData} autocompleteActive={autocompleteActive} />
                  }
                  
                  <View style={{height:10}}></View>
                </View>
              </View>
              
              {/* Supervisor Input */}
              <View style={{visibility: visibility(formData, 'supervisor'), width:'50%', minWidth: 250, height:'', backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start'}}>
                <View style={{backgroundColor:'', height:'60', alignSelf:'center', width: '80%'}}>
                  <Text>{'Supervisor:'}</Text>
                  <View style={{height:5}}/>
                  <TextInput 
                    onFocus={(e) => autocomplete('supervisors', null, true)} 
                    onBlur={(e) => { setTimeout(() => autocomplete('supervisors', null, false), 200)}} 
                    value={formData.supervisor} 
                    onChangeText={(e) => modData(e, 'supervisor')} 
                    style={{ backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%'}} />
                  
                  {autocompleteActive == 'supervisors' && 
                      <AutocompleteDropdown type={'supervisor'} supervisor={formData.supervisor} modData={modData} supervisors={props.state.supervisors} formdata={formData} autocompleteActive={autocompleteActive} />
                  }
                  
                  <View style={{height:10}}></View>
                </View>
              </View>

              </View>

              {/* Role */}
              <View style={{ zIndex: -1, width:'50%', minWidth:250, backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start', marginTop: 20}}>
                <View style={{backgroundColor:'', alignSelf:'center', width: '80%'}}>
                  <Text>{'Role:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.role.director} onValueChange={(e) => modData(e, 'role.director')}/>
                    <Text style={{marginTop:7}}>Director</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.role.supervisor} onValueChange={(e) => modData(e, 'role.supervisor')}/>
                    <Text style={{marginTop:7}}>Supervisor</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.role.caseWorker} onValueChange={(e) => modData(e, 'role.caseWorker')}/>
                    <Text style={{marginTop:7}}>Case Worker</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.role.vicePresident} onValueChange={(e) => modData(e, 'role.vicePresident')}/>
                    <Text style={{marginTop:7}}>Vice President</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.role.president} onValueChange={(e) => modData(e, 'role.president')}/>
                    <Text style={{marginTop:7}}>President</Text>
                  </View>
                  
                  <View style={{height:10}}></View>

                  
                </View>
              </View>

            {/* Borough */}
              <View style={{zIndex: -1, width:'50%', minWidth:250, backgroundColor:'', justifyContent:'center', alignContent:'center', alignSelf:'flex-start', marginTop: 20}}>
                <View style={{backgroundColor:'', alignSelf:'center', width: '80%'}}>
                  <Text>{'Borough:'}</Text>
                  <View style={{height:5}}/>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.borough.bronx} onValueChange={(e) => modData(e, 'borough.bronx')}/>
                    <Text style={{marginTop:7}}>Bronx</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.borough.brooklyn} onValueChange={(e) => modData(e, 'borough.brooklyn')}/>
                    <Text style={{marginTop:7}}>Brooklyn</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.borough.manhattan} onValueChange={(e) => modData(e, 'borough.manhattan')}/>
                    <Text style={{marginTop:7}}>Manhattan</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.borough.statenIsland} onValueChange={(e) => modData(e, 'borough.statenIsland')}/>
                    <Text style={{marginTop:7}}>Staten Island</Text>
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <Checkbox style={styles.checkbox} value={formData.borough.queens} onValueChange={(e) => modData(e, 'borough.queens')}/>
                    <Text style={{marginTop:7}}>Queens</Text>
                  </View>
                  <View style={{height:10}}></View>
                </View>
              </View>
              
            </View>

          </View>
            <View style={{alignSelf: 'center', flexDirection:'row', gap: 30}}>
              <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}>
                  {/* <Button title="Submit" ></Button> */}
                  <CustomButton title="Save" onPress={() => saveEdits()} color='#8183FF' />
              </View>
              {deleteButton==true &&
              <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}>
                  {/* <Button title="Submit" ></Button> */}
                  <CustomButton title="Delete" onPress={() => deleteState()} color='red' />
              </View>
              }
              {deleteButton=='confirm' &&
              <View style={{height:80, width:150, alignSelf:'center', justifyContent:'center'}}>
                  {/* <Button title="Submit" ></Button> */}
                  <CustomButton title="Confirm?" onPress={() => delSupervisor(props.selectedSup._id, props.dispatch, props.setModSupModalVisible)} color='red' />
              </View>
              }
            </View>

          </ScrollView>
        </View>
        
        {/* Error Modal */}
        <Modal
        transparent
        visible={error}
        animationType="fade"
        onRequestClose={() => {
            setError(false);
            }}
            >
            <View style={{width:'100%', height:'100%', backgroundColor:'rgba(255, 255, 255, 0.8)'}}>
            <View style={[styles.modalContainer, styles.neu, {backgroundColor:'white', width: 400, minWidth: 400, height: 200}]}>
              {/* Top Bar */}
              <View style={[styles.neu, {backgroundColor:'#F9F9F9', height: 40, width: '100%', padding:0, margin:0, marginBottom:'auto', flexDirection: 'row', borderTopLeftRadius:10, borderTopRightRadius:10,}]}>
                  <View style={{backgroundColor:'', flex:1, height:'100%'}}>
                    <View style={{flex:1, justifyContent:'center', alignContent:'center', marginLeft:20}}>
                      <Text>Error</Text>
                    </View>
                  </View>
                  <View style={{width: 90, height: 35, backgroundColor: '', alignSelf:'center', alignItems:'center', justifyContent:'center', marginLeft:'auto', marginRight:15}}>
                    {/* <Button title="Close" onPress={() => props.setModalVisible(false)}/> */}
                    <Pressable style={{backgroundColor:'', width:35, height:35, marginLeft:'auto'}} onPress={() => setError(false)}><CloseComponent style={{width:'100%', marginLeft:'auto'}}/></Pressable>
                  </View>
              </View>
              
              <View style={{flex:1, backgroundColor:'', justifyContent: 'center', alignContent:'center'}}>
                <Text style={{color:'red'}}>{error}</Text>
              </View>
            </View>
            </View>

        </Modal>
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

export default AdminSingleSupervisorModal