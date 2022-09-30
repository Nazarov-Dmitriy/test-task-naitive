import React, {
	useContext,
	createContext,
	useState,
	useMemo
} from 'react'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [errorLogin, setErrorLogin] = useState(false);
	const name = 'test';
	const password = "test";

	const logIn = (email, pass) => {
		if (email === name && pass === password) {
			setUser(true)
		} else {
			setErrorLogin(true)
		}
	}

	const logOut = () => {
		setUser(false)
		setErrorLogin(false)
	}

	const values = useMemo(
		() => ({
			user,
			errorLogin,
			login: logIn,
			logout: logOut,

		}),
		[user, errorLogin]
	)


	return (
		<AuthContext.Provider value={values} >
			{children}
		</ AuthContext.Provider>
	)


}

export const useAuth = () => useContext(AuthContext)
