package com.backend.backend.Model;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Order {
    
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderid;

    @Column(length = 255)
    private String cus;

    @Column
    private double tprice;

    @Column(length = 255)
    private String item_list;

    
    @Column(length = 255)
    private String status;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    public Order(){
    }

    public int getOrderid() {
        return orderid;
    }

    public void setOrderid(int orderid) {
        this.orderid = orderid;
    }

    public String getCus() {
        return cus;
    }

    public void setCus(String cus) {
        this.cus = cus;
    }

    public double getPrice() {
        return tprice;
    }

    public void setPrice(double tprice) {
        this.tprice = tprice;
    }

    public String getItem_list() {
        return item_list;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    
    public String getStatus() {
        return status;
    }

    public void setItem_list(String item_list) {
        this.item_list = item_list;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

}
