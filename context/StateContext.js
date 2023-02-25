import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from "react-hot-toast"

const Context = createContext();
export const StateContext = ({ children }) => {
    const [showCart, setShowChart] = useState();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    const onAdd = (product,quantity) => {
        setTotalPrice((prev) => prev + product.price * quantity)
        setTotalQuantities((prev) => prev + quantity)
        const checkProductInCart = cartItems.find((item) => item._id == product._id);
        if (checkProductInCart) {
            
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id == product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity,
                }
            })
            setCartItems(updatedCartItems);
            toast.success(`${qty} ${product.name} added to the cart`)
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}])
        }
    }

    const incQty = () => {
        setQty((prev) => prev + 1);
    }
    const decQty = () => {
        setQty((prev) => {
            if (prev - 1 < 1) return 1;

            return prev - 1;
        })
    }

    return (
        <Context.Provider value={{
            showCart, cartItems
        ,totalPrice,totalQuantities,qty,incQty,decQty,onAdd}}>
           {children}
        </Context.Provider>
    )
}
export const useStateContext = () =>  useContext(Context)