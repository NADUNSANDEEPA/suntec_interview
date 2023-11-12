package com.backend.backend.Service;

import org.springframework.stereotype.Service;

import com.backend.backend.Model.Cart;
import com.backend.backend.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CartService {
    
    
    @Autowired
    CartRepository cartRepository;

    public void saveOrUpdate(Cart carts)
    {
        cartRepository.save(carts);
    }
}
