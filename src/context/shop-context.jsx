import React, { createContext, useState } from "react"
import { PRODUCTS } from "../products"

export const ShopContext = createContext(null)    





const getDefaultCart = () => {
    let cart = {}
    for(let i = 1; i<PRODUCTS.length+1; i++){
        cart[i] = 0
    }
    return cart
}





export const ShopContextProvider = (props) => {

const [cartItems, setCartItems] = useState(getDefaultCart)

const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems){    //item is just an id
        if(cartItems[item] > 0){ 
            let itemInfo = PRODUCTS.find((product) => product.id === Number(item) )
            totalAmount += cartItems[item] * itemInfo.price
        }
    }
    return totalAmount
}


const addToCart = (itemId) => {
    setCartItems ((prev)=>({...prev, [itemId]: prev[itemId]+1}))
}

const removeFromCart = (itemId) => {
    setCartItems ((prev)=>({...prev, [itemId]: prev[itemId]-1}))
}

const updateCartItemCount = (newAmount, itemId) => { 
    setCartItems ((prev)=>({...prev, [itemId]: newAmount}))
}


const contextValue = {cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount }

    return(
        <ShopContext.Provider  value = {contextValue} >
{props.children}
        </ShopContext.Provider>
    )
}




/* 
#1 create context
#2 wrap all you need with this context.Provider 
#3 set the state for a shop context provider and pass i as value
#3 {props.children}  this is the way to render the children 
#4 you have to wrap all the components which you want to have an access to the context  in our ShopContextProvider. 
   (in our case we just wrap the whole app component)
   #5 then each child will have an access to the context without passing it through the props. All you have to do to access the state
   is just call a hook useContext(passing in it the component context you want to get) 
   const {} = useContext(ShopContext)
*/