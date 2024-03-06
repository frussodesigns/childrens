import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { StyleSheet, View, Text, ImageBackground, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react'
import NeuView from '../../components/NeuView';
import { useRouter, Link, Redirect } from "expo-router";

export default function success() {
    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()
    const [fontsLoaded] = useFonts({
        'Rubik': require('../../assets/fonts/Rubik-Regular.ttf'),
      });

    const [height, setHeight] = useState()
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')

    const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
    console.log(height)
    }

    const img = "../../assets/image.jpg"

    // if (!auth.currentUser) {
    //   window.location.pathname = '/login'
    //   return <Redirect href="/login" />
    // }

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        // email = window.prompt('Please provide your email for confirmation');
        console.log('email missing')
        router.push('/login')
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          console.log('result')
          console.log(result)
          console.log(result.user)

        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log('error')
          console.log(error)
          setError(true)
        });
    }

    useEffect(() => {
      console.log('auth')
      console.log(auth)
      console.log(user)
    }, [user])

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user)
      } else {
        // User is signed out
        // window.location.pathname = '/login'
        // router.push('/login')
      }
    })
    

  return (
    <View style={{backgroundColor:'red', width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
        <ImageBackground source={require("../../assets/image.jpg")} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View style={{backgroundColor:'rgba(255, 255, 255, 0.28)', width: height, minWidth:350, maxWidth:450, height: '70%', minHeight:350, maxHeight:450, borderRadius:16, justifyContent:'center'}}>
            <BlurView intensity={40} onLayout={onLayout} style={{backgroundColor:'', width: height, minWidth:350, maxWidth:450, height: '100%', minHeight:350, maxHeight:450, borderRadius:16, justifyContent:'center'}}>
                <View style={{width:'90%', height:'100%', justifyContent:'center', alignSelf:'center', flexDirection:'column', flexWrap:'wrap', backgroundColor:''}}>
                    <View style={{width:'100%',  backgroundColor:'', justifyContent:'end', alignItems:'center'}}>
                        {!error && <Text style={{fontSize:25, fontFamily: 'Rubik', color:'white', textAlign:'center'}}>Welcome</Text>}
                        {error && <Text style={{fontSize:25, fontFamily: 'Rubik', color:'white', textAlign:'center'}}>An Error Occured</Text>}
                        <View style={{height:30}}/>
                    </View>
                    {!error &&
                    <View style={{ backgroundColor:''}}>
                        {/* <View style={{width:'100%',}}>
                            <Text style={styles.text}>E-Mail:</Text>
                            <TextInput textContentType='emailAddress' value={email} onChangeText={setEmail} style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View> */}
                        {/* <View style={{width:'100%', backgroundColor:''}}>
                            <Text style={styles.text}>Password:</Text>
                            <TextInput secureTextEntry={true} textContentType='password' style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View> */}
                        <View style={{height:10}}></View>
                        
                        {/* Options */}
                        <View style={{flexDirection:'row', flexWrap:'wrap', gap: 20, alignItems:'center', justifyContent:'center', backgroundColor:''}}>
                          
                          <Link href='/documents'>
                          <NeuView onPress={''} id={'documents'} cursor={'pointer'} shadowColor={'rgba(255, 255, 255, 0.28)'} style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            <View>
                              <Text style={{fontSize:20, fontFamily: 'Rubik', color:'white', textAlign:'center', flex: 1, flexWrap:'wrap'}}>Document Database</Text>
                            </View>
                          </NeuView>
                          </Link>
                         
                          <NeuView cursor={'pointer'} shadowColor={'rgba(255, 255, 255, 0.28)'} style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:'80%', backgroundColor:'', alignSelf:'center'}}>
                              <Text style={{fontSize:20, fontFamily: 'Rubik', color:'white', textAlign:'center', flex: 1, flexWrap:'wrap'}}>Past Reports</Text>
                            </View>
                          </NeuView>
                         
                          <Link href='/homefinding'>
                          <NeuView cursor={'pointer'} shadowColor={'rgba(255, 255, 255, 0.28)'} style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:'80%', backgroundColor:'', alignSelf:'center'}}>
                              <Text style={{fontSize:20, fontFamily: 'Rubik', color:'white', textAlign:'center', flex: 1, flexWrap:'wrap'}}>Home Finding</Text>
                            </View>
                          </NeuView>
                          </Link>
                         
                          <NeuView cursor={'pointer'} shadowColor={'rgba(255, 255, 255, 0.28)'} style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:'80%', backgroundColor:'', alignSelf:'center'}}>
                              <Text style={{fontSize:20, fontFamily: 'Rubik', color:'white', textAlign:'center', flex: 1, flexWrap:'wrap'}}>KinGap Database</Text>
                            </View>
                          </NeuView>
                         
                          <NeuView cursor={'pointer'} shadowColor={'rgba(255, 255, 255, 0.28)'} style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20, alignSelf:'center', alignItems:'center', justifyContent:'center'}}>
                            <View style={{width:'90%', backgroundColor:'', alignSelf:'center'}}>
                              <Text style={{fontSize:20, fontFamily: 'Rubik', color:'white', textAlign:'center', flex: 1, flexWrap:'wrap'}}>My Settings</Text>
                            </View>
                          </NeuView>
                          

                          <NeuView shadowColor={'rgba(255, 255, 255, 0.28)'}  style={{width: 120, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.28)', borderRadius: 20}}></NeuView>

                        </View>



                        {error &&
                            <View style={{width: '100%', borderRadius:2, borderColor:'red', borderWidth:2, alignSelf:'center', marginTop:20}}>
                                <Text style={{margin:10, alignSelf:'center', color:'red', textAlign:'center'}}>Error: Entered Username Does Not Exist.</Text>
                            </View>
                        }
                    </View>
                  }
                  {error&&
                    <View style={{ alignItems:'center', justifyContent:'center', backgroundColor:''}}>
                        
                        <Pressable onPress={() => router.push('login')} style={{height:40, width: '80%'}}>
                            <View style={[styles.neu, {cursor: 'pointer', backgroundColor:'#6ac1fc', borderRadius:90, height:40, width:'60%', alignSelf:'center', alignItems:'center', justifyContent:'center'}]}>
                                <Text style={[styles.text, {alignSelf:'center', marginTop:5}]}>Try Again</Text>

                            </View>
                        </Pressable>
                    </View>
                  }

                </View>
            </BlurView>
            </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  text:{fontSize:15, fontFamily: 'Rubik', color:'black', marginBottom:5},
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
})
