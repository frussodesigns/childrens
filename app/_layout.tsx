import { Stack, Slot } from "expo-router";
import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    Pressable,
    Dimensions
} from 'react-native'
import CustomMenu from "../components/customMenu";
import MobileMenu from "../components/MobileMenu";
import {useWindowDimensions} from 'react-native';

export default function Layout() {
  const {height, width} = useWindowDimensions();
  


  return (<>
  <View style={{flexDirection:'row', height:'100%', backgroundColor:''}}>
    
    {width < 800 ? null : 
    <View  style={[{width:'20%', maxWidth:'12.5em', zIndex:1}, styles.neu]}>
        <CustomMenu/>
    </View>
    }

    <View  style={{backgroundColor: '', flex: 1}}>
      <View style={{height:'100%', backgroundColor:'rgb(242,242,242)'}}>
        <Slot />
      </View>
    </View>

    
  </View>
    {width > 800 ? null : 
    <View style={{height:0}}>
    <View  style={[{width:'90%', height:90, backgroundColor:'#F9F9F9', bottom: 100, left: '5%', borderRadius:20, zIndex:1}, styles.neu]}>
        <MobileMenu/>
    </View>
    </View>
    }
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