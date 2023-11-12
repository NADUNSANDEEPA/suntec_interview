package com.backend.backend.Repository;

import com.backend.backend.Model.Product;
import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer>
{
}