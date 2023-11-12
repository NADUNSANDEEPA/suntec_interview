package com.backend.backend.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.backend.backend.Model.Cart;

public interface CartRepository extends CrudRepository<Cart, Integer>
{
    List<Cart> findByCusAndStatus(String cus, String status);
}
