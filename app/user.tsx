import { StyleSheet, Text, View } from 'react-native'
import {useWindowDimensions, TouchableOpacity, ScrollView} from 'react-native';
import { Link, Stack, useRouter, useFocusEffect, Redirect } from "expo-router";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { useAppContext } from '../hooks/useAppContext';
import React, { useState, useEffect } from 'react'
import NeuView from '../components/NeuView'
import MyTable from '../components/table';
import { LoadFonts } from '../presets';


const User = () => {

    const { state, dispatch } = useAppContext()

    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()

    const {height, width} = useWindowDimensions();
    const [tableHeight, setTableHeight] = useState(0);
    const [firstWidth, setWidth] = useState(0);
    const [tableWidth, setTWidth] = useState(0);
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
        // console.log(width)
      };

    const onLayoutHeight = (event) => {
      const { height } = event.nativeEvent.layout;
      setTableHeight(height);
    };

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
        console.log(user)
        } else {
        // User is signed out
        console.log('not signed in')
        window.location.pathname = '/login'
        router.push('/login')
        }
    })

    ///////////////////////


    const homefindingFunctions = {
        overviewJSX: () => {
            <>

            </>
        },
        homesJSX: () => {
            <>

            </>
        },
        recruitmentJSX: () => {
            <>

            </>
        },
        recruitersJSX: () => {
            <>

            </>
        },
    }

    return(
        <>
        {/* <ScrollView style={styles.page}> */}
            <View style={{flex:1, height:'100%', backgroundColor:''}}>
                <View  style={{borderRadius: 12, padding:0, marginHorizontal:20, marginTop:5, backgroundColor:'#F9F9F9', minWidth:200}} onLayout={onLayout}>
                    <NeuView style={{borderRadius: 12, backgroundColor:'#F9F9F9', minWidth:200, width:'100%' }} onLayout={onLayout}>
                        <View style={{left: 11, margin: 10}}>
                            <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}}>MY ACCOUNT</Text>
                        </View>
                    </NeuView>
                </View>
                
                <View  style={{borderRadius: 12, padding:0, marginHorizontal:20, marginTop:10, backgroundColor:'#F9F9F9', minWidth:200}} onLayout={onLayout}>
                    <NeuView style={{borderRadius: 12, backgroundColor:'#F9F9F9', minWidth:200, width:'100%' }} onLayout={onLayout}>
                        <View style={{left: 11, margin: 10}}>
                            <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}}>{'email: '+ user.email}</Text>
                        </View>
                    </NeuView>
                </View>
                
            </View>
        {/* </ScrollView> */}
        </>
    )

//   return (
//     <View style={styles.container}>
//         <Text>overview, homes, recruitment & recruiters views</Text>

//         <View style={{flexDirection:'column', width: '100%', height: '80%'}}>
//               <View style={{left: 11, margin: 10}}>
//                 <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >OVERVIEW</Text>
//               </View>
//               <View style={{alignSelf:'center', marginTop:30}}>
//                 <AnimatedCircularProgress
//                 size={150}
//                 width={10}
//                 fill={Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}
//                 duration={2000}
//                 rotation={0}
//                 tintColor="#00e0ff"
//                 onAnimationComplete={() => console.log('onAnimationComplete')}
//                 backgroundColor="#7795b5">
//                   {
//                       (fill) => (
//                         <Text style={{fontSize:30, color:"#00e0ff"}}>
//                           {Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}%
//                         </Text>
//                       )
//                     }
//                 {/* <WithSkiaWeb 
//                   opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
//                   getComponent={() => import('../components/Breathe')}
//                   fallback={<Text>Loading Skia...</Text>}
//                 /> */}
          
//               </View>
//               <View style={{alignSelf:'center', marginTop:30}}>
//                   <Text style={{textAlign:'center'}}>Total Documents Added This Month:</Text>
//               </View>
//               <View style={{alignSelf:'center', marginTop:5}}>
//                   <Text style={{fontSize:40, fontWeight:'400'}}>{topStats.overview.addedThisWeek}</Text>
//               </View>
//               {/* <View style={{height:10}}></View> */}
//               {/* <View style={{left: 11, margin: 10, marginTop: 0}}>
//                 <Text style={{color:'black', fontWeight: '200', fontSize: 45}} >748</Text>
//               </View> */}
              
//           </View>

//         {/* {homes && homes.map((home, index) => 
//             <>
//                 <Text>{home.name}</Text>
//             </>
//         )} */}
//     </View>
//   )
}

export default User

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
        flex: 1,
        gap: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
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
