package com.backend.backend.controller;

import com.backend.backend.Model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.Service.CustomerService;


@RestController
@RequestMapping("/customer")
public class CustomerController {
    
    @Autowired
    CustomerService cusService;
    

    @PostMapping("/register")
    public ResponseEntity<Integer> saveCustomer(@RequestBody Customer customer) {
        try {
            String encryptedPassword = encryptPassword(customer.getPassword());
            customer.setPassword(encryptedPassword);
            cusService.saveOrUpdate(customer);
            return new ResponseEntity<>(customer.getCustomertid(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private String encryptPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
