package com.backend.backend.controller;

import com.backend.backend.Model.Cart;

class CartItemWithTotalPrice {
        private Cart cartItem;
        private double totalPrice;

        // Default constructor
        public CartItemWithTotalPrice() {
        }
    
        public CartItemWithTotalPrice(Cart cartItem2, double totalPrice) {
            this.cartItem = cartItem2;
            this.totalPrice = totalPrice;
        }
    
        public Cart getCartItem() {
            return cartItem;
        }
    
        public void setCartItem(Cart cartItem) {
            this.cartItem = cartItem;
        }
    
        public double getTotalPrice() {
            return totalPrice;
        }  
    }