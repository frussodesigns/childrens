import { StyleSheet, View, Text, ImageBackground, TextInput, Button, Pressable } from 'react-native'
import { BlurView } from 'expo-blur';
import { useFonts } from 'expo-font';
import React, { useState } from 'react'
import NeuView from '../../components/NeuView';

export default function index() {
    const [fontsLoaded] = useFonts({
        'Rubik': require('../../assets/fonts/Rubik-Regular.ttf'),
      });

    const [height, setHeight] = useState()
    const [error, setError] = useState(false)


    const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
    console.log(height)
    }

    const img = "../../assets/jade-stephens.jpg"
  return (
    <View style={{backgroundColor:'red', width: '100%', height: '100%', justifyContent:'center', alignItems:'center'}}>
        <ImageBackground source={img} style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <BlurView intensity={40} onLayout={onLayout} style={{backgroundColor:'', width: height, minWidth:350, maxWidth:450, height: '70%', minHeight:350, maxHeight:450, borderRadius:16, justifyContent:'center'}}>
                <View style={{width:'45%', height:'100%', alignSelf:'center', flexDirection:'column', flexWrap:'wrap', backgroundColor:''}}>
                    <View style={{width:'100%', flex:1, backgroundColor:'', justifyContent:'end', alignItems:'center'}}>
                        <Text style={{fontSize:25, fontFamily: 'Rubik', color:'black'}}>Login</Text>
                        <View style={{height:30}}/>
                    </View>
                    <View style={{flex:1, backgroundColor:''}}>
                        <View style={{width:'100%',}}>
                            <Text style={styles.text}>E-Mail:</Text>
                            <TextInput textContentType='emailAddress' style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View>
                        <View style={{width:'100%', backgroundColor:''}}>
                            <Text style={styles.text}>Password:</Text>
                            <TextInput secureTextEntry={true} textContentType='password' style={{backgroundColor:'#F9F9F9', paddingLeft: 10, height:'2em', borderRadius: 5, width:'100%',}} />
                            <View style={{height:20}}/>
                        </View>
                        <Pressable style={{height:40,}}>
                            <View style={[styles.neu, {backgroundColor:'#6ac1fc', borderRadius:90, height:40, width:'60%', alignSelf:'center', alignItems:'center', justifyContent:'center'}]}>
                                <Text style={[styles.text, {alignSelf:'center', marginTop:5}]}>Log In</Text>

                            </View>
                        </Pressable>

                        {error &&
                            <View style={{width: '100%', borderRadius:2, borderColor:'red', borderWidth:2, alignSelf:'center', marginTop:20}}>
                                <Text style={{margin:10, alignSelf:'center', color:'red', textAlign:'center'}}>Error: Entered Username Does Not Exist.</Text>
                            </View>
                        }
                    </View>
                    <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:''}}>
                        
                    </View>


                </View>
            </BlurView>
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
