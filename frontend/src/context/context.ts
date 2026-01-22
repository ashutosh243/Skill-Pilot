import React, { createContext } from "react";

export type authState = {
    isAuthenticated: boolean,
    user: { id: string } | null,
    loading: boolean
}
export interface authContextType{
    auth:authState,
    setAuth:React.Dispatch<React.SetStateAction<authState>>
}
export const authcontext = createContext<authContextType | null>(null);