import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";

import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    Pressable,
    ScrollView,
    Modal
} from 'react-native'
import { Link, Stack, useRouter } from "expo-router";
import React, {useState} from 'react'
import { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import MyTable from '../components/table';
import SvgArrow from '../assets/arrow';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import MyChart from '../components/chart';
import DocumentModal from '../components/DocumentModal';
import LineChart from '../components/LineChart';
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { version } from 'canvaskit-wasm/package.json';
import { useFonts } from 'expo-font';
import {useWindowDimensions} from 'react-native';
import NeuView from '../components/NeuView';
import { LoadFonts } from '../presets';
import { getData } from '../apiCalls';
import documents from './documents';
import { Redirect } from 'expo-router';

const specs = {
  groupings: [
    {
      section: "Child Info",
      fields: 4
    },
    {
      section: "Additional Info",
      fields: 3
    },
    {
      section: "Birth Certificate",
      fields: 5
    },
    {
      section: "Social Security Card",
      fields: 3
    },
    {
      section: "Passport",
      fields: 3
    },
    {
      section: "State ID",
      fields: 4
    },
    {
      section: "Death Certificate",
      fields: 3
    },
    {
      section: "Case Worker",
      fields: 1
    },
    {
      section: "Possibly Discharged",
      fields: 1
    },
  ],
  sizing:[.8,]
}

const columns = [
  "CIN", 
  "Firstname", 
  "Middlename", 
  "Lastname", 
  "Status", "Initial Placement", "Date of Birth", 
  "Birth Certificate", "Has 2", "Born Outside the U.S.", "Date Requested", "Date Added",
  "Social Security Card", "Date Requested", "Date Added",
  "Passport", "Date Requested", "Date Added",
  "State ID", "NYC ID", "Date Requested", "Date Added",
  "Death Certificate", "Date Requested", "Date Added",
  "Case Worker", "Possibly Discharged"
]

const types = [
  "number", 
  "string", 
  "string", 
  "string", 
  "status", "date", "date", 
  "bool", "bool", "bool", "date", "date",
  "bool", "date", "date",
  "bool", "date", "date",
  "bool", "bool", "date", "date",
  "bool", "date", "date",
  "string", "bool"
]

const obj = [
    {
    id: 0,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 1,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 2,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 3,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 4,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 5,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 6,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 7,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 8,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 9,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
    {
    id: 10,
    Firstname: 'Creola',
    Middlename: 'Elena',
    Lastname: 'Johnson',
    Status: 'In Progress',
    initialPlacement: '1/1/2021',
    dob: '1/1/2021',
    birthCertificate: true,
    birthCertificateHas2: true,
    botus: false,
    birthCertificateDateRequested: '1/1/2021',
    birthCertificateDateAdded: '1/2/2021',
    socialSecurityCard: false,
    socialSecurityCardDateRequested: '1/1/2021',
    socialSecurityCardDateAdded: '1/2/2021',
    passport: false,
    passportDateRequested: '1/1/2021',
    passportDateAdded: '1/2/2021',
    stateId: false,
    nycId: true,
    stateIdDateRequested: '1/2/2021',
    stateIdDateAdded: '1/2/2021',
    deathCertificate: false,
    deathCertificateDateRequested: '1/1/2021',
    deathCertificateDateAdded: '1/2/2021',
    caseWorker: 'Alex Rodriguez',
    dischargedPossible: false,

    }, 
  
]

const data = [
  {
    date: "Tue Mar 21 2023 11:52:44 GMT-0400 (Eastern Daylight Time)",
    value: 0,
  },
  {
    date: "Wed Mar 22 2023 11:52:44 GMT-0400 (Eastern Daylight Time)",
    value: .2,
  },
]

const summaries = {
  topRow: [
    {
      title: 'Entries',
      change: 5/100,
      entries: 748
    },
    {
      title: 'Passports',
      change: -5/100,
      entries: 489
    },
    {
      title: 'Social Security Cards',
      change: 5/100,
      entries: 548
    },
    {
      title: "State ID's",
      change: 8/100,
      entries: 648
    },
  ],
  overview: {
    addedThisWeek: 120,
    percent: 70/100
  },
  chart: {
    xAxis: [
      "January", "February", "March", "April", "May", "June"
    ],
    yAxis: [
      120,
      210,
      240,
      288,
      340,
      450
    ]
  }
}

const Index = () => {
  // const [fontsLoaded] = useFonts({
  //   'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
  // });
  LoadFonts()

  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()

  const {height, width} = useWindowDimensions();
  const [pageBottom, setPageBottom] = useState(60)
  const [docData, setDocData] = useState(null)
  const [error, setError] = useState(false)
  const [results, setResults] = useState()

  //initial data fetch *********************
      useEffect(() => {
        LoadFonts()
        console.log(user)
        // if (!state.docLogs && user) getData(pgLen, pgData, setError, setDocData, setResults, dispatch)
        // else {
        //   console.log('not logged in')
        //   console.log(auth)
        //   console.log(user)
        // }

    }, [user])

    onAuthStateChanged(auth, (user) => {
        if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // setInitialFetch(true) //security concern ? can someone just inject true??
        router.push('/homefinding')
        console.log(user)
        } else {
        // User is signed out
        console.log('not signed in')
        window.location.pathname = '/login'
        router.push('/login')
        }
    })

  useEffect(() => {
    width > 800 ? setPageBottom(60) : setPageBottom(200)
  }, [width])

  //initial data fetch
  useEffect(() => {
    
    getData(15, 0, setError, setDocData, setResults)
    

  }, [])

  useEffect(() => {
    console.log(docData)
  
  }, [docData])
  
  
  

  const [modalVisible, setModalVisible] = useState(false)
  const [newEntry, setNewEntry] = useState(false)
  const [modalId, setModalId] = useState(-1)
  const [indexPressed, setIndexPressed] = useState(-1)  

  const handlePress = (id, index) => {
    setNewEntry(false)
    setModalVisible(true)
    setModalId(id)
    setIndexPressed(index)
  }

  const [firstWidth, setWidth] = useState(0);
  const [graphWidth, setGWidth] = useState(0);
  const [tableWidth, setTWidth] = useState(0);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
    // console.log(width)
  };
  const graphLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setGWidth(width);
    // console.log(width)
  };
  const tableLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setTWidth(width);
    // console.log(width)
  };

  const newLog = () => {
    setNewEntry(true)
    setModalVisible(true)
    setModalId(0)
  }

  const buildTopRow = () => {
    let topRowContent = []

    for (let i = 0; i < summaries.topRow.length; i++) {
      topRowContent.push(
        <View style={{borderRadius: 12, padding:0, margin:0, backgroundColor:'#F9F9F9', flex: i==summaries.topRow.length-1?null:1 , minWidth:200, width: i==summaries.topRow.length-1?firstWidth:null }} onLayout={i==0 ? onLayout : null}>
          <NeuView style={{borderRadius: 12, backgroundColor:'#F9F9F9', flex: i==summaries.topRow.length-1?null:1 , minWidth:200, width:'100%' }} onLayout={i==0 ? onLayout : null}>
          {/* <View style={[styles.secondShadow, {flex:1, borderRadius:12}]}> */}
            <View style={{flexDirection:'column', width: '100%', height: '80%', backgroundColor:''}}>
              <View style={{flexDirection:'row',}}>

                <View style={{left: 11, margin: 10, flex:1}}>
                  <Text numberOfLines={1} style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >{summaries.topRow[i].title.toUpperCase()}</Text>
                </View>
                <View style={{height:'1em', width:'1em', backgroundColor:'', alignSelf:'center', marginLeft:'auto', marginRight:0}}>
                  <SvgArrow style={{transform: [{ rotateZ: summaries.topRow[i].change>0?'-90deg':'90deg' }], color: summaries.topRow[i].change>0?'green':'red' }} />
                </View>
                <View style={{height:'1em', backgroundColor:'', alignSelf:'center', margin:4, bottom:5, marginRight:20}}>
                  <Text style={{color: summaries.topRow[i].change>0?'green':'red', fontWeight: '', fontSize: 17}} >{summaries.topRow[i].change>0?"+"+summaries.topRow[i].change*100+'%':summaries.topRow[i].change*100+'%'}</Text>
                </View>
              </View>
              <View style={{left: 11, margin: 10, marginTop: 0}}>
                <Text style={{color:'black', fontWeight: '200', fontSize: 45}} >{summaries.topRow[i].entries}</Text>
              </View>
              <View style={{left: 11, margin: 10}}>
                <Text onPress={()=>newLog()} style={{textDecorationLine: 'underline', fontWeight: '200', fontSize: 14}} >Add New Entry</Text>
              </View>
            </View>
          </NeuView>
        </View>
      )
    }

    return topRowContent
  }

  // return <Redirect href="/login" />;
  // return (
  //   <View style={{height:'100%', width:'100%'}}>
  //   <ScrollView style={styles.page}>
      
  //     {/* First Row */}
  //     <View style={{flexDirection:'row',flexWrap:'wrap', width: '100%', backgroundColor:'', height: '', padding: 20, gap: 20}}>
  //       {buildTopRow()}
  //     </View>

  //     {/* Second Row */}
  //     <View style={{flexDirection:'row', width: '100%', backgroundColor:'', height: '', padding: 20, paddingTop:0, gap: 20, flexWrap:'wrap', }}>
  //       <View style={[{borderRadius: 12, backgroundColor:'#F9F9F9', flex: 1, minWidth:200,}]}>
  //         <NeuView style={{flex:1, borderRadius:12}}>
  //           <View style={{flexDirection:'column', width: '100%', height: '80%'}}>
  //               <View style={{left: 11, margin: 10}}>
  //                 <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >OVERVIEW</Text>
  //               </View>
  //               <View style={{alignSelf:'center', marginTop:30}}>
  //                 <AnimatedCircularProgress
  //                 size={150}
  //                 width={10}
  //                 fill={75}
  //                 duration={2000}
  //                 rotation={0}
  //                 tintColor="#00e0ff"
  //                 onAnimationComplete={() => console.log('onAnimationComplete')}
  //                 backgroundColor="#7795b5">
  //                   {
  //                       (fill) => (
  //                         <Text style={{fontSize:30, color:"#00e0ff"}}>
  //                           { '75%' }
  //                         </Text>
  //                       )
  //                     }
  //                 </AnimatedCircularProgress>
  //                 {/* <WithSkiaWeb 
  //                   opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
  //                   getComponent={() => import('../components/Breathe')}
  //                   fallback={<Text>Loading Skia...</Text>}
  //                 /> */}
            
  //               </View>
  //               <View style={{alignSelf:'center', marginTop:30}}>
  //                   <Text style={{textAlign:'center'}}>Total Documents Added This Week:</Text>
  //               </View>
  //               <View style={{alignSelf:'center', marginTop:5}}>
  //                   <Text style={{fontSize:40, fontWeight:'400'}}>120</Text>
  //               </View>
  //               {/* <View style={{height:10}}></View> */}
  //               {/* <View style={{left: 11, margin: 10, marginTop: 0}}>
  //                 <Text style={{color:'black', fontWeight: '200', fontSize: 45}} >748</Text>
  //               </View> */}
                
  //           </View>
  //         </NeuView>
  //       </View>

  //       <View style={{borderRadius: 12, backgroundColor:'#F9F9F9', flex: 2, minWidth:300 }} onLayout={graphLayout}>
  //         <NeuView style={{flex:1, borderRadius:12}}>
  //           <View style={{flexDirection:'column', width: '100%', height: '100%'}}>
  //               <View style={{left: 11, margin: 10}}>
  //                 <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >CHART</Text>
  //               </View>
  //               <View style={{width:'100%', height:'80%', backgroundColor:'', flex:1, alignContent:'center'}}>
  //                 <MyChart data={data} width={graphWidth} />
  //                 {/* <LineChart /> */}
  //                 {/* <WithSkiaWeb
  //                   opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
  //                   getComponent={() => import("../components/LineChart")}
  //                   fallback={<Text>Loading Skia...</Text>}
  //                 /> */}
  //               </View>
  //           </View>
  //         </NeuView>
  //       </View>
  //     </View>

  //     {/* Table */}
  //     <View style={{flexDirection:'row', width: '100%', backgroundColor:'', height: '70vh', padding: 20, paddingTop:0, gap: 20}} onLayout={tableLayout}>
  //       <View style={[styles.neu, {flexDirection:'row', borderRadius: 12, backgroundColor:'#F9F9F9', flex: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}]}>
  //         <View style={[styles.secondShadow, {flex:1, flexDirection:'row', borderRadius:12}]}>
  //           <View style={{flexDirection:'column', width: '100%'}}>
  //             <View style={{left: 11, margin: 10}}>
  //               <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >DATA</Text>
  //             </View>
  //             {docData &&
  //             <MyTable obj={docData} columns={columns} width='100%' height='90%' sc={4} sr={0} handlePress={handlePress} viewWidth={tableWidth} />
  //             }
  //           </View>
  //         </View>
  //       </View>
  //     </View>

  //     <View style={{height:60}}></View>
  //   </ScrollView>
  //   <View style={{height: 0}}>

  //   {/* Table Page Navigation */}
  //   {width < 800 ? null :
  //   <View style={{flexDirection:'row', backgroundColor: '', width: '100%', height: 40, bottom: 60, justifyContent: 'center', gap: 20 }}>
  //         <View style={[styles.neu, {cursor: 'pointer', borderRadius: 100, backgroundColor:'#F9F9F9', width: '40px', height: '100%', alignSelf: 'center', justifyContent: 'center',}]}>
  //           <View style={{width:'40%', height:'40%', alignSelf:'center'}}>
  //             <SvgArrow style={{transform: [{ rotateZ: '-180deg' }], color:'grey' }} />
  //           </View>
  //         </View>
  //         <View style={[styles.neu, {borderRadius: 100, backgroundColor:'#F9F9F9', width: '100px', height: '100%', alignSelf: 'center', alignItems:'center', justifyContent:'center'}]}>
  //           <Text>1 / {results}</Text>
  //         </View>
  //         <View style={[styles.neu, {cursor: 'pointer', borderRadius: 100, backgroundColor:'#F9F9F9', width: '40px', height: '100%', alignSelf: 'center', justifyContent: 'center',}]}>
  //           <View style={{width:'40%', height:'40%', alignSelf:'center'}}>
  //             <SvgArrow style={{transform: [{ rotateZ: '0deg' }], color:'grey' }} />
  //           </View>
  //         </View>
  //   </View>
  //   }
  //   </View>

  //   <Modal
  //     transparent
  //     visible={modalVisible}
  //     animationType="fade"
  //     onRequestClose={() => {
  //       setModalVisible(false);
        
  //     }}
  //   >
  //     <DocumentModal 
  //       newEntry={newEntry}
  //       modalId={modalId} 
  //       index={indexPressed}
  //       setModalVisible={setModalVisible} 
  //       columns={columns} 
  //       specs={specs} 
  //       types={types} 
  //       data={docData}
        
  //       />
      
  //   </Modal>
    
  //   </View>
  // )
}

export default Index

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
    container: {
        flexDirection: 'column',
        // flex: 1,
        height: '97%',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 24,
        backgroundColor: '#F9F9F9',
        width: '98%',
        // minWidth: 1000,
        maxWidth: 1312,
        maxHeight: "97%",
        margin: 10,
        borderRadius: 12,
        boxShadow: `0px 0px 5px grey`
      },
    title: {
        marginTop: 16,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: '#20232a',
        borderRadius: 60,
        backgroundColor: '#61dafb',
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        // width: 500,
        
    },
    modalContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: '#eee',
      borderRadius: 10,
      borderWidth: 1,
      justifyContent: 'center',
      height: '75%',
      margin: 'auto',
      padding: 30,
      width: "60%",
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