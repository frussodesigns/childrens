import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import { Link } from "expo-router"
import React, {useState, useEffect} from 'react'

const CustomMenu = () => {
    const [isHovered, setIsHovered] = useState(false)
    const [width, setWidth] = useState('4em')

const handlePressableHoverIn = () => {
    setIsHovered(true);
    console.log('hover')
    }

const handlePressableHoverOut = () => {
    setIsHovered(false);
    console.log('hover-out')
    }

useEffect(() => {
  setWidth(isHovered ? '4em' : '11em')
  console.log(width)
}, [isHovered])


  return (
    <Pressable style={{height:'100%', backgroundColor:'red'}} onHoverIn={handlePressableHoverIn} onHoverOut={handlePressableHoverOut}>
    <View style={{flexDirection:'column', justifyContent:'center', backgroundColor:'#F9F9F9', height: '100%'}}>
        <View>{isHovered ? <Text>The Pressable is being hovered over!</Text> : null}</View>
        <View style={{height: 20}} ></View>
        <View style={{width: width, height: 80, backgroundColor: '', alignSelf:'center'}} >
        <Image source={require('../assets/-logo.png')} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}} />
        </View>
        <View style={{height: 20}} ></View>
        <View style={{height: 0, width:'90%', alignSelf: 'center', borderColor:'lightgrey', borderBottomWidth:.2}} />
        <View style={{height: 10}} ></View>
            <Link href="/">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center'}}>Home</Text>
                </View>
                </View>
            </Link>
            <Link href="/documents">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center'}}>Document Tracking</Text>
                </View>
                </View>
            </Link>
            <Link href="/adoption">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center'}}>Adoption</Text>
                    </View>
                </View>
            </Link>
            <Link href="/kingap">
                <View style={[styles.neu, {flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white', width: '90%', height: '2.5em', borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 10, }]}>
                    <View style={[styles.secondShadow, {padding:0, margin:0, flex: 1, borderRadius: 6, justifyContent: 'center',}]}>
                    <Text style={{textAlign: 'center'}}>KinGap</Text>
                    </View>
                </View>
            </Link>
            {/* gap: */}
            <View style={{flex:1}}></View>
            <Link href="/kingap">
                <View style={{flex:1, justifyContent:'center', alignContent:'center', width:'100%', height: 65}}>
                    <View style={[styles.neu, {backgroundColor: 'white', width: '90%', height: 65, borderRadius: 65, marginLeft: 10, marginRight: 10, marginBottom: 30}]}>
                    <View style={[styles.secondShadow, {flexDirection: 'row', padding:0, margin:0, flex: 1, borderRadius: 65, justifyContent: 'flex-start'}]}>
                        <View style={{backgroundColor:'rgb(242,242,242)', top: 8, left: 8, height: 50, width: 50, borderRadius: 65, }}></View>
                        <View style={{alignSelf: 'center', marginLeft:15}}>
                        <Text style={{alignSelf: 'center', textAlign: 'center'}}>Account</Text>
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