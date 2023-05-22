import { AppContext } from '../AppContext'
import { useContext } from 'react'

export const useAppContext = () => {
	const context = useContext(AppContext)

	if (!context){
		throw Error ('useAppContext must be used within scope of AppContextProvider')
	}

	return context
}