package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.backend.backend.Model.User;
import com.backend.backend.Service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    UserService userService;

    @PostMapping("/userregister")
    public ResponseEntity<Integer> saveCustomer(@RequestBody User user) {
        try {
            // Encrypt the password before saving the user
            String encryptedPassword = encryptPassword(user.getPassword());
            user.setPassword(encryptedPassword);
    
            userService.saveOrUpdate(user);
            return new ResponseEntity<>(user.getUserid(), HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
       return "";
    }
    
    //password encrypt function
    private String encryptPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }
}
