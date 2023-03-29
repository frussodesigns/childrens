import React, { useEffect, useState, useRef } from 'react';
import {
  Dimensions, SafeAreaView,
  ScrollView,
  StatusBar, StyleSheet, useColorScheme, Animated,
  LayoutAnimation,
  View,
  Text
} from 'react-native';
import { LineChart, ProgressChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { LineGraph } from 'react-native-graph';

interface GraphPoint {
  value: number
  date: Date
}


function generateSinusGraphData(length: number): GraphPoint[] {
  return Array<number>(length)
    .fill(0)
    .map((_, index) => ({
      date: new Date(index),
      value: Math.sin(index),
    }))
}

const MyChart = (props) => {

  const [points, setPoints] = useState(null)

  useEffect(() => {
    const SMALL_POINTS = generateSinusGraphData(9)
    setPoints(SMALL_POINTS)
  // console.log(points)
  
    return () => {
      
    }
  }, [])

  useEffect(() => {
    // console.log(data)
  
    return () => {
      
    }
  }, [])
  
  const screenWidth = Dimensions.get("window").width;


  return (


    <View style={{width:'100%', height:'100%', flex: 1, backgroundColor:'', justifyContent:'center', alignContent:'center'}}>

      <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [
                  120,
                  210,
                  240,
                  288,
                  340,
                  450
                ]
              }
            ]
          }}
          width={props.width} // from react-native
          height={280}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            decimalPlaces: 2, // optional, defaults to 2dp
            // color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            color: (opacity = 1) => `rgba(255, 100, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 100, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
            alignSelf:'center'
          }}
        />

      {/* {points &&
      
      <LineGraph points={points} color="#4484B2" animated={true} />
      } */}

  {/* <Text>Bezier Line Chart</Text> */}
  {/* <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get('window').width * (1/2)} // from react-native
    height={250}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
      alignSelf: 'center'
    }}
    /> */}
</View>
  );
};


export default MyChart;