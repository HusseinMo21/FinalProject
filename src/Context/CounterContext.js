import { createContext } from "react";

export let CounterContext=createContext();

export default function CounterContextProvider(props){

    let x=10
    return <CounterContext.Provider value={x}>
    {props.children}
    </CounterContext.Provider>
};