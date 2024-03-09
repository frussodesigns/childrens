import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Stack, Slot } from "expo-router";
import { AppContextProvider } from "../AppContext";
import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    Pressable,
    Dimensions,
    Modal
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  Easing,
  useDerivedValue,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Link } from "expo-router"
import CustomMenu from "../components/customMenu";
import MobileMenu from "../components/MobileMenu";
import {useWindowDimensions} from 'react-native';
import {useState, useEffect} from "react"
import ReportsModal from "../components/ReportsModal";
import { useReactPath } from "../hooks/useReactPath";



export default function Layout() {
  const auth = getAuth()
  const user = auth.currentUser
  const {height, width} = useWindowDimensions();

  const [reportsModalVisible, setReportsModalVisible] = useState(false)
  
  const [isHovered, setIsHovered] = useState(false)
  const [menuWidth, setMenuWidth] = useState('20%')
  const [desktopMenu, setDesktopMenu] = useState(true)

  const startValue = 3.8; // The starting percent value
  const endValue = 20; // The ending percent value

  const animation = useSharedValue(startValue);
  const [animationState, setAnimation] = useState(100);

  let path = window.location.pathname
  
  useEffect(() => {
    if (path == '/login' || path == '/login/success') {
      setDesktopMenu(false)
    } else {
      setDesktopMenu(true)
    }
  }, [path])

  useEffect(() => {
    console.log(path)
  }, [path]);

  const interpolatedWidth = interpolate(
    animation.value, 
    [0, 1],
    [startValue, endValue],
    { extrapolateRight: Extrapolate.CLAMP }
  );

  const hoverOn = () => {
    animation.value = withTiming(1, { duration: 300, easing: Easing.ease });
  };

  const hoverOff = () => {
    animation.value = withTiming(0, { duration: 300, easing: Easing.ease });
  };
  

  useEffect(() => {
    if (isHovered) {
      hoverOn();
    } else {
      hoverOff();
    }
  }, [isHovered]);

  const derived = useDerivedValue(() => {
    setAnimation(animation.value)
  }, [animation]);

//   const reverseInterpolatedValue = animation.value.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0],
// });
  

  return (<>
  <View style={{flexDirection:'row', height:'100%', backgroundColor:''}}>
    
    {width < 800 || !desktopMenu ? null : <>
    <Animated.View  style={[{width: `${interpolatedWidth}%`, maxWidth:'12.5em', minWidth:'3.5em', zIndex:1}, styles.neu]}>
        <CustomMenu setIsHovered={setIsHovered} setReportsModalVisible={setReportsModalVisible} animationValue={animation.value} winWidth={width} winHeight={height} user={user} />
    </Animated.View>

    {/* <Link href="/kingap">
      <View style={{bottom:10, left:0, position:'fixed', zIndex:2, width:'14em', height: 65, backgroundColor: ''}}>
          <View style={[styles.neu, {backgroundColor: 'white', width: '90%', height: 65, borderRadius: 65, marginLeft: 10, marginRight: 10, marginBottom: 30}]}>
          <View style={[styles.secondShadow, {flexDirection: 'row', padding:0, margin:0, flex: 1, borderRadius: 65, justifyContent: 'flex-start'}]}>
              <View style={{backgroundColor:'rgb(242,242,242)', top: 8, left: 8, height: 50, width: 50, borderRadius: 65, }}></View>
              <View style={{alignSelf: 'center', marginLeft:15}}>
              <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Rubik', color:'black'}}>Account</Text>
              </View>
          </View>
          </View>
      </View>
    </Link> */}
    </>
    }

    <View  style={{backgroundColor: '', flex: 1}}>
      <View style={{height:'100%', backgroundColor:'rgb(242,242,242)'}}>
        <AppContextProvider>
          <Slot />
        </AppContextProvider>
      </View>
    </View>

    
  </View>

    {/* {width > 800 || !user ? null :  */}
    {width > 800 ? null : 
    <View style={{height:0, bottom:90}}>
      <View  style={[{width:'90%', height:90, backgroundColor:'#F9F9F9', bottom: 10, left: '5%', borderRadius:20, zIndex:1, position:'fixed'}, styles.neu]}>
          <MobileMenu/>
      </View>
    </View>
    }

      <Modal
        transparent
        visible={reportsModalVisible}
        animationType="fade"
        onRequestClose={() => {
            setReportsModalVisible(false);
            }}
            >
            <ReportsModal setModalVisible={setReportsModalVisible} />
        </Modal>

    </>
  )
}

const styles = StyleSheet.create({
  page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '',
      height: '100%',
      width:'100%',
      // margin: 50,
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
    
  },
  
})