import { View, Text, useWindowDimensions } from 'react-native'
import React, {useState, useEffect, Children} from 'react'
import { MotiView, MotiText } from 'moti'
import { MotiPressable } from 'moti/interactions'

const Background = ({height, loaded}) => {
    return(
            <MotiView
                from={{
                    height: height
                }}
                animate={{
                    height: !loaded ? height : 0
                }}
                transition={{
                    type:'timing',
                    duration:2000,
                }}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: '100%',
                    backgroundColor: 'black',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            />
    )
}

const LoadingIndicator = ({size, loaded}) => {
    console.log('in')
    return(
        <MotiView
            from={{
                width:size,
                height:size,
                borderRadius:size/2
            }}
            animate={{
                width:size + 20,
                height:size + 20,
                borderRadius: (size+20) / 2,
                opacity: !loaded ? 1 : 0
            }}
            transition={{
                type:'timing',
                duration:1000,
                loop: true,

                opacity: {
                    loop: false
                }
            }}
            style={{
                zIndex: 2,
                width: size,
                height: size,
                borderRadius: size/2,
                borderWidth: size/10,
                borderColor: '#fff',
                shadowColor: '#fff',
                shadowOffset: {width: 0, height: 0},
                shadowOpacity: 1,
                shadowRadius: 10
            }}
        />

    )
}

const AnimatedCounter = ({loaded}) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < 100) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return prevCount;
        });
      }, 20); // Increment every 20 milliseconds for smoother animation
  
      return () => clearInterval(interval);
    }, []); // Run effect only once on component mount
  
    return (
      <MotiText
        from={{opacity:1}}
        animate={{opacity: !loaded ? 1 : 0}}
        transition={{type:'timing', duration:1000}}
        style={{ 
            position: 'absolute',
            zIndex:2,
            marginTop: 120,
            fontSize: 24,
            fontWeight: 'bold',
            color:'white',
            alignSelf:'center'
        }}
      >
        {count}
      </MotiText>
    );
  };

const Loader = () => {
    const {height, width} = useWindowDimensions()
    const [animateStart, setAnimate] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
        setAnimate(true);
        console.log(true)
        }, 3000);

        return () => clearTimeout(timeout);
    }, []); // Empty dependency array to ensure effect runs only once  

  return (
    <View
        style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center',
            backgroundColor:'red'
        }}
    >
        <Background height={height} loaded={animateStart} />
        <AnimatedCounter loaded={animateStart} />
        <View style={{
            position: 'absolute',
            zIndex: 2,
            
        }}>
            <LoadingIndicator size={50} loaded={animateStart} />
        </View>
        {/* </BackgroundA> */}
    </View>
  )
}

export default Loader