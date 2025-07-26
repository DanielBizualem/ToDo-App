import React, { createContext, useState } from 'react'


export const userContext = createContext()
const Context = ({children}) => {
    const [user,setUser] = useState('Daniel')
    return (
        <div>
            <userContext.Provider value={{user,setUser}}>
                {children}
            </userContext.Provider>
        </div>
    )
}

export default Context