import { useContext, useReducer, createContext } from "react";


export const AuthContext = createContext()

export const authReducer = () => {
    switch (action.type) {
    
    }
}

export const AuthContextProvider = ({children}) => {
    <AuthContext.Provider value={}>
        {children}
    </AuthContext.Provider>
}