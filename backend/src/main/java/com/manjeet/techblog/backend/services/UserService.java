package com.manjeet.techblog.backend.services;

import com.manjeet.techblog.backend.dto.SignInDto;
import com.manjeet.techblog.backend.dto.SignInResponseDto;
import com.manjeet.techblog.backend.dto.UserDto;
import com.manjeet.techblog.backend.entities.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    SignInResponseDto saveUser(UserDto userDto);

    SignInResponseDto signIn(SignInDto signInDto);

    User findByEmail(String email);
}
