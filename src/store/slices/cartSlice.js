import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCartOpen: false,
    cartItems: []
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        toggleCart(state, action) {
            state.isCartOpen = action.payload;
        },


        addItem(state, action) {
            const newItemId = action.payload.id;
            const existingItem = state.cartItems.find(item => item.id === newItemId);
        
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 }); // Initialize quantity for new item
            }
        },
        

        removeItem(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },


        incrementItem(state, action) {
            const itemId = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.id === itemId);
        
            if (itemToUpdate) {
                itemToUpdate.quantity++;
            }
        },
        

        decrementItem(state, action) {
            const itemId = action.payload;
            const itemToUpdate = state.cartItems.find(item => item.id === itemId);
        
            if (itemToUpdate) {
                itemToUpdate.quantity--;
                if (itemToUpdate.quantity === 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== itemId);
                }
            }
        }
    }
    });

export const { toggleCart, addItem, removeItem, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;