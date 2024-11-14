import { useReducer, useState } from "react";
import { createContext } from "react"
import { useEffect } from "react";

export const CartContext = createContext({
    items: [],
    products: [],
    loading: false,
    error:"",
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

export default function CartContextProvider({children}){

    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            const response = await fetch("https://dummyjson.com/products/category/womens-bags?limit=12&select=id,thumbnail,title,price,description");
            if (response.ok) {
                const result = await response.json();
                setProducts(result.products);
            } else {
                setError("Fetch FAILED!");
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    //shopping cart: 

    function cartReducer(state, action){
if (action.type === "ADD_ITEM"){
const updatedItems = [...state.items];

const existingCartItemIndex = updatedItems.findIndex(
(Item) => Item.id === action.payload.id
);

const existingCartItem = updatedItems[existingCartItemIndex];

if(existingCartItem) {
    const updatedItem =  {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
    }

    updatedItems[existingCartItemIndex] = updatedItem;
} else {
    const product= action.payload.products.find(
        (product) => product.Item === action.payload.id
    );
    updatedItems.push({
        id: action.payload.id,
        thumbnail: product.thumbnail,
        title: product.title,
        pric: product.price,
        quantity: 1,

    });

}

return { items: updatedItems};

}


if( action.type === "UPDATE_ITEM"){
    const updatedItems = [...state.items];

    const updatedItemIndex = updaetdItem.findIndex(
        (Item) => Item.id=== action.payload.id
    );

    const updatedItem = {...updatedItems[updatedItemIndex]};
    updatedItem.quantity += action.payload.amount;

    if(updatedItem.quantity < 1){
        updatedItems.splice(updatedItemIndex, 1);
    } else{
        updatedItems[updatedItemIndex] = updatedItem;
    }
    
    return{...state, Items: updatedItem};

}

return state;
    }

    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        {Items: [] }
    );

function handleAddItemToCart(id){
    cartDispatch({
        type: "ADD_ITEM",
        payload: { id, products }
    });
}

function handleUpdateCartItemQuantity(id, amount){
    cartDispatch({
        type: "UPDATE_ITEM",
        payload: {id, amount}
    });
}

const ctx = {
    items: cartState.Items,
    products: products,
    loading: loading,
    error: error,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity

};

return <CartContext.Provider value={ctx}>
    {children}
</CartContext.Provider>

}



