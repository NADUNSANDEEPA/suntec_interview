package com.backend.backend.Service;

import org.springframework.stereotype.Service;

import com.backend.backend.Model.Customer;
import com.backend.backend.Repository.CustomerRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class CustomerService {
    
    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> getAllcustomers()
    {
        List<Customer> customers = new ArrayList<Customer>();
        customerRepository.findAll().forEach(customer1 -> customers.add(customer1));
        return customers;
    }

    public Customer getcustomersById(int id)
    {
        return customerRepository.findById(id).get();
    }

    public void saveOrUpdate(Customer customers)
    {
        customerRepository.save(customers);
    }

    public void delete(int id)
    {
        customerRepository.deleteById(id);
    }

    public void update(Customer customers, int bookid)
    {
        customerRepository.save(customers);
    }
}

