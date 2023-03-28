import React, {Component, useEffect, useState, useRef} from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'

const MyTable = ({obj, columns, width, height, sc, sr, handlePress}) => {
  // const [stickyCols, setStickyCols] = useState(4)
  const [stickyColsWidth, setStickyColsWidth] = useState()
  const [leftIsScrolling, setLeftScrolling] = useState(false)
  const [rightIsScrolling, setRightScrolling] = useState(false)

  const [currentIndex, setCurrentIndex] = useState(null);

  const prefs = {
    stickyCols: 4,
    headingHeight: '28px',
    cellHeight: 45,
    cellWidth: 150,
    stickyRowWidth: function () {
      return this.cellWidth*this.stickyCols;
    },
  }

  const scrollView1Ref = useRef(null);
  const scrollView2Ref = useRef(null);

  const handleScrollView1Scroll = (event) => {
    // const offsetY = event.nativeEvent.contentOffset.y;
    scrollView2Ref.current.scrollTo({ y: event.nativeEvent.contentOffset.y, animated: false });
  };

  const handleScrollView2Scroll = (event) => {
    // const offsetY = event.nativeEvent.contentOffset.y;
    scrollView1Ref.current.scrollTo({ y: event.nativeEvent.contentOffset.y, animated: false });
  };

  useEffect(() => {
    console.log(currentIndex)
  
    return () => {
      
    }
  }, [currentIndex])
  


    useEffect(() => {
        console.log(obj)
        
      }, [])

      const extractData = (index, item) => {
        const array = Object.keys(item)
        const property = array[index]
        return item[property]
        
      }


  return (
    <View style={{borderWidth: 0, borderColor: "black", borderRadius: 0, padding: 0, backgroundColor: '#F9F9F9', width: width, height: height, alignSelf: 'center', flexDirection: 'row'}}>
    {/* <ScrollView showsVerticalScrollIndicator={false} style={{height: height, width: width}}> */}
    <ScrollView horizontal={true} showsVerticalScrollIndicator={false} style={{minWidth: prefs.stickyRowWidth(), marginRight:-7, backgroundColor:''}}>
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection: 'row', margin: 0, marginBottom:0, backgroundColor:''}}>
          
                      {/* {Object.keys(obj[0]).slice(0, stickyCols).map((item)=> */}
                      {columns.slice(0, prefs.stickyCols).map((item)=>
                          
                          <View style={{borderBottomWidth: .2, borderColor: "grey", padding: 0, margin: '-.05em', height: prefs.headingHeight, justifyContent: 'center', width: prefs.cellWidth, marginBottom:.5}}>
                              <Text style={{textAlign: 'center'}}>{item}</Text>
                          </View>
                  )}
          
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
          ref={scrollView1Ref}
          onScroll={handleScrollView1Scroll}
          scrollEventThrottle={3} // optional, for smoother scrolling

        >
        <View style={{flexDirection: 'row', margin: 0, marginTop:0, backgroundColor:''}}>
            {Object.keys(obj[0]).slice(0, prefs.stickyCols).map((column, index)=>
            
            
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {obj.map((item)=>
                      <Pressable
                      key={item.id}
                      onPress={() => handlePress(item.id)}
                      onHoverIn={() => setCurrentIndex(item.id)}
                      onHoverOut={() => setCurrentIndex(null)}
                      >
                        <View style={[{borderBottomWidth: .2, borderColor: "#E0E0E0", padding: 0, margin: '-.05em', height: prefs.cellHeight, justifyContent: 'center', width: prefs.cellWidth, marginTop: 1, }, currentIndex === item.id && {backgroundColor:'#F3F6F9'}]}>
                            <Text style={{textAlign: 'center'}}>{extractData(index, item)}</Text>
                        </View>
                      </Pressable>
                )}
                </View>
            )}
        </View>
        </ScrollView>
      </View>
    </ScrollView>
    <ScrollView horizontal={true} showsVerticalScrollIndicator={false} style={{}}>
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection: 'row', margin: 0, marginBottom:0, backgroundColor:''}}>
          
                      {columns.slice(prefs.stickyCols, columns.length).map((item)=>
                          <View style={{borderBottomWidth: .2, borderColor: "grey", padding: 0, margin: '-.05em', height: prefs.headingHeight, justifyContent: 'center', width: prefs.cellWidth, marginBottom:.5}}>
                              <Text style={{textAlign: 'center'}}>{item}</Text>
                          </View>
                  )}
          
        </View>
        <ScrollView showsVerticalScrollIndicator={false}
        ref={scrollView2Ref}
        onScroll={handleScrollView2Scroll}
        scrollEventThrottle={3} // optional, for smoother scrolling
        >
        <View style={{flexDirection: 'row', margin: 0, marginTop:0, backgroundColor:''}}>
            {Object.keys(obj[0]).slice(prefs.stickyCols, Object.keys(obj[0]).length).map((column, index)=>
            
            
                <View style={{flex: 1, flexDirection: 'column'}}>
                    {obj.map((item)=>
                      <Pressable
                        key={item.id}
                        onPress={() => handlePress(item.id)}
                        onHoverIn={() => setCurrentIndex(item.id)}
                        onHoverOut={() => setCurrentIndex(null)}
                        >
                        <View style={[{borderBottomWidth: .2, borderColor: "#E0E0E0", padding: 0, margin: '-.05em', height: prefs.cellHeight, justifyContent: 'center', width: prefs.cellWidth, marginTop: 1, }, currentIndex === item.id && {backgroundColor:'#F3F6F9'}]}>
                            {/* <Text style={{textAlign: 'center'}}>{extractData(index+prefs.stickyCols, item)}</Text> */}
                            {/* <Text style={{textAlign: 'center'}}>{Object.prototype.toString.call(extractData(index+prefs.stickyCols, item))}</Text> */}
                            {Object.prototype.toString.call(extractData(index+prefs.stickyCols, item)) == '[object String]' && 
                            <Text style={{textAlign: 'center'}}>{extractData(index+prefs.stickyCols, item)}</Text>
                            }
                            {Object.prototype.toString.call(extractData(index+prefs.stickyCols, item)) == '[object Boolean]'
                            && extractData(index+prefs.stickyCols, item) == true &&
                            <Text style={{textAlign: 'center'}}>{'✔️'}</Text>
                            }
                            {Object.prototype.toString.call(extractData(index+prefs.stickyCols, item)) == '[object Boolean]'
                            && extractData(index+prefs.stickyCols, item) == false &&
                            <Text style={{textAlign: 'center'}}>{'❌'}</Text>
                            }
                            
                            {/* <Text>{currentIndex === item.id ? 'Hovered!' : 'not'}</Text> */}
                        </View>
                      </Pressable>
                )}
                </View>
            )}
        </View>
        </ScrollView>
      </View>
    </ScrollView>
    {/* </ScrollView> */}
    </View>
  )
}

export default MyTable