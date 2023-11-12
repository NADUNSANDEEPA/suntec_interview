package com.backend.backend.Repository;

import org.springframework.data.repository.CrudRepository;
import com.backend.backend.Model.Cart;

public interface CartRepository extends CrudRepository<Cart, Integer>
{
}
