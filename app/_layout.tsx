import { Stack, Slot } from "expo-router";
import { 
    StyleSheet, 
    Text, 
    View,
    Button,
    Pressable,
} from 'react-native'
import CustomMenu from "../components/customMenu";

export default function Layout() {
  return (
  <View style={{flexDirection:'row', height:'100%', backgroundColor:''}}>
    
    <View  style={[{width:'20%', maxWidth:'12.5em', zIndex:1 }, styles.neu]}>
        <CustomMenu/>
    </View>

    <View  style={{backgroundColor: '', flex: 1}}>
      <View style={{height:'100%', backgroundColor:'rgb(242,242,242)'}}>
        <Slot />
      </View>
    </View>
    
  </View>
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