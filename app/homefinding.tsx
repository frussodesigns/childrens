import { StyleSheet, Text, View, Modal } from 'react-native'
import {useWindowDimensions, TouchableOpacity, ScrollView, Animated} from 'react-native';
import { Link, Stack, useRouter, useFocusEffect, Redirect } from "expo-router";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { useAppContext } from '../hooks/useAppContext';
import React, { useState, useEffect, useRef } from 'react'
import NeuView from '../components/NeuView'
import MyTable from '../components/table';
import { LoadFonts } from '../presets';
import HomefindingModal from '../components/HomefindingModal';
import { SyncedScrollViewContext, syncedScrollViewState } from '../contexts/SyncedScrollViewContext.js'
import { SyncedScrollView } from '../components/SyncedScrollView';
import { FontAwesome } from '@expo/vector-icons';

    const specs = {
    groupings: [
      {
        section: "Household Info",
        fields: 6
      },
      {
        section: "Documents",
        fields: 16
      },
      {
        section: "Viability Score",
        fields: 5
      },
      {
        section: "Questionnaire Scores",
        fields: 3
      },
      {
        section: "Recruiter Data",
        fields: 3
      },
      {
        section: "Time Logs",
        fields: 2
      },
      
    ],
    sizing:[.8,]
    }
    
    const columns = [
    "ID", 
    "Status", 
    "Number of Adults", 
    "Last Name", 
    "Parent 1 First Name", 
    "Parent 2 First Name", 
    "Birth Certificates", "Social Security Cards", "Lease", "Marriage Certificate", "Passports", "Driver's Licenses", "Cable Bill", "Phone Bill", "Income", "W2's", "Electric Bill", "Car Insurance", "Car Registration", "Vaccines", "SEL Clearance", "Fingerprints",
    "Submission of Documents", "Financial Viability", "Creativity", "Athletics", "Academics", 
    "Creativity", "Athletics", "Academics",
    "Recruiter", "Location", "Notes",
    "Date of First Contact", "Date of Confirmation"
    ]
    
    const types = [
    "number", 
    "string", 
    "number", 
    "string", 
    "string", 
    "string", 
    "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool", "bool",
    "number", "number", "number", "number", "number", 
    "number", "number", "number",
    "string", "string", "string",
    "date", "date"
    ]
    
    const obj = [
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Ellis',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 80,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Potential',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Potential',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
      }, 
      {
      id: 0,
      _id: 1,
      status: 'Confirmed',
      numAdults: 2,
      lastName: 'Russo',
      parent1: 'Freddy',
      parent2: 'Lexi',
      birthCertificates: true,
      ss: true,
      lease: false,
      marriageCertificate: false,
      passports: false,
      driversLicenses: false,
      cableBill: false,
      phoneBill: false,
      income: false,
      w2s: false,
      elecBill: false,
      carInsurance: false,
      carRegistration: true,
      vaccines: false,
      selClearance: false,
      fingerprints: false,
      submissionOfDocuments: 10,
      financialViability: 10,
      creativity: 10,
      athletics: 8,
      academics: 8,
      questCreativity: 10,
      questAthletics: 8,
      questAcademics: 8,
      recruiter: 'Alex Taguan',
      location: 'Bronx Church',
      notes: '',
      dateOfFirstContact: '1/1/2021',
      dateOfConfirmation: '1/8/2021',
      documentCompletion: 100,
    
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
    const [searchOpen, setSearchOpen] = useState(false)
    const [tableHeight, setTableHeight] = useState(0);
    const [firstWidth, setWidth] = useState(0);
    const [tableWidth, setTWidth] = useState(0);
    const [testData, setTestData] = useState([])
    const [filter, setFilter] = useState('Potential')
    const onLayout = (event) => {
      const { width } = event.nativeEvent.layout;
      setWidth(width);
      // console.log(width)
    };

    const onLayoutHeight = (event) => {
      const { height } = event.nativeEvent.layout;
      setTableHeight(height);
    };

    // Scroll Sync /////////////////////
    const scrollView1Ref = useRef(null);
    const scrollView2Ref = useRef(null);

    let firstRef: ScrollView | null;
    let secondRef: ScrollView | null;

    const handleScrollView1Scroll = (event) => {
      // const offsetY = event.nativeEvent.contentOffset.y;
      scrollView2Ref.current.scrollTo({ y: event.nativeEvent.contentOffset.y, animated: false });
    };
  
    const handleScrollView2Scroll = (event) => {
      // const offsetY = event.nativeEvent.contentOffset.y;
      scrollView1Ref.current.scrollTo({ y: event.nativeEvent.contentOffset.y, animated: false });
    };
    // Scroll Sync ///////////////////////

    //Modal State //////////////
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

    const newLog = () => {
      console.log('newlog')
      setNewEntry(true)
      setModalVisible(true)
      setModalId(0)
    }
    ////////////////////////////


    //   Table:

        const tableLayout = (event) => {
            const { width } = event.nativeEvent.layout;
            setTWidth(width);
            // console.log(width)
          };

      //Auth initial data fetch *********************
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
        id: 1,
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
        id:2,
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
        id:3,
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

    //Original Data Plan
    const homefinding = {
        Confirmed: [
            {
                status: 'confirmed',
                basics: {
                    _id: 'id-num',
                    lastname: 'Jones',
                    parents: ['Mom Example', 'Dad Example'],
                    adults: ['Older Brother Example'],
                    pets: ['Pet Example'],
                },
                viabilityScore: {
                    submissionOfDocuments: 10,
                    financialViability: 10,
                    creativity: 10,
                    athletics: 10,
                    academics: 10,

                },
                Documents: {
                    birthCertificates: {
                        receipt: true,
                        dateOfSubmission: '11/11/2011'
                    },
                    ss: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    lease: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    marriageCertificate: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    passport: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    driversLicense: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    cableBill: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    phoneBill: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    income: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    w2: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    electricBill: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    carInsurance: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    carRegistration: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    vaccines: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    selClearance: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
                    fingerprints: {
                      receipt: true,
                      dateOfSubmission: '11/11/2011'
                    },
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

    //Filtration System

    const filterData = (data, filter) => {

      let sorted = []

      console.log('filterData')

      for (let item in data) {
        console.log(Object.keys(data[item]));
        let currObj = data[item];
        if (currObj.status && currObj.status === filter) {
          sorted.push(currObj);
        }
      }

      setTestData(sorted)
      console.log(testData)
      return sorted
    }

    useEffect(() => {
      console.log('filter changed')
      filterData(obj, filter)
      console.log(testData)
    }, [filter])
    

    return(
      <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
      
        {/* ::MODAL:: */}

        <Modal
          transparent
          visible={modalVisible}
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
            
          }}
        >
          <HomefindingModal 
            newEntry={newEntry}
            modalId={modalId} 
            index={indexPressed}
            setModalVisible={setModalVisible} 
            columns={columns} 
            specs={specs} 
            types={types} 
            data={testData}
            supervisors={state.supervisors}
            
            />
          
        </Modal>

        {/* ::MODAL:: */}


        {/* <ScrollView style={styles.page}> */}
            <View style={{flex:1, height:'100%', backgroundColor:''}}>
                <View  style={{borderRadius: 12, padding:0, margin:20, backgroundColor:'#F9F9F9', minWidth:200,}} onLayout={onLayout}>
                    <NeuView style={{borderRadius: 12, backgroundColor:'#F9F9F9', minWidth:200, width:'100%' }} onLayout={onLayout}>
                        <View style={{left: 11, margin: 10}}>
                            <Text style={{color:'grey', fontWeight: 'bold', fontSize: 17, fontFamily: 'Rubik'}}>HOMEFINDING</Text>
                        </View>

                        
                    </NeuView>
                </View>

                {/* Table */}
                <View style={{flex:1, flexDirection:'row', width: '100%', backgroundColor:'' , padding: 20, paddingTop:0, marginTop:0, gap: 20}} onLayout={tableLayout}>
                    <View style={[styles.neu, {flexDirection:'row', borderRadius: 12, backgroundColor:'#F9F9F9', flex: 1, display: 'flex', alignContent: 'center', justifyContent: 'center'}]}>
                        <View style={[styles.secondShadow, {flex:1, flexDirection:'column', borderRadius:12, alignItems:'center'}]}>
                            {/* ::TITLE:: */}
                            <View style={{flex:1, maxWidth:'100%', flexDirection:'column'}}>
                            
                              <View style={{marginVertical: 10, flexDirection:'row'}}>

                              <View 
                                style={{
                                        alignSelf: 'center',
                                        paddingHorizontal:10,
                                        marginLeft:10,
                                        marginBottom:5,
                                        width: '',
                                        height: 30,
                                        backgroundColor:'rgb(242,242,242)',
                                        borderRadius:30,
                                        flexDirection:'row',
                                        cursor: 'pointer',
                                        top: -1,
                                        justifyContent:'center',
                                        alignItems:'center'
                                      }}>
                                      <TouchableOpacity onPress={()=>newLog()}>
                                        <Text style={{}}>New Home</Text>
                                      </TouchableOpacity>
                                </View>

                                {/* spacer */}
                                {width && <View style={{flex:1}}></View>}

                              {/* SEARCH */}
                             
                             {/* search icon... */}
                              <View style={{cursor: 'pointer' ,marginLeft:15, marginTop: 8, height:12, aspectRatio:1, backgroundColor:'', alignItems:'center', justifyContent:'center'}}>
                                <TouchableOpacity onPress={()=>{setSearchOpen((current) => !current)}}>
                                  <FontAwesome name="search" size={20} color="black" />
                                </TouchableOpacity>
                              </View>
                              
                              {/* search bar... */}
                              {width > 800 && searchOpen &&
                              <View style={{marginLeft:5, flex: 1, minWidth: 180, height: 30, backgroundColor:'rgb(242,242,242)', borderRadius:20, justifyContent:'center' }}>
                                <Text style={{marginLeft:20}}>Search</Text>
                              </View>
                              }

                              <View style={{width:20}} />
                              

                                
                                
                                {/* FILTERS */}
                                <Text style={{marginTop:3.5, marginRight:20 }}>Results: 200</Text>
                                {/* {width > 800 && <View style={{flex:1}}></View>} */}
                                <Text style={{marginTop:3.5, marginRight:3}}>Filters:</Text>
                                <TouchableOpacity onPress={()=>setFilter('Potential')}
                                style={{
                                        alignSelf: 'center',
                                        paddingHorizontal:10,
                                        marginLeft:10,
                                        marginBottom:5,
                                        width: '',
                                        height: 30,
                                        backgroundColor: filter == 'Potential' ? 'lightgrey' : 'rgb(242,242,242)',
                                        borderRadius:30,
                                        flexDirection:'row',
                                        cursor: 'pointer',
                                        top: -1,
                                        borderWidth: filter == 'Potential' ? 2 : 0,
                                        borderColor:'black',
                                        justifyContent:'center',
                                        alignItems:'center'
                                      }}>
                                        <Text style={{}}>Potential Homes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setFilter('Confirmed')}
                                style={{
                                        alignSelf: 'center',
                                        paddingHorizontal:10,
                                        marginLeft:10,
                                        marginBottom:5,
                                        width: '',
                                        height: 30,
                                        backgroundColor: filter == 'Confirmed' ?  'lightgrey' : 'rgb(242,242,242)',
                                        borderRadius:30,
                                        flexDirection:'row',
                                        cursor: 'pointer',
                                        top: -1,
                                        borderWidth: filter == 'Confirmed' ? 2 : 0,
                                        borderColor:'black',
                                        justifyContent:'center',
                                        alignItems:'center'
                                      }}>
                                        <Text style={{}}>Confirmed Homes</Text>
                                </TouchableOpacity>
                                <View style={{width:10}}></View>
                              </View>
                              
                            {/* ::THE TABLE:: */}
                            <View style={{flex:1,flexDirection:'row', backgroundColor:''}}>
                            {/* ::STICKY COLUMN:: */}
                                  <View style={{height:'100%', width:200, backgroundColor:'', marginRight:-14}}>
                                  <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
                                    <View >
                                    {/* ::TOP ROW:: */}
                                    <View style={{
                                      alignSelf: 'center',
                                      marginBottom:0.5,
                                      width: '98%',
                                      height: width > 800 ? '2em' : '2.5em',
                                      backgroundColor:'rgb(242,242,242)',
                                      borderTopLeftRadius:20,
                                      // borderBottomLeftRadius:20,
                                      flexDirection:'row',
                                      // cursor: 'pointer'
                                    }}>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop: 5, fontSize: width > 800 ? null : 18}}>{'Household:'}</Text>
                                      </ScrollView>
                                      {/* <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Document Completion:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Document Submission:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Financial Viability:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Academics:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Creativity:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Athletics:'}</Text>
                                      </ScrollView> */}
                                    </View>
                            {/* ::STICKY COLUMN, SCROLLING:: */}
                                  <View onLayout={onLayoutHeight} style={{flex:1, backgroundColor:'', height:tableHeight}}>
                                      <Animated.ScrollView showsVerticalScrollIndicator={false} 
                                      // _id={2}
                                      ref={scrollView2Ref}
                                      // ref={ref => (firstRef = ref)}
                                      onScroll={handleScrollView2Scroll}
                                      style={{
                                        flex:1,
                                        minHeight:tableHeight,
                                        height:tableHeight,
                                        maxHeight:tableHeight,
                                        backgroundColor:''
                                      }}>
                                      <View style={{marginTop: 5, backgroundColor:''}}>
                                        {testData && testData.map((item, key) => 

                                          <TouchableOpacity onPress={() => handlePress(item.id, item.id)} style={{
                                            flex:1,
                                            alignSelf: 'center',
                                            marginBottom:5,
                                            width: '98%',
                                            minHeight: width > 800 ? '2em' : '2.5em',
                                            backgroundColor:'rgb(242,242,242)',
                                            borderTopLeftRadius:20,
                                            borderBottomLeftRadius:20,
                                            flexDirection:'row',
                                            // cursor: 'pointer'
                                          }}>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 18}}>{item.lastName}</Text>
                                              </ScrollView>
                                              {/* <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Documents}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.DocumentSubmission/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.FinancialViability/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Academics/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Creativity/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.Athletics/10 + "/10"}</Text>
                                              </ScrollView> */}
                                            </TouchableOpacity>
                                        )}
                                      
                                      </View>
                                      </Animated.ScrollView>
                                  </View>
                                  </View>
                                  </ScrollView>
                                  </View>

                            {/* ::HORIZ-SCROLL:: */}
                                  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <View>
                                    {/* ::TOP ROW:: */}
                                    <View style={{
                                      alignSelf: 'center',
                                      marginBottom:.5,
                                      width: '98%',
                                      height: width > 800 ? '2em' : '2.5em',
                                      backgroundColor:'rgb(242,242,242)',
                                      borderTopRightRadius:20,
                                      flexDirection:'row',
                                      // cursor: 'pointer'
                                    }}>
                                      {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{'Last Name:'}</Text>
                                      </ScrollView> */}
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop: 5, fontSize: width > 800 ? null : 15}}>{'Document Completion:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 15}}>{'Document Submission:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 15}}>{'Financial Viability:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 15}}>{'Academics:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 15}}>{'Creativity:'}</Text>
                                      </ScrollView>
                                      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                        <Text numberOfLines={1} style={{marginLeft:20, marginTop:5, fontSize: width > 800 ? null : 15}}>{'Athletics:'}</Text>
                                      </ScrollView>
                                    </View>
                                    {/* ::SCROLLING, MAIN CONTENT:: */}
                                  <View onLayout={onLayoutHeight} style={{flex:1, backgroundColor:'', height:tableHeight}}>
                                      <Animated.ScrollView showsVerticalScrollIndicator={false} 
                                      // _id={1}
                                      ref={scrollView1Ref}
                                      onScroll={handleScrollView1Scroll}
                                      style={{
                                        flex:1,
                                        minHeight:tableHeight,
                                        height:tableHeight,
                                        maxHeight:tableHeight,
                                        backgroundColor:''
                                      }}>
                                      <View style={{marginTop: 5, backgroundColor:''}}>
                                        {testData && testData.map((item, key) => 
                                          
                                          <TouchableOpacity  onPress={() => handlePress(item.id, item.id)}  style={{
                                            flex:1,
                                            alignSelf: 'center',
                                            marginBottom:5,
                                            width: '98%',
                                            minHeight: width > 800 ? '2em' : '2.5em',
                                            backgroundColor:'rgb(242,242,242)',
                                            borderTopRightRadius:30,
                                            borderBottomRightRadius:30,
                                            flexDirection:'row',
                                            cursor: 'pointer'
                                          }}>
                                              {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:100}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop:5}}>{item.title}</Text>
                                              </ScrollView> */}
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.documentCompletion + '%'}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.submissionOfDocuments/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.financialViability/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.academics/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.creativity/10 + "/10"}</Text>
                                              </ScrollView>
                                              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{width:180}}>
                                                <Text numberOfLines={1} style={{marginLeft:20, marginTop: width > 800 ? 5: 8, fontSize: width > 800 ? null : 18}}>{item.athletics/10 + "/10"}</Text>
                                              </ScrollView>
                                            </TouchableOpacity>
                                        )}
                                      
                                      </View>
                                      </Animated.ScrollView>
                                  </View>
                                  </View>
                                  </ScrollView>

                            </View>
                            </View> 
                            

                            {/* {state.docLogs &&
                            <MyTable obj={state.docLogs} columns={columns} width='100%' height='90%' sc={4} sr={0} handlePress={handlePress} viewWidth={tableWidth} />
                            } */}
                        {/* </View> */}
                        </View>
                    </View>
                </View>
                {width > 800 ? null :
                  <View style={{backgroundColor: '', height:88, width: '100%'}}>

                  </View>
                }
            </View>
        {/* </ScrollView> */}
        
        </SyncedScrollViewContext.Provider>
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
