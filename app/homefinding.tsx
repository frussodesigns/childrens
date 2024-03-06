import { StyleSheet, Text, View } from 'react-native'
import {useWindowDimensions, TouchableOpacity, ScrollView} from 'react-native';
import { Link, Stack, useRouter, useFocusEffect, Redirect } from "expo-router";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { useAppContext } from '../hooks/useAppContext';
import React, { useState, useEffect } from 'react'
import NeuView from '../components/NeuView'
import MyTable from '../components/table';
import { LoadFonts } from '../presets';

    const specs = {
    groupings: [
      {
        section: "Child Info",
        fields: 4
      },
      {
        section: "Additional Info",
        fields: 3
      },
      {
        section: "Birth Certificate",
        fields: 5
      },
      {
        section: "Social Security Card",
        fields: 3
      },
      {
        section: "Passport",
        fields: 3
      },
      {
        section: "State ID",
        fields: 4
      },
      {
        section: "Death Certificate",
        fields: 3
      },
      {
        section: "Case Worker",
        fields: 1
      },
      {
        section: "Possibly Discharged",
        fields: 1
      },
    ],
    sizing:[.8,]
    }
    
    const columns = [
    "CIN", 
    "Firstname", 
    "Middlename", 
    "Lastname", 
    "Status", "Initial Placement", "Date of Birth", 
    "Birth Certificate", "Has 2", "Born Outside the U.S.", "Date Requested", "Date Added",
    "Social Security Card", "Date Requested", "Date Added",
    "Passport", "Date Requested", "Date Added",
    "State ID", "NYC ID", "Date Requested", "Date Added",
    "Death Certificate", "Date Requested", "Date Added",
    "Case Worker", "Possibly Discharged"
    ]
    
    const types = [
    "number", 
    "string", 
    "string", 
    "string", 
    "status", "date", "date", 
    "bool", "bool", "bool", "date", "date",
    "bool", "date", "date",
    "bool", "date", "date",
    "bool", "bool", "date", "date",
    "bool", "date", "date",
    "supervisor", "bool"
    ]
    
    const obj = [
      {
      id: 0,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 1,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 2,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 3,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 4,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 5,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 6,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 7,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 8,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 9,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
      {
      id: 10,
      Firstname: 'Creola',
      Middlename: 'Elena',
      Lastname: 'Johnson',
      Status: 'In Progress',
      initialPlacement: '1/1/2021',
      dob: '1/1/2021',
      birthCertificate: true,
      birthCertificateHas2: true,
      botus: false,
      birthCertificateDateRequested: '1/1/2021',
      birthCertificateDateAdded: '1/2/2021',
      socialSecurityCard: false,
      socialSecurityCardDateRequested: '1/1/2021',
      socialSecurityCardDateAdded: '1/2/2021',
      passport: false,
      passportDateRequested: '1/1/2021',
      passportDateAdded: '1/2/2021',
      stateId: false,
      nycId: true,
      stateIdDateRequested: '1/2/2021',
      stateIdDateAdded: '1/2/2021',
      deathCertificate: false,
      deathCertificateDateRequested: '1/1/2021',
      deathCertificateDateAdded: '1/2/2021',
      caseWorker: 'Alex Rodriguez',
      dischargedPossible: false,
    
      }, 
    
    ]
    
    const data = [
    {
      date: "Tue Mar 21 2023 11:52:44 GMT-0400 (Eastern Daylight Time)",
      value: 0,
    },
    {
      date: "Wed Mar 22 2023 11:52:44 GMT-0400 (Eastern Daylight Time)",
      value: .2,
    },
    ]
    
    const summaries = {
    topRow: [
      {
        title: 'Entries',
        change: 5/100,
        entries: 748
      },
      {
        title: 'Passports',
        change: -5/100,
        entries: 489
      },
      {
        title: 'Social Security Cards',
        change: 5/100,
        entries: 548
      },
      {
        title: "State ID's",
        change: 8/100,
        entries: 648
      },
    ],
    overview: {
      addedThisWeek: 120,
      percent: 70/100
    },
    chart: {
      xAxis: [
        "January", "February", "March", "April", "May", "June"
      ],
      yAxis: [
        120,
        210,
        240,
        288,
        340,
        450
      ]
    }
    }
    

const Homefinding = () => {

    const { state, dispatch } = useAppContext()

    const auth = getAuth()
    const user = auth.currentUser
    const router = useRouter()

    const {height, width} = useWindowDimensions();
    const [tableHeight, setTableHeight] = useState(0);
    const [firstWidth, setWidth] = useState(0);
    const [tableWidth, setTWidth] = useState(0);
    const onLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
        // console.log(width)
      };

    const onLayoutHeight = (event) => {
      const { height } = event.nativeEvent.layout;
      setTableHeight(height);
    };



    //   Table:
        const [modalVisible, setModalVisible] = useState(false)
        const [newEntry, setNewEntry] = useState(false)
        const [modalId, setModalId] = useState(-1)
        const [indexPressed, setIndexPressed] = useState(0)  

        const handlePress = (id, index) => {
            setNewEntry(false)
            setModalVisible(true)
            setModalId(id)
            setIndexPressed(index)
        }
        const tableLayout = (event) => {
            const { width } = event.nativeEvent.layout;
            setTWidth(width);
            // console.log(width)
          };

      //initial data fetch *********************
        useEffect(() => {
            LoadFonts()
            console.log(user)
            // if (!state.docLogs && user) getData(pgLen, pgData, setError, setDocData, setResults, dispatch)
            // else {
            //   console.log('not logged in')
            //   console.log(auth)
            //   console.log(user)
            // }
        
        }, [user])
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // setInitialFetch(true) //security concern ? can someone just inject true??
            console.log(user)
            } else {
            // User is signed out
            console.log('not signed in')
            // window.location.pathname = '/login'
            // router.push('/login')
            }
        })

    //  Dummy Data
    const dummyData = [
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:40,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:70,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:100,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      {
        title:'Jones Family',
        Documents:100,
        DocumentSubmission:100,
        FinancialViability:80,
        Academics:70,
        Creativity:90,
        Athletics:88,
        date:'1/1/1111',
        subtitle:'subtitle'
      },
      
    ]

    // Filter

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

    return(
        <>
        {/* <ScrollView style={styles.page}> */}
            <View style={{flex:1, height:'100%', backgroundColor:''}}>
                <View  style={{borderRadius: 12, padding:0, margin:20, backgroundColor:'#F9F9F9', minWidth:200}} onLayout={onLayout}>
                    <NeuView style={{borderRadius: 12, backgroundColor:'#F9F9F9', minWidth:200, width:'100%' }} onLayout={onLayout}>
                        <View style={{left: 11, margin: 10}}>
                            <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}}>HOMEFINDING</Text>
                        </View>

                        
                    </NeuView>
                </View>

                {/* Table */}
                <View style={{flex:1, flexDirection:'row', width: '100%', backgroundColor:'' , padding: 20, paddingTop:0, marginTop:0, gap: 20}} onLayout={tableLayout}>
                    <View style={[styles.neu, {flexDirection:'row', borderRadius: 12, backgroundColor:'#F9F9F9', flex: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}]}>
                        <View style={[styles.secondShadow, {flex:1, flexDirection:'column', borderRadius:12}]}>
                            {/* ::TITLE:: */}
                            <View style={{left: 11, margin: 10, flexDirection:'row'}}>
                              {/* <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}}>HOME FINDING</Text> */}
                              <View style={{flex:1}}></View>
                              <Text style={{marginTop:3.5, marginRight:3}}>Filters:</Text>
                              <View 
                              style={{
                                      alignSelf: 'center',
                                      paddingHorizontal:10,
                                      marginLeft:10,
                                      marginBottom:5,
                                      width: '',
                                      height: '2em',
                                      backgroundColor:'lightgrey',
                                      borderRadius:30,
                                      flexDirection:'row',
                                      cursor: 'pointer',
                                      top: -1
                                    }}>
                                      <Text style={{marginTop:5}}>Potential Homes</Text>
                              </View>
                              <View 
                              style={{
                                      alignSelf: 'center',
                                      paddingHorizontal:10,
                                      marginLeft:10,
                                      marginBottom:5,
                                      width: '',
                                      height: '2em',
                                      backgroundColor:'lightgrey',
                                      borderRadius:30,
                                      flexDirection:'row',
                                      cursor: 'pointer',
                                      top: -1
                                    }}>
                                      <Text style={{marginTop:5}}>Confirmed Homes</Text>
                              </View>
                              <View style={{width:10}}></View>
                            </View>

                            {/* ::TABLE:: */}
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View>
                                    {/* ::TOP ROW:: */}
                                    <View style={{
                                      alignSelf: 'center',
                                      marginBottom:2,
                                      width: '98%',
                                      height: '2em',
                                      backgroundColor:'rgb(242,242,242)',
                                      borderRadius:20,
                                      borderBottomRightRadius:0,
                                      borderBottomLeftRadius:0,
                                      flexDirection:'row',
                                      // cursor: 'pointer'
                                    }}>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Last Name:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Document Completion:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Document Submission:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Financial Viability:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Academics:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Creativity:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Athletics:'}</Text>
                                      </ScrollView>
                                    </View>
                                    {/* ::TABLE CONTENT:: */}
                            <View onLayout={onLayoutHeight} style={{flex:1, backgroundColor:'', height:tableHeight}}>
                                <ScrollView showsVerticalScrollIndicator={false} style={{
                                  flex:1,
                                  minHeight:tableHeight,
                                  height:tableHeight,
                                  maxHeight:tableHeight
                                }}>
                                <View style={{marginTop: 5, backgroundColor:''}}>
                                  {dummyData.map((item, key) => 

                                    <View style={{
                                      flex:1,
                                      alignSelf: 'center',
                                      marginBottom:5,
                                      width: '98%',
                                      minHeight: '2em',
                                      backgroundColor:'rgb(242,242,242)',
                                      borderRadius:30,
                                      flexDirection:'row',
                                      cursor: 'pointer'
                                    }}>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.title}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Documents}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.DocumentSubmission/10 + "/10"}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.FinancialViability/10 + "/10"}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Academics/10 + "/10"}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Creativity/10 + "/10"}</Text>
                                        </ScrollView>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                          <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Athletics/10 + "/10"}</Text>
                                        </ScrollView>
                                      </View>
                                  )}
                                 
                                </View>
                                </ScrollView>
                            </View>
                            </View>
                            </ScrollView>
                            

                            {/* {state.docLogs &&
                            <MyTable obj={state.docLogs} columns={columns} width='100%' height='90%' sc={4} sr={0} handlePress={handlePress} viewWidth={tableWidth} />
                            } */}
                        {/* </View> */}
                        </View>
                    </View>
                </View>
            </View>
        {/* </ScrollView> */}
        </>
    )

