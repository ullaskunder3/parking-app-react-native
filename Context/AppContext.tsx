import React, { useState, createContext} from "react";
import { Appearance } from "react-native";

const AppContext = createContext<any|null>(null);

const AppContextProvider = ({children}:any)=>{
    const [appData, setAppData] = useState([])
    const [theme, setTheme] = useState('');
    
    return(
        <AppContext.Provider value={{appData, setAppData}}>
            {children}
        </AppContext.Provider>
    )
};

export {AppContext, AppContextProvider}