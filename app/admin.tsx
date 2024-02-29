import { StyleSheet, ScrollView, View, Text, TextInput, Modal, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import NeuView from '../components/NeuView'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import SearchIcon from '../assets/searchIcon'
import AdminModal from '../components/AdminModal'
import AdminSupervisorsModal from '../components/AdminSupervisorsModal';
import NewUserModal from '../components/NewUserModal'
import DischargeModal from '../components/DischargeModal'
import CsvModal from '../components/CsvModal';
import { LoadFonts } from '../presets'
import ResponsiveModal from '../components/ResponsiveModal'
import AdminSingleSupervisorModal from '../components/AdminSingleSupervisorModal';
import { Link, Stack, useRouter, useFocusEffect, Redirect } from "expo-router";
import { useAppContext } from '../hooks/useAppContext';

const users = [
    {
        id: 0,
        name: 'Bill Waldrin',
        email: 'example@example.com',
        passNovelty: 14,
        reportsThisMonth: 2,
        permissions: ['admin', 'docs', 'adoption', 'kingap', 'homefinding'],
    },
    {
        id: 1,
        name: 'Alvin Taylor',
        email: 'example@example.com',
        passNovelty: 14,
        reportsThisMonth: 2,
        permissions: ['admin', 'docs', 'adoption', 'kingap', 'homefinding'],
    },
    {
        id: 2,
        name: 'Melissa Mahrez',
        email: 'example@example.com',
        passNovelty: 14,
        reportsThisMonth: 2,
        permissions: ['admin', 'docs', 'adoption', 'kingap', 'homefinding'],
    },
    {
        id: 3,
        name: 'Eldridge Hemsworth',
        email: 'example@example.com',
        passNovelty: 14,
        reportsThisMonth: 2,
        permissions: ['admin', 'docs', 'adoption', 'kingap', 'homefinding'],
    },
    
]

export default function admin() {

    LoadFonts()
    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()

    const [userId, setuserId] = useState(null)

    const { state, dispatch } = useAppContext()

    // getAuth()
    // .getUser(uid)
    // .then((userRecord) => {
    //   // See the UserRecord reference doc for the contents of userRecord.
    //   console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    // })
    // .catch((error) => {
    //   console.log('Error fetching user data:', error);
    // });

    const [modalVisible, setModalVisible] = useState(false)
    const [newUserModalVisible, setNewUserModalVisible] = useState(false)
    const [supervisorsModalVisible, setSupervisorsModalVisible] = useState(false)
    const [dischargeModalVisible, setDischargeModalVisible] = useState(false)
    const [supModalVisible, setSupModalVisible] = useState(false)
    const [csvModalVisible, setCsvModalVisible] = useState(false)
    const [modalId, setModalId] = useState(-1)
    const [contentWidth, setWidth] = useState()
    const [searchActive, setSearchActive] = useState(false)
    const [modSupModalVisible, setModSupModalVisible] = useState(false)
    const [modSupModalNew, setModSupModalNew] = useState(false)
    const [selectedSup, setSelectedSup] = useState(null)
    const [supervisors, setSupervisors] = useState([])

    useEffect(() => {
      console.log(modalId)
    }, [modalId])

    // useEffect(() => {
    //   console.log(userId)
    // }, [userId])

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // setInitialFetch(true) //security concern ? can someone just inject true??
        //   setuserId(user.email)
          console.log(user)
        } else {
          // User is signed out
          console.log('not signed in')
          window.location.pathname = '/login'
          router.push('/login')
        }
      })
    
    
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
        // console.log(width)
      };

    const formatPermissions = (arr) => {
        let string = ''
        arr.forEach(element => {
            if (string == '') string = element
            else
            string = string + ', ' + element
        });
        return(string)
    }

    const buildTable = () => {
        let userArr = []
        let i = 0

        users.forEach(element => {
            i++
            userArr.push(
                <View style={[{borderRadius: 0, backgroundColor:'#F9F9F9', minWidth:200, height:40, marginBottom:10}]}>
                    <NeuView onPress={handlePress} id={element.id} style={{flex:1, borderRadius:0}}>
                        <View style={{flexDirection:'column', width: '100%', height: '80%'}}>

                            <View style={{flexDirection:'row', left: 11, margin: 10}}>
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'regular', fontSize: 17, fontFamily: 'Rubik'}} >{element.name}</Text>
                                    </ScrollView>
                                </View>
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'regular', fontSize: 17, fontFamily: 'Rubik'}} >{element.email}</Text>
                                    </ScrollView>
                                </View>
                              
                                {/* <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'regular', fontSize: 17, fontFamily: 'Rubik'}} >{element.passNovelty}</Text>
                                    </ScrollView>
                                </View> */}
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'regular', fontSize: 17, fontFamily: 'Rubik'}} >{element.reportsThisMonth}</Text>
                                    </ScrollView>
                                </View>
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'regular', fontSize: 17, fontFamily: 'Rubik'}} >{formatPermissions(element.permissions)}</Text>
                                    </ScrollView>
                                </View>
                                {/* <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik', marginRight:20}} >EMAIL@EMAIL.COM</Text> */}
                            </View>

                            {/* <View style={{height:20}} /> */}

                        </View>
                    </NeuView>
                </View>
            )
        });

        return (userArr)

    }

    const handlePress = (id) => {
        setModalVisible(true)
        setModalId(id)
      }

  return (
    <View style={{height:'100%', width:'100%', backgroundColor:'', flexDirection:'row'}} onLayout={onLayout}>
        {/* <ScrollView style={styles.page}> */}
                <ScrollView style={{width:contentWidth, height:'100%', flex:1}} horizontal={true}>
            <View style={{minWidth: contentWidth, backgroundColor:'', height: '100vh', padding: 20, gap: 10, flexDirection:'column' }}>


                {/* Admin Label: */}
                <View style={{borderRadius: 12, backgroundColor:'#F9F9F9', minWidth:200, height:40, marginBottom:0, borderBottomRightRadius:0, borderBottomLeftRadius:0}}>
                    <NeuView style={{flex:1, flexDirection:'row' , borderRadius:0, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                        <View style={{flexDirection:'row', width: '100%', height: '80%'}}>

                            <View style={{left: 11, margin: 10, marginRight:'auto'}}>
                                <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >ADMIN PANEL</Text>
                            </View>

                            {/* <View style={{height:20}} /> */}

                        
                        {!searchActive &&
                        <>
                        <Pressable activeOpacity={1} onPress={()=>setCsvModalVisible(true)}>
                            <View style={{cursor: 'pointer', width: 120, height:30, marginTop:6, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                                <Text>Import CSV</Text>
                            </View>
                        </Pressable>

                        <Pressable activeOpacity={1} onPress={()=>setDischargeModalVisible(true)}>
                            <View style={{cursor: 'pointer', width: 120, height:30, marginTop:6, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                                <Text>Discharge List</Text>
                            </View>
                        </Pressable>

                        <Pressable activeOpacity={1} onPress={()=>setSupModalVisible(true)}>
                            <View style={{cursor: 'pointer', width: 120, height:30, marginTop:6, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                                <Text>Supervisors</Text>
                            </View>
                        </Pressable>

                        <Pressable activeOpacity={1} onPress={()=>setNewUserModalVisible(true)}>
                            <View style={{cursor: 'pointer', width: 120, height:30, marginTop:6, marginRight:10, borderRadius:15, backgroundColor:'lightgrey', alignItems:'center', justifyContent:'center'}}>
                                <Text>New User</Text>
                            </View>
                        </Pressable>
                        </>
                        }

                        <View style={{flexDirection: 'row', marginRight: 12 }}>
                            <Pressable onPress={() => setSearchActive(!searchActive)}>
                                <View style={{width:28, height:28, marginTop:8, backgroundColor:'', }}>
                                    <SearchIcon style={{width:'100%', height:'100%', fill:'grey'}} />
                                </View>
                            </Pressable>
                            {searchActive && <TextInput style={{flex:1, backgroundColor:'#e8e8e8', marginTop:7, paddingLeft:10, borderRadius:10, width:350,}} />}
                        </View>

                        </View>
                    </NeuView>
                </View>

                {/* Heading Row: */}
                <View style={[{borderRadius: 0, backgroundColor:'#F9F9F9', minWidth:200, height:40, marginTop:0}]}>
                    <NeuView style={{flex:1, borderRadius:0}}>
                        <View style={{flexDirection:'column', width: '100%', height: '80%'}}>

                            <View style={{flexDirection:'row', left: 11, margin: 10}}>
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >NAME</Text>
                                    </ScrollView>
                                </View>
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >EMAIL</Text>
                                    </ScrollView>
                                </View>
                              
                                {/* <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >LAST PASSWORD CHANGE</Text>
                                    </ScrollView>
                                </View> */}
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >REPORTS THIS MONTH</Text>
                                    </ScrollView>
                                </View>
                                
                                <View style={{flex:1, height:'100%', backgroundColor:'', marginRight:20, minWidth:150}}>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{backgroundColor:''}} >
                                        <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >PERMISSIONS</Text>
                                    </ScrollView>
                                </View>
                                {/* <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik', marginRight:20}} >EMAIL@EMAIL.COM</Text> */}
                            </View>

                            {/* <View style={{height:20}} /> */}

                        </View>
                    </NeuView>
                </View>

                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{flex: 1, borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                    {buildTable()}
                </ScrollView>


            </View>
                </ScrollView>
        {/* </ScrollView> */}

        <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
            setModalVisible(false);
            }}
            >
            <AdminModal modalId={modalId} users={users} setModalVisible={setModalVisible} />
        </Modal>

        {/* New User Modal */}
        <Modal
        transparent
        visible={newUserModalVisible}
        animationType="fade"
        onRequestClose={() => {
            setNewUserModalVisible(false);
            }}
            >
            <NewUserModal modalId={modalId} users={users} setModalVisible={setNewUserModalVisible} />
        </Modal>

        {/* Discharge List Modal */}
        <Modal
        transparent
        visible={dischargeModalVisible}
        animationType="fade"
        onRequestClose={() => {
            setDischargeModalVisible(false);
            }}
            >
                <DischargeModal modalId={modalId} users={users} setModalVisible={setDischargeModalVisible} />

        </Modal>

        {/* CSV Upload Modal */}
        <Modal
        transparent
        visible={csvModalVisible}
        animationType="fade"
        onRequestClose={() => {
            setCsvModalVisible(false);
            }}
            >
                <CsvModal modalId={modalId} users={users} setModalVisible={setCsvModalVisible} />

        </Modal>

        {/* Supervisor Modal */}
        <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
            setModalVisible(false);
            }}
            >
            <AdminModal modalId={modalId} users={users} setModalVisible={setModalVisible} setModSupModalNew={setModSupModalNew} />
        </Modal>

        {/* Mod Supervisor Modal */}
        <Modal
        transparent
        visible={supModalVisible}
        animationType="fade"
        onRequestClose={() => {
            setModalVisible(false);
            }}
            >
            <AdminSupervisorsModal modalId={modalId} users={users} setModSupModalNew={setModSupModalNew} setModalVisible={setSupModalVisible} setModSupModalVisible={setModSupModalVisible} setSelectedSup={setSelectedSup} supervisors={supervisors} setSupervisors={setSupervisors} state={state} dispatch={dispatch} />
        </Modal>

        <Modal
          transparent
          visible={modSupModalVisible}
          onRequestClose={()=> setModSupModalVisible(false)}
          animationType="fade"
          >
            <AdminSingleSupervisorModal dispatch={dispatch} state={state} setModSupModalVisible={setModSupModalVisible} setSelectedSup={setSelectedSup} modSupModalNew={modSupModalNew} selectedSup={selectedSup} supervisors={supervisors} setSupervisors={setSupervisors} />
        </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '',
        height: '100vh',
        width:'100%',
        // margin: 50,
    },
})