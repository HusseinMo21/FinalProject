import { createContext } from "react";

export const PaymentContext = createContext();

export default function PaymentContextProvider(props){

        



    return <PaymentContext.Provider value={{}}>
    {props.children}
    </PaymentContext.Provider>
}