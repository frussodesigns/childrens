import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { getAuth, signOut } from "firebase/auth";
import { Link } from "expo-router"
import React, {useState, useEffect} from 'react'
import { useFonts } from 'expo-font';
import NeuView from './NeuView';
import { LoadFonts } from '../presets';


const CustomMenu = ({setIsHovered, setReportsModalVisible}) => {
    // const [fontsLoaded] = useFonts({
    //     'Rubik': require('../assets/fonts/Rubik-Regular.ttf'),
    //   });
    LoadFonts
    const auth = getAuth()
const [width, setWidth] = useState('4em')

const handlePressableHoverIn = () => {
    setIsHovered(true);
    console.log('hover')
    }

const handlePressableHoverOut = () => {
    setIsHovered(false);
    console.log('hover-out')
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            console.log('signed out successfully')
            console.log(auth)
          }).catch((error) => {
            console.log('error:')
            console.log(error)
            console.log(auth)
          });
    }

// useEffect(() => {
//   setWidth(isHovered ? '4em' : '11em')
// //   console.log(width)
// }, [isHovered])


  return (
    <Pressable style={{height:'100%', backgroundColor:''}} onHoverIn={handlePressableHoverIn} onHoverOut={handlePressableHoverOut}>
    <View style={{flexDirection:'column', justifyContent:'center', backgroundColor:'#F9F9F9', height: '100%'}}>
        
        <View style={{height: 20}} ></View>
        <View style={{width: '10em', height: 80, backgroundColor: '', alignSelf:'center'}} >
        <Image source={require('../assets/-logo.png')} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}} />
        </View>
        <View style={{height: 20}} ></View>
        <View style={{height: 0, width:'90%', alignSelf: 'center', borderColor:'lightgrey', borderBottomWidth:.2}} />
        <View style={{height: 10}} ></View>
            <Link href="/">
                <NeuView style={{width:'90%', height:'2.5em', borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Overview</Text>
                </NeuView>
            </Link>
            <Link href="/documents">
                <NeuView style={{width:'90%', height:'2.5em', borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Document Tracking</Text>
                </NeuView>
            </Link>
            <Link href="/adoption">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Adoption</Text>
                    </View>
                </View>
            </Link>
            <Link href="/kingap">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>KinGap</Text>
                    </View>
                </View>
            </Link>
            <Link href="/kingap">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Reports</Text>
                    </View>
                </View>
            </Link>
            <Link href="/kingap">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>About</Text>
                    </View>
                </View>
            </Link>
            <NeuView cursor={'pointer'} onPress={()=>setReportsModalVisible(true)} style={{width:'90%', height:'2.5em', borderRadius: 6, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>New Report</Text>
            </NeuView>
            {auth && <NeuView cursor={'pointer'} onPress={()=>signUserOut()} style={{width:'90%', height:'2.5em', borderRadius: 6, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Sign Out</Text>
            </NeuView>}
            <View style={{height: 50}} ></View>

            {/* <View>{isHovered ? <Text style={{textAlign:'center', color: 'red'}}>//hover detected!</Text> : null}</View> */}
            {/* gap: */}
            <View style={{flex:1}}></View>
            <Link href="/kingap">
                <View style={{flex:1, justifyContent:'center', alignContent:'center', width:'100%', height: 65}}>
                    <View style={[styles.neu, {backgroundColor: 'white', width: '90%', height: 65, borderRadius: 65, marginLeft: 10, marginRight: 10, marginBottom: 30}]}>
                    <View style={[styles.secondShadow, {flexDirection: 'row', padding:0, margin:0, flex: 1, borderRadius: 65, justifyContent: 'flex-start'}]}>
                        <View style={{backgroundColor:'rgb(242,242,242)', top: 8, left: 8, height: 50, width: 50, borderRadius: 65, }}></View>
                        <View style={{alignSelf: 'center', marginLeft:15}}>
                        <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Rubik', color:'black'}}>Account</Text>
                        </View>
                    </View>
                    </View>
                </View>
            </Link>
            
    </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
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


export default CustomMenu