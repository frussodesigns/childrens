import { createContext, useReducer } from 'react'

export const AppContext = createContext()

export const contextReducer = (state, action) => {
	switch (action.type) {
		case 'REPLACE':
			return action.payload
		case 'UPDATE':
			console.log('updating')
			// console.log(Object.assign(state, action.payload))
			return Object.assign(state, action.payload)
			// or return { ...state, ...action.payload }
		default:
			return state
	}
}

export const AppContextProvider = ({ children }) => {

	const [state, dispatch] = useReducer(contextReducer, {})

	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{ children }
		</AppContext.Provider>
	)
}