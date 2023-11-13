package com.backend.backend.Repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.backend.Model.Order;

public interface OrderRepository extends CrudRepository<Order, Integer>
{
   
}