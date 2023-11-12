package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}
