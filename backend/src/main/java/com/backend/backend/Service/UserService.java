package com.backend.backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.backend.Model.User;
import com.backend.backend.Repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    public void saveOrUpdate(User users)
    {
        userRepository.save(users);
    }
}
