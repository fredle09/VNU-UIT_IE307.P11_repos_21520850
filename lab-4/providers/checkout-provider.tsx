import { createContext, PropsWithChildren, useState } from "react"

const CheckoutContext = createContext({});



export default function CheckoutProvider({ children }: PropsWithChildren) {
  const [checkout, setCheckout] = useState([]);
  return (
    <CheckoutContext.Provider value={{}}>
      {children}
    </CheckoutContext.Provider>
  )
};
