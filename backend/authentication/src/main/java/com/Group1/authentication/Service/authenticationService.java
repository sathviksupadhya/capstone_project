package com.Group1.authentication.Service;

import com.Group1.authentication.Model.authentication;
import com.Group1.authentication.Repository.authenticationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

public class authenticationService {

    @Autowired
    private authenticationRepo authrepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public authentication register(authentication auth) {
        auth.setPassword(passwordEncoder.encode(auth.getPassword()));
        return authrepo.save(auth);
    }

}
