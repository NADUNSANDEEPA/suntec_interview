package com.backend.backend.Repository;

import org.springframework.data.repository.CrudRepository;

import com.backend.backend.Model.User;

public interface UserRepository extends CrudRepository<User, Integer>
{
}