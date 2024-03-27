import { View, Text, useWindowDimensions } from 'react-native'
import React, {useState, useEffect, Children} from 'react'
import { MotiView, MotiText } from 'moti'
import { MotiPressable } from 'moti/interactions'

export default function Loader ({loaded, setLoaded}){
    const {height, width} = useWindowDimensions()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
        setLoaded(true);
        console.log(true)
        }, 3000);

        return () => clearTimeout(timeout);
    }, []); // Empty dependency array to ensure effect runs only once  


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
                    borderRadius:size/2,
                    opacity:1
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
    
    const CompleteCounter = () => {
        return (
          <MotiText
            from={{opacity:1}}
            animate={{opacity: loaded ? 0 : 1}}
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
            {100}
          </MotiText>
        );
      };
    
    const AnimatedCounter = () => {
        const [count, setCount] = useState(0);
        const [reachedMax, setReachedMax] = useState(false);

        useEffect(() => {
            let interval;
    
            if (!reachedMax) {
                interval = setInterval(() => {
                    setCount(prevCount => {
                        if (prevCount < 100) {
                            return prevCount + 1;
                        } else {
                            clearInterval(interval);
                            return prevCount;
                        }
                    });
                }, 20);
            }
    
            // Update reachedMax flag when count reaches 100
            if (count === 100) {
                setReachedMax(true);
            }
    
            // Clean up interval on component unmount
            return () => clearInterval(interval);
        }, [count, reachedMax]); // Re-run effect when count or reachedMax changes
            
        return (
          <MotiText
            from={{opacity:1}}
            animate={{opacity: loaded ? 0 : 1}}
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
            {loaded ? '100' : count}
          </MotiText>
        );
      };
    


  return (
    <View
        pointerEvents='none'
        style={{
            position: 'absolute',
            zIndex: 2,
            width: width,
            height: height,
            alignItems:'center',
            justifyContent:'center',
            // backgroundColor:'red'
        }}
    >
        <Background height={height} loaded={loaded} />
            <AnimatedCounter />

        <View style={{
            position: 'absolute',
            zIndex: 2,
            
        }}>
            <LoadingIndicator size={50} loaded={loaded} />
        </View>
        {/* </BackgroundA> */}
    </View>
  )
}

// export default Loader