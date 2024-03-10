import { View, Text } from 'react-native'
import React from 'react'
import { useAppContext } from './hooks/useAppContext'
import { REACT_APP_DOCUMENT_API } from '@env'
import { REACT_APP_DOCUMENT_API_RENDER } from '@env'

const api2 = REACT_APP_DOCUMENT_API
const api = REACT_APP_DOCUMENT_API
// const api2 = REACT_APP_DOCUMENT_API_RENDER

export async function getStats(dispatch){
  const response = await fetch(api2 + 'getStats')
  const json = await response.json()

  if (response.ok) {
	  // setError(null) **Add Errors Later**

    
    console.log(json)
    
    dispatch({
      type: 'UPDATE', 
      payload: {
        docStats: json
      }
    })
	}
}

export async function getData(pgLen, pgData, setError, setData, setResults, dispatch) {

  // const { appContext, dispatch } = useAppContext()

  // console.log(api)
  // console.log(api2)

  // console.log(process.env.REACT_APP_DOCUMENT_API)
  // console.log(REACT_APP_DOCUMENT_API)

  const response = await fetch(api2 + 'getData', {
    method: 'POST',
    body: JSON.stringify({ pgLen, pgData }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await response.json()

  if (!response.ok) {
    setError(json.eror)
    console.log(json.error)
  }
  
  if (response.ok){
    setError(null)
    setData(json.data)
    setResults(json.results)
    // return(json.data)
    dispatch({
      type: 'UPDATE', 
      payload: {
        docLogs: json.data
      }
    })
  }
}

export async function patchFormData(formData, setError, setConfirmation, dispatch, state) {
  const response = await fetch (api + 'update', {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await response.json()

  if (!response.ok){
    setError(json.error)
    console.log(json.error)
    return true
  }

  if (response.ok) {
    setError(null)
    setConfirmation(true)
    console.log(state.docLogs)
    console.log(json)
    dispatch({
      type: "UPDATE", 
      payload: {
        docLogs: state.docLogs.map(u => u._id !== json._id ? u : json)
      }
    })
  }

}

//document page:
export async function postFormData(formData, setError, setConfirmation, dispatch, state) {
  const response = await fetch('http://localhost:4000/api/documents/', {
    method: 'POST', // PUT or PATCH (or DELETE)
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
    }
  })

  let json = await response.json()

  if (!response.ok) {
    setError(json.error)	
    console.log(json.error)
    return true
  }

  if (response.ok) {
    setError(null)
    setConfirmation(true)
    console.log(json)
    json = {
      _id: 0,
      ...json
    }
    console.log(json)
    dispatch({
      type: "UPDATE", 
      payload: {
        docLogs: [json, ...state.docLogs]
      }
    })
    // maybe reset form
  }
}

export async function postHomeFormData(formData, setError, setConfirmation, dispatch, state) {
  const response = await fetch('http://localhost:4000/api/homefinding/', {
    method: 'POST', // PUT or PATCH (or DELETE)
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json'
    }
  })

  let json = await response.json()

  if (!response.ok) {
    setError(json.error)	
    console.log(json.error)
    return true
  }

  if (response.ok) {
    setError(null)
    setConfirmation(true)
    console.log(json)
    json = {
      _id: 0,
      ...json
    }
    console.log(json)
    dispatch({
      type: "UPDATE", 
      payload: {
        homeLogs: [json, ...state.docLogs]
      }
    })
    // maybe reset form
  }
}

export async function getDischargeList(setError, setData) {

  // const { appContext, dispatch } = useAppContext()

  const response = await fetch(api + 'dischargeList')

  const json = await response.json()

  if (!response.ok) {
    setError(json.eror)
    console.log(json.error)
  }
  
  if (response.ok){
    setError(null)
    setData(json)
  }
}

export async function discharge(setError, setConfirmation, data) {

  // const { appContext, dispatch } = useAppContext()

  const response = await fetch(api + 'discharge', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const json = await response.json()

  if (!response.ok) {
    setError(json.eror)
    console.log(json.error)
    return false
  }
  
  if (response.ok){
    setError(null)
    setConfirmation(true)
    return true
  }
}