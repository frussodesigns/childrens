    import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
    import { getAuth, signOut } from "firebase/auth";
    import { Link } from "expo-router"
    import React, {useState, useEffect} from 'react'
    import { useFonts } from 'expo-font';
    import NeuView from './NeuView';
    import { LoadFonts } from '../presets';
    import Animated, {
        useAnimatedStyle,
        withTiming,
        useSharedValue,
        Easing,
        useDerivedValue,
        interpolate,
        Extrapolate
    } from 'react-native-reanimated';
    import DatabaseIcon from '../assets/icons/database';
    import HandIcon from '../assets/icons/hand';
    import HeartIcon from '../assets/icons/hearticon';
    import ReportIcon from '../assets/icons/report';
    import { center } from '@shopify/react-native-skia';
    import { BlurView } from 'expo-blur';

    //TODO:
    //Account pg needs to lock animation at full
    //Create scroll view and controls for acct modal

const CustomMenu = ({setIsHovered, setReportsModalVisible, animationValue, winWidth, winHeight, user}) => {
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


    const startValue = 0; // The starting percent value
    const endValue = 100; // The ending percent value
    const accountAnimation = useSharedValue(startValue);
    const [animationState, setAnimation] = useState(100);

    const derived = useDerivedValue(() => {
        setAnimation(accountAnimation.value)
      }, [accountAnimation]);

    const activateAccountPage = () => {
        accountAnimation.value = withTiming(1, { duration: 300, easing: Easing.ease });
        console.log('act acct mod')
    }
   
    const closeAcctMenu = () => {
        accountAnimation.value = withTiming(0, { duration: 300, easing: Easing.ease });
        console.log('act acct mod')
    }

    const closeAccountPage = () => {
        accountAnimation.value = withTiming(0, { duration: 300, easing: Easing.ease });
    }



  return (
    <Pressable style={{height:'100%', backgroundColor:''}} onHoverIn={handlePressableHoverIn} onHoverOut={handlePressableHoverOut}>
    <View style={{flexDirection:'column', justifyContent:'center', backgroundColor:'#F9F9F9', height: '100%'}}>
        
        {/* <View style={{height: 20*(-animationValue+1)}} ></View> */}
        <View style={{width: '100%', height: 60, backgroundColor: '', alignSelf:'center', justifyContent: 'center', alignItems:'center', position: 'relative'}} >
            {/* <Image source={require('../assets/-logo.png')} style={{flex: 1, width: null, height: null, resizeMode: 'contain'}} /> */}
            
            
            <View style={{flexDirection: 'column'}}>
                <Image source={require('../assets/logo-top.png')} style={{opacity: -animationValue+1, width: 100, height: 100, resizeMode: 'contain', alignSelf:'center'}} />
                {/* {animationValue > 0 && (
                    <Image source={require('../assets/logo-bottom.png')} style={{width: 100, height: 100, resizeMode: 'contain', alignSelf:'center'}} />
                )} */}
            </View>

            <View style={{flex:1, backgroundColor: 'red', position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                {/* <Image source={require('../assets/logo-top.png')} style={{opacity: -animationValue+1*.6, width: 100, height: 100, resizeMode: 'contain', alignSelf:'center', top: -50}} /> */}
                <Image source={require('../assets/logo-bottom.png')} style={{opacity: animationValue , width: 100, height: 100, resizeMode: 'contain', alignSelf:'center', top: -47}} />
            </View>
            
            {/* *******Second Logo********* */}
            {/* <Image source={require('../assets/logo-top.png')} style={{width: 100, height: 100, resizeMode: 'contain', alignSelf:'center'}} /> */}
            {/* <Image source={require('../assets/logo-top.png')} style={{flex: 1, width: 100, height: null, resizeMode: 'contain', alignSelf:'center'}} /> */}
            {/* {animationValue > 0 && (
            <Image source={require('../assets/logo-bottom.png')} style={{opacity: animationValue, flex: 1, width: null, height: animationValue * 97, resizeMode: 'contain', marginTop: 12}} />
            )} */}
        </View>
        {/* {animationValue > 0 && (
            <View style={{height: 20}} ></View>
        )} */}
        {/* LINE: */}
        <View style={{height: 0, width:'90%', alignSelf: 'center', borderColor:'lightgrey', borderBottomWidth:.2}} />
        <View style={{height: 10}} ></View>
            {/* <Link href="/">
                <NeuView style={{width:'90%', height:'2.5em', borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>{animationValue}</Text>
                </NeuView>
            </Link> */}

            {/* ::Vital Documents Button:: */}
            <View style={{height: '3em'}}>
                <NeuView setIsHovered={setIsHovered} style={{width:'90%', height:20, borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', alignContent:'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Link href="/documents" style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                            <DatabaseIcon style={{opacity: -animationValue+1*.6, position: 'absolute'}} />
                            <Text style={{opacity: animationValue*.6, fontFamily: 'Rubik', position: 'absolute', alignSelf: 'center'}}>Vital Records</Text>
                        </View>
                    </Link>
                </NeuView>
            </View>
            {/* ::Homefinding Button:: */}
            <View style={{height: '3em'}}>
                <NeuView setIsHovered={setIsHovered} style={{width:'90%', height:20, borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', alignContent:'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Link href="/homefinding" style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                            <HandIcon style={{opacity: -animationValue+1*.6, position: 'absolute'}} />
                            <Text style={{opacity: animationValue*.6, fontFamily: 'Rubik', position: 'absolute', alignSelf: 'center'}}>Homefinding</Text>
                        </View>
                    </Link>
                </NeuView>
            </View>
            <View style={{height: '3em'}}>
                <NeuView setIsHovered={setIsHovered} style={{width:'90%', height:20, borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', alignContent:'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Link href="/" style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                            <HeartIcon style={{opacity: -animationValue+1*.6, position: 'absolute'}} />
                            <Text style={{opacity: animationValue*.6, fontFamily: 'Rubik', position: 'absolute', alignSelf: 'center'}}>Kingap</Text>
                        </View>
                    </Link>
                </NeuView>
            </View>
            <View style={{height: '3em'}}>
                <NeuView setIsHovered={setIsHovered} style={{width:'90%', height:20, borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', alignContent:'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Link href="/" style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                            <ReportIcon style={{opacity: -animationValue+1*.6, position: 'absolute'}} />
                            <Text style={{opacity: animationValue*.6, fontFamily: 'Rubik', position: 'absolute', alignSelf: 'center'}}>Reports</Text>
                        </View>
                    </Link>
                </NeuView>
            </View>
            {/* <View style={{height: '3em'}}>
                <NeuView setIsHovered={setIsHovered} style={{width:'90%', height:20, borderRadius: 6, flex: 1, justifyContent: 'center', alignSelf: 'center', alignContent:'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                    <Link href="/" style={{justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                        <View style={{position:'relative', height:'100%', width: '100%', alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
                            <DatabaseIcon style={{opacity: -animationValue+1*.6, position: 'absolute'}} />
                            <Text style={{opacity: animationValue*.6, fontFamily: 'Rubik', position: 'absolute', alignSelf: 'center'}}>Admin Area</Text>
                        </View>
                    </Link>
                </NeuView>
            </View> */}
            {/* <Link href="/">
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
            </NeuView> */}
            {/* {auth && <NeuView cursor={'pointer'} onPress={()=>signUserOut()} style={{width:'90%', height:'2.5em', borderRadius: 6, justifyContent: 'center', alignSelf: 'center', backgroundColor: 'white',  marginLeft: 10, marginRight: 10, marginTop: 10, }}>
                <Text style={{textAlign: 'center', fontFamily: 'Rubik', color:'grey'}}>Sign Out</Text>
            </NeuView>} */}
            <View style={{height: 50}} ></View>

            {/* <View>{isHovered ? <Text style={{textAlign:'center', color: 'red'}}>//hover detected!</Text> : null}</View> */}
            {/* gap: */}
            <View style={{flex:1}}></View>

            {/* ::SIGNOUT BUTTON:: */}
            <Link href="/kingap">
                <View style={{bottom: -212+(animationValue*100), flex:1, justifyContent:'center', alignContent:'center', width:'90%', height: 65, opacity: animationValue}}>
                    <View style={[styles.neu, {backgroundColor: 'white', width: animationValue*140 + 45, height: animationValue*10 + 45, borderRadius: 65, marginLeft: 5, marginRight: 10, marginBottom: 0, position: 'absolute'}]}>
                    <View style={[styles.secondShadow, {flexDirection: 'row', padding:0, margin:0, flex: 1, borderRadius: 65, justifyContent: 'flex-start'}]}>
                        <View style={{backgroundColor:'rgb(242,242,242)', top: 5*animationValue, left: 5*animationValue, height: 45, width: 45, borderRadius: 65, }}></View>
                        <View style={{alignSelf: 'center', marginLeft:15}}>
                            {animationValue > 0 && (
                            <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Rubik', color:'black', opacity: animationValue}}>Sign Out</Text>
                            )}
                        </View>
                    </View>
                    </View>
                </View>
            </Link>
            {/* ::ACCOUNT BUTTON:: */}
            <View style={{flex:1, justifyContent:'center', alignContent:'center', width:'90%', height: 65, backgroundColor: '', bottom: -20, left: -5}}>
                            
                <TouchableOpacity onPress={activateAccountPage}>
                    <BlurView intensity={40*accountAnimation.value} style={
                        {backgroundColor: 'white', 
                        width: (winWidth*accountAnimation.value), 
                        height: accountAnimation.value*(winHeight+100), 
                        top: -accountAnimation.value*(winHeight), marginLeft: 5, marginRight: 10, marginBottom: 0, position: 'absolute'}
                    }
                        >
                        <View style={[styles.neu, {backgroundColor: 'white', 
                            width: (animationValue*140 + 45)+(accountAnimation.value*winWidth)-(222*accountAnimation.value), 
                            height: (animationValue*10 + 45) + (accountAnimation.value * (winHeight - 111)), 
                            top: 100*accountAnimation.value,
                            borderRadius: 65-(accountAnimation.value*65*3/4), marginLeft: 5, marginRight: 10, marginBottom: 0, position: 'absolute'}]
                            }>
                            
                            <View style={[styles.secondShadow, {flexDirection: 'row', padding:0, margin:0, flex: 1, borderRadius: 65, justifyContent: 'flex-start', backgroundColor: ''}]}>
                                
                                <TouchableOpacity onPress={closeAcctMenu} style={{backgroundColor:'rgb(242,242,242)', top: 5*animationValue, left: 5*animationValue, height: 45, width: 45, borderRadius: 65, alignItems: 'center', justifyContent: 'center'}}>
                                    {accountAnimation.value > 0 && (
                                    <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Rubik', color:'black', opacity: animationValue}}>X</Text>
                                    )}
                                </TouchableOpacity>

                                <View style={{alignSelf: 'center', marginLeft:15}}>

                                    {animationValue > 0 && (
                                    <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Rubik', color:'black', opacity: animationValue}}>Account</Text>
                                    )}
                                    {accountAnimation.value > 0 && (
                                    <Text style={{alignSelf: 'left', textAlign: 'center', fontFamily: 'Rubik', color:'black', opacity: animationValue}}>{'email: ' + user.email}</Text>
                                    )}

                                </View>
                            </View>
                        </View>
                    </BlurView>
                </TouchableOpacity>
            </View>
            {/* </Link> */}
            
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