package com.backend.backend.controller;

import com.backend.backend.Model.Product;
import com.backend.backend.Service.ProductService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/save_product")
    private ResponseEntity<Integer> saveProduct(@RequestBody Product product) {
        try {
            productService.saveOrUpdate(product);
            return new ResponseEntity<>(product.getProductid(), HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get_all_products")
    private ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/get_product/{id}")
    private ResponseEntity<Product> getProduct(@PathVariable int id) {
        Product product = productService.getProductsById(id);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update_product/{id}")
    private ResponseEntity<String> updateProduct(@PathVariable("id") Long productid, @RequestBody Product product) {
        try {
            productService.saveOrUpdate(product);
            return new ResponseEntity<>("Product updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @DeleteMapping("/delete_product/{id}")
    private ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        try {
            productService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            // Log the exception or handle it accordingly
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
