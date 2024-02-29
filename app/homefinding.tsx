import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

const Homefinding = () => {

    const homefinding = {
        Confirmed: [
            {
                basics: {
                    _id: 'id-num',
                    Parents: ['Mom Example', 'Dad Example'],
                    Adults: ['Older Brother Example'],
                    Pets: ['Pet Example'],
                },
                ViabilityScore: {
                    submissionOfDocuments: 10,
                    financialViability: 10,
                    creativity: 10,
                    athletics: 10,

                },
                Documents: {
                    birthCertificates: {
                        receipt: true,
                        dateOfSubmission: '11/11/2011'
                    },
                    ss: {},
                    lease: {},
                    marriageCertificate: {},
                    passport: {},
                    driversLicense: {},
                    cableBill: {},
                    phoneBill: {},
                    income: {},
                    w2: {},
                    electricBill: {},
                    carInsurance: {},
                    carRegistration: {},
                    vaccines: {},
                    selClearance: {},
                    fingerprints: {},
                    //...
                },
                Questionnaire: [],
                RecruitmentData: {
                    Recruiter: ['Nancy Adams'],
                    Location: ['politics', 'email'],
                    Note: 'referred to us via e-mail through NY Senator Kirsten Gillibrand'
                },
                dateOfFirstContact: '11/11/2011',
                dateOfConfirmation: '11/11/2011'
            }
        ],
        Possible: [
            {
                _id: 'id-num',
                Parents: ['Mom Example', 'Dad Example'],
                Adults: ['Older Brother Example'],
                ViabilityScore: {
                    submissionOfDocuments: 10,
                    financialViability: 10,
                    emotionalIntelligence: 10,
                    creativity: 10,
                    athletics: 10,
                },
                Documents: {
                    birthCertificates: {
                        receipt: true,
                        dateOfSubmission: '11/11/2011'
                    },
                    ss: true,
                    lease: true,
                    marriageCertificate: true,
                    passport: true,
                    driversLicense: true,
                    //...
                },
                Questionnaire: [],
                RecruitmentData: {
                    Recruiter: ['Nancy Adams'],
                    Location: ['politics', 'email'],
                    Note: 'referred to us via e-mail through NY Senator Kirsten Gillibrand'
                },
                dateOfFirstContact: '11/11/2011',
                dateOfConfirmation: '11/11/2011'
            }
        ],
        Recruitment: {
            politics: {

            },
            malls: {

            },
            churches: {

            },
            events: {

            },
            phone: {

            },
            email: {

            }
        },
        Recruiters: [
            {
                Name: 'Example Example',
                dateOfFirstEmployment: '11/11/2011',
                recruitments: [
                    {
                        id: 'id-num',
                        dateOfRecruitment: '11/11/2011',
                        location: 'politics',
                    }
                ],
                statistics: {
                    recruitmentsPerWeek: 2,
                    recruitmentsPerLocation: {
                        politics: 8,
                        malls: 0,
                        churches: 0,
                        events: 0
                    }
                }
            }
        ],
    }

    const homefindingFunctions = {
        overviewJSX: () => {
            <>

            </>
        },
        homesJSX: () => {
            <>

            </>
        },
        recruitmentJSX: () => {
            <>

            </>
        },
        recruitersJSX: () => {
            <>

            </>
        },
    }

  return (
    <View style={styles.container}>
        <Text>overview, homes, recruitment & recruiters views</Text>

        <View style={{flexDirection:'column', width: '100%', height: '80%'}}>
              <View style={{left: 11, margin: 10}}>
                <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >OVERVIEW</Text>
              </View>
              <View style={{alignSelf:'center', marginTop:30}}>
                <AnimatedCircularProgress
                size={150}
                width={10}
                fill={Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}
                duration={2000}
                rotation={0}
                tintColor="#00e0ff"
                onAnimationComplete={() => console.log('onAnimationComplete')}
                backgroundColor="#7795b5">
                  {
                      (fill) => (
                        <Text style={{fontSize:30, color:"#00e0ff"}}>
                          {Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}%
                        </Text>
                      )
                    }
                {/* <WithSkiaWeb 
                  opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
                  getComponent={() => import('../components/Breathe')}
                  fallback={<Text>Loading Skia...</Text>}
                /> */}
          
              </View>
              <View style={{alignSelf:'center', marginTop:30}}>
                  <Text style={{textAlign:'center'}}>Total Documents Added This Month:</Text>
              </View>
              <View style={{alignSelf:'center', marginTop:5}}>
                  <Text style={{fontSize:40, fontWeight:'400'}}>{topStats.overview.addedThisWeek}</Text>
              </View>
              {/* <View style={{height:10}}></View> */}
              {/* <View style={{left: 11, margin: 10, marginTop: 0}}>
                <Text style={{color:'black', fontWeight: '200', fontSize: 45}} >748</Text>
              </View> */}
              
          </View>

        {/* {homes && homes.map((home, index) => 
            <>
                <Text>{home.name}</Text>
            </>
        )} */}
    </View>
  )
}

export default Homefinding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: 'lightgrey',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
      }
})