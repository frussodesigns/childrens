import { REACT_APP_DOCUMENT_API_SUPERVISORS } from '@env'
import { REACT_APP_DOCUMENT_API_RENDER } from '@env'

const api2 = REACT_APP_DOCUMENT_API_SUPERVISORS
// const api2 = REACT_APP_DOCUMENT_API_RENDER

const reOrderSupervisors = (unorderedSupervisors) => {
  let directors = []
  let supervisors = []
  let caseWorkers = []
  let orderedList = []

  //create countable arrays for layers of heirarchy
  unorderedSupervisors.forEach(sup => {
    if (sup.role === 'director'){
      directors.push(sup)
    }
    else if (sup.role === 'supervisor'){
      supervisors.push(sup)
    }
    else if (sup.role === 'caseWorker'){
      caseWorkers.push(sup)
    }
  });

  //push matching lowest level objects to next level up objects
  for (i = 0; i < caseWorkers.length; i++){
    for (j = 0; j < supervisors.length; j++){
      if (caseWorkers[i].supervisor === supervisors[j].name){
        if (!supervisors[j].caseWorkers) supervisors[j].caseWorkers = []
        supervisors[j].caseWorkers.push(caseWorkers[i])
      }
    }
  }

  //push second level up objects to next level up objects
  for (let i = 0; i < supervisors.length; i++){
    for (let j = 0; j < directors.length; j++){
      if (supervisors[i].director === directors[j].name){
        if (!directors[j].supervisors) directors[j].supervisors = []
        directors[j].supervisors.push(supervisors[i])
      }
    }
  }

  //unfurl objects
  for (let i = 0; i < directors.length; i ++){
    orderedList.push(directors[i])
    if (directors[i].supervisors) for (let j = 0; j < directors[i].supervisors.length; j++){
      orderedList.push(directors[i].supervisors[j])
      if (directors[i].supervisors[j].caseWorkers) for (let k = 0; k < directors[i].supervisors[j].caseWorkers.length; k++){
        orderedList.push(directors[i].supervisors[j].caseWorkers[k])
      }
    }
  }

  //hiSort
  //hiSort2 = keep in heriarchal object, sort alphabetically when added to db
    //also use for in loops

  return orderedList

}

export async function fetchSupervisors(dispatch) {

    console.log('fetchingSupervisors')
  
    const response = await fetch(api2, {
      method: 'POST',
      body: JSON.stringify({}),
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
    //   setError(null)
    //   setData(json.data)
    //   setResults(json.results)
      console.log(json.data)
      // setSupervisors(json.data)

      let reorderedSupervisors = reOrderSupervisors(json.data)

      console.log(reorderedSupervisors)
      
      dispatch({
        type: 'UPDATE', 
        payload: {
          supervisors: reorderedSupervisors
        }
      })
      console.log(json.data)
      return(json.data)
    }
  }

export async function newSupervisor(formData, dispatch, state, setSupModalVisible, setError) {

    console.log('newSupervisor')
    console.log(formData)
  
    const response = await fetch(api2 + '/new', {
      method: 'POST',
      body: JSON.stringify({formData}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const json = await response.json()
  
    if (!response.ok) {
    //   setError(json.eror)
      console.log(json.error)
      setError(json.error)
    }
    
    if (response.ok){
    //   setError(null)
    //   setData(json.data)
    //   setResults(json.results)
  
      dispatch({
        type: 'UPDATE', 
        payload: {
          supervisors: [...state.supervisors, json.data]
        }
      })
      setSupModalVisible(false)
      return(json.data)
    }
  }

export async function modSupervisor(id, formData, dispatch, state, setModSupModalVisible) {

    console.log('newSupervisor')
    console.log(formData)
    console.log(id)
  
    const response = await fetch(api2 + '/mod', {
      method: 'POST',
      body: JSON.stringify({id, formData}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const json = await response.json()
  
    if (!response.ok) {
    //   setError(json.eror)
      console.log(json.error)
    }
    
    if (response.ok){
    //   setError(null)
    //   setData(json.data)
    //   setResults(json.results)

      // Find the index of the supervisor with the given _id
      const index = state.supervisors.findIndex(supervisor => supervisor._id === json.data._id);

      // If the supervisor is found, update it, otherwise, add it to the end of the array
      const updatedSupervisors = index !== -1
        ? [
            ...state.supervisors.slice(0, index),
            json.data,
            ...state.supervisors.slice(index + 1),
          ]
        : [...state.supervisors, json.data];

      dispatch({
        type: 'UPDATE', 
        payload: {
          supervisors: updatedSupervisors
        }
      })
      setModSupModalVisible(false)
      return(json.data)
    }
  }

export async function delSupervisor(selectedSupId, dispatch, setSupModalVisible) {

    console.log('delSupervisor')
    console.log(selectedSupId)
  
    const response = await fetch(api2 + '/del', {
      method: 'POST',
      body: JSON.stringify({id: selectedSupId}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const json = await response.json()
  
    if (!response.ok) {
    //   setError(json.eror)
      console.log(json.error)
    }
    
    if (response.ok){
    //   setError(null)
    //   setData(json.data)
    //   setResults(json.results)
      console.log(json.data)
      dispatch({
        type: 'DELETE_SUP', 
        payload: {
          id: selectedSupId
        }
      })
      setSupModalVisible(false)
      return(json.data)
    }
  }