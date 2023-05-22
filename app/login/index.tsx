import { LOGIN_SUCCESS_URL } from '@env'
import { getAuth, sendSignInLinkToEmail, onAuthStateChanged } from "firebase/auth"
import { StyleSheet, View, Text, ImageBackground, TextInput, Button, Pressable, TouchableOpacity, Modal } from 'react-native'
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useFocusEffect, Redirect } from "expo-router";
import React, { useEffect, useState } from 'react'
import NeuView from '../../components/NeuView';
import ResponsiveModal from "../../components/ResponsiveModal";

export default function index() {
    const auth = getAuth()
    const router = useRouter()
    const [fontsLoaded] = useFonts({
        'Rubik': require('../../assets/fonts/Rubik-Regular.ttf'),
      });

    const [height, setHeight] = useState()
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [signedIn, setSignedIn] = useState(false)
    const [success, setSuccess] = useState(false)

    // useFocusEffect(() => {
    //     if (signedIn) {
    //         console.log(auth.currentUser)
    //         router.push("/login/success")
    //     }
    // })

    // if (auth.currentUser) {
    //     window.location.pathname = '/login/success'
    //     return <Redirect href="/login/success" />
    // }
    

    useEffect(() => {
      console.log(auth)
    //   setSignedIn(true)
    }, [auth])
    


    const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
    console.log(height)
    }

    const img = "../../assets/image.jpg"

    const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: LOGIN_SUCCESS_URL,
        // This must be true.
        handleCodeInApp: true,
        // iOS: {
        //   bundleId: 'com.childrensaid.ios'
        // },
        // android: {
        //   packageName: 'com.childrensaid.android',
        //   installApp: true,
        //   minimumVersion: '12'
        // },
        // dynamicLinkDomain: 'example.page.link'
      }

    const login = () => {
        console.log('submitted')
        console.log(email)
        sendSignInLinkToEmail(auth, email, actionCodeSettings)
            .then(() => {
                // The link was successfully sent. Inform the user.
                console.log('successfully sent')
                // Save the email locally so you don't need to ask the user for it again
                // if they open the link on the same device.
                setSuccess(true)
                window.localStorage.setItem('emailForSignIn', email);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('errorMessage')
                console.log(errorMessage)
                // ...
            })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          window.location.pathname = '/login/success'
          router.push('/login/success')
        } else {
          // User is signed out
          console.log('not signed in')
        }
      })

  return (
    <View style={{backgroundColor:'red', width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
      <Modal
        transparent
        visible={success}
        animationType="fade"
        onRequestClose={() => {
            setSuccess(false);
            }}
            >
        <ResponsiveModal small={true} setModalVisible={setSuccess}>
          <Text style={[styles.sectionTitle, {marginTop:30, color:'green'}]}>E-Mail Successfully Sent:</Text>
          <Text style={{color: 'green'}}>Check your E-Mail for your login link.</Text>
        </ResponsiveModal>
      </Modal>

        <ImageBackground source={img} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor:'rgba(255, 255, 255, 0.28)', width: height, minWidth:350, maxWidth:450, height: '70%', minHeight:350, maxHeight:450, borderRadius:16, justifyContent:'center'}}>
            <BlurView intensity={40} onLayout={onLayout} style={{backgroundColor:'', width: height, minWidth:350, maxWidth:450, height: '100%', minHeight:350, maxHeight:450, borderRadius:16, justifyContent:'center'}}>
                <View style={{width:'55%', height:'100%', justifyContent:'center', alignSelf:'center', flexDirection:'column', flexWrap:'wrap', backgroundColor:''}}>
                    <View style={{width:'100%',  backgroundColor:'', justifyContent:'end', alignItems:'center'}}>
                        <Text style={{fontSize:25, fontFamily: 'Rubik', color:'white'}}>Login</Text>
                        <View style={{height:30}}/>
                    </View>
                    <View style={{ backgroundColor:''}}>
                        <View style={{width:'100%',}}>
                            <Text style={styles.text}>E-Mail:</Text>
                            <TextInput textContentType='emailAddress' value={email} onChangeText={setEmail} style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View>
                        {/* <View style={{width:'100%', backgroundColor:''}}>
                            <Text style={styles.text}>Password:</Text>
                            <TextInput secureTextEntry={true} textContentType='password' style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View> */}
                        <View style={{height:10}}></View>
                        <Pressable onPress={() => login()} style={{height:40}}>
                            <View style={[styles.neu, {cursor: 'pointer', backgroundColor:'#6ac1fc', borderRadius:90, height:40, width:'60%', alignSelf:'center', alignItems:'center', justifyContent:'center'}]}>
                                <Text style={[styles.text, {alignSelf:'center', marginTop:5}]}>Submit</Text>

                            </View>
                        </Pressable>

                        {error &&
                            <View style={{width: '100%', borderRadius:2, borderColor:'red', borderWidth:2, alignSelf:'center', marginTop:20}}>
                                <Text style={{margin:10, alignSelf:'center', color:'red', textAlign:'center'}}>Error: Entered Username Does Not Exist.</Text>
                            </View>
                        }
                    </View>
                    <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:''}}>
                        
                    </View>


                </View>
            </BlurView>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{fontSize:15, fontFamily: 'Rubik', color:'white', marginBottom:5},
  neu: {
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 5, // for Android
    // borderColor: 'white',
    // borderWidth: 30,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
})
