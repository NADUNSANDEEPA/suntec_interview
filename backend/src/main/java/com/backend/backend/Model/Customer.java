package com.backend.backend.Model;

import java.sql.Timestamp;
import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;


@Entity
public class Customer {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cusid;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String email;

    @Column(length = 10)
    private String telephoneNumber;

    @Column
    private String address;

    @Column
    private String gender;

    @Column
    private String nicNumber;

    @Column
    private String password;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    // Default constructor
    public Customer() {
    }

    // Parameterized constructor
    public Customer(String fullName, String email, String telephoneNumber, String address,
            String gender, String nicNumber, String password, Timestamp createdAt) {
        this.name = fullName;
        this.email = email;
        this.telephoneNumber = telephoneNumber;
        this.address = address;
        this.gender = gender;
        this.nicNumber = nicNumber;
        this.password = password;
        this.createdAt = createdAt;
    }

    // Getters and Setters
    public int getCustomertid() {
        return cusid;
    }

    public void setCustomerid(int cusid) {
        this.cusid = cusid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(String telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNicNumber() {
        return nicNumber;
    }

    public void setNicNumber(String nicNumber) {
        this.nicNumber = nicNumber;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