//   return (
//     <View style={styles.container}>
//         <Text>overview, homes, recruitment & recruiters views</Text>

//         <View style={{flexDirection:'column', width: '100%', height: '80%'}}>
//               <View style={{left: 11, margin: 10}}>
//                 <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}} >OVERVIEW</Text>
//               </View>
//               <View style={{alignSelf:'center', marginTop:30}}>
//                 <AnimatedCircularProgress
//                 size={150}
//                 width={10}
//                 fill={Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}
//                 duration={2000}
//                 rotation={0}
//                 tintColor="#00e0ff"
//                 onAnimationComplete={() => console.log('onAnimationComplete')}
//                 backgroundColor="#7795b5">
//                   {
//                       (fill) => (
//                         <Text style={{fontSize:30, color:"#00e0ff"}}>
//                           {Math.round(topStats.overview.addedThisWeek / topStats.topRow[0].entries * 100)}%
//                         </Text>
//                       )
//                     }
//                 {/* <WithSkiaWeb 
//                   opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}` }}
//                   getComponent={() => import('../components/Breathe')}
//                   fallback={<Text>Loading Skia...</Text>}
//                 /> */}
          
//               </View>
//               <View style={{alignSelf:'center', marginTop:30}}>
//                   <Text style={{textAlign:'center'}}>Total Documents Added This Month:</Text>
//               </View>
//               <View style={{alignSelf:'center', marginTop:5}}>
//                   <Text style={{fontSize:40, fontWeight:'400'}}>{topStats.overview.addedThisWeek}</Text>
//               </View>
//               {/* <View style={{height:10}}></View> */}
//               {/* <View style={{left: 11, margin: 10, marginTop: 0}}>
//                 <Text style={{color:'black', fontWeight: '200', fontSize: 45}} >748</Text>
//               </View> */}
              
//           </View>

//         {/* {homes && homes.map((home, index) => 
//             <>
//                 <Text>{home.name}</Text>
//             </>
//         )} */}
//     </View>
//   )
}

export default Homefinding

const styles = StyleSheet.create({
    page: {
        display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '',
        height: '100vh',
        width:'100%',
        // margin: 50,
    },
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
