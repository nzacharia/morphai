import React, { createContext, useState } from "react"

import { SetStateAction } from "react"
import { Dispatch } from "react"
import { AppNodeMissingInputs } from "../../types/appNode"


type FlowValidationContextType = {
    invalidInputs: AppNodeMissingInputs[]
    setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>
    clearErrors:()=>void
}

export const FlowValidationContext = createContext<FlowValidationContextType | undefined>(undefined)

export function FlowValidationContextProvider({children}:{children:React.ReactNode}){
    const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>([])
    const clearErrors = ()=>{
        setInvalidInputs([])
    }
    return <FlowValidationContext.Provider value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors
    }}>
        {children}
        </FlowValidationContext.Provider>
}