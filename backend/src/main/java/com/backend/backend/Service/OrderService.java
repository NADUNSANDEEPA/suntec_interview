package com.backend.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.Model.Order;
import com.backend.backend.Repository.OrderRepository;

@Service
public class OrderService {
    
      
    @Autowired
    OrderRepository orderRepository;

      public void saveOrUpdate(Order orders)
    {
        orderRepository.save(orders);
    }

}
