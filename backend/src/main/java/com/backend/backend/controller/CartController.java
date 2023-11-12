package com.backend.backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Model.Cart;
import com.backend.backend.Service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {
    
    @Autowired
    CartService cartService;

    @PostMapping("/save")
    public ResponseEntity<Integer> saveCustomer(@RequestBody Cart cart) {
        try {
            cartService.saveOrUpdate(cart);
            return new ResponseEntity<>(cart.getCartid(), HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getItems/{cusId}")
    public List<CartItemWithTotalPrice> getItemsByCustomer(@PathVariable String cusId) {
        List<Cart> cartItems = cartService.getItemsByCustomerAndStatus(cusId, "bought");
        
        List<CartItemWithTotalPrice> itemsWithTotalPrice = cartItems.stream()
                .map(cartItem -> {
                    double totalPrice = calculateTotalPrice(cartItem);
                    return new CartItemWithTotalPrice(cartItem, totalPrice);
                })
                .collect(Collectors.toList());

        return itemsWithTotalPrice;
    }

    private double calculateTotalPrice(Cart cartItem) {
        // Perform the calculation based on quantity and price
        int quantity = cartItem.getQuantity();
        double price = Double.parseDouble(cartItem.getPrice());

        return quantity * price;
    }

    @GetMapping("/calTotalPrice/{cusId}")
    public ResponseEntity<Double> calculateTotalPrice(@PathVariable String cusId) {
        try {
            List<Cart> items = cartService.getItemsByCustomerAndStatus(cusId , "bought");

            // Calculate total price from the list of items
            double totalPrice = items.stream()
            .mapToDouble(item -> Double.parseDouble(item.getPrice()) * item.getQuantity())
            .sum();

            return ResponseEntity.ok(totalPrice);
        } catch (Exception e) {
            // Handle exceptions and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    
    @DeleteMapping("/delete_cart_item/{id}")
    private ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        try {
            cartService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}

