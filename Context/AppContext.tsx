import React, { useState, createContext } from "react";

const AppContext = createContext<any | null>(null);

const AppContextProvider = ({ children }: any) => {
    const [parkingSlots, setParkingSlots] = useState<{}>({})
    const [parkingSize, setParkingSize] = useState<number>(0)

    return (
        <AppContext.Provider value={{ parkingSize, setParkingSize, parkingSlots, setParkingSlots }}>
            {children}
        </AppContext.Provider>
    )
};

export { AppContext, AppContextProvider }