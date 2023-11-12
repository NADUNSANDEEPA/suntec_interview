package com.backend.backend.Service;

import com.backend.backend.Model.Product;
import com.backend.backend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProducts()
    {
        List<Product> products = new ArrayList<Product>();
        productRepository.findAll().forEach(books1 -> products.add(books1));
        return products;
    }

    public Product getProductsById(int id)
    {
        return productRepository.findById(id).get();
    }

    public void saveOrUpdate(Product products)
    {
        productRepository.save(products);
    }

    public void delete(int id)
    {
        productRepository.deleteById(id);
    }

    public void update(Product products, int bookid)
    {
        productRepository.save(products);
    }
}
