import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'

const AutocompleteDropdown = ({type, supervisor, modData, supervisors, formdata, autocompleteActive}) => {

    const [sortedSupervisors, setSortedSupervisors] = useState([])
    const [filteredSupervisor, setFilteredSupervisor] = useState([])
    const [matches, setMatches] = useState([])
    const [activated, setActivated] = useState(false)

    console.log({type, supervisor, modData, supervisors, formdata, autocompleteActive})

    //supervisor selection function
    const selectSup = (item) => {

        console.log('selected')
        console.log(item)
        console.log(type)

        if (item != 'no matches'){
            console.log('autoselect')
            modData(item, type)
        }
    }

    //sort directors/supervisors by type
    useEffect(() => {

        console.log('sorting dropdown')
        console.log(supervisors)

        const filteredSupervisors = supervisors
            .filter(element => element.role === type)
            .filter(element => {
            if (type === 'caseWorker') {
                console.log(element)
                return true;
            }
            else if (!formdata.role.director && element.director === formdata.director) {
                console.log('caseworker:' + element.name);
                return true;
            } else if (type === 'director') {
                return true;
            }
            return false;
            });

        setSortedSupervisors(prevSupervisors => [...filteredSupervisors]);

        console.log(sortedSupervisors)
    }, [supervisors, formdata.role, autocompleteActive])

    //sort based on current entry
    useEffect(() => {

        if (supervisor != null){
            setMatches(sortedSupervisors.filter(element => element.name.toLowerCase().startsWith(supervisor.toLowerCase())))
        }

        if (supervisor == null || supervisor == ''){
            console.log('null...')
            setFilteredSupervisor(sortedSupervisors)
        }
        else if (matches.length > 0){
            setFilteredSupervisor(matches)
        }
        else if (matches.length === 0){
            setFilteredSupervisor([{name: 'no matches', type: null}])
        }
        // if (matches.length > 0) {
        //     setFilteredSupervisor(matches);
        // } else {
        //     setFilteredSupervisor(['no matches']);
        // }

    }, [sortedSupervisors, supervisor, matches, autocompleteActive]);
    

  return (
    <View style={{zIndex: 1, flex: 1, position: 'absolute', marginTop: '3em',  backgroundColor:'#F9F9F9', paddingLeft: 10, borderRadius: 5, width:'100%'}}>
        <ScrollView style={{maxHeight: '6em', position: 'relative'}}>
                {   filteredSupervisor &&
                    filteredSupervisor.map((item, index) => (
                        
                        <TouchableOpacity style={{backgroundColor:'red'}} key={index} onPress={() => {selectSup(item.name)}}>
                                <Text style={{flex: 1, width: '100%', backgroundColor:'yellow'}}>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                }

        </ScrollView>
    </View>
  )
}

export default AutocompleteDropdown