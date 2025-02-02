package com.manjeet.techblog.backend.services.Impl;

import com.manjeet.techblog.backend.dto.SignInDto;
import com.manjeet.techblog.backend.dto.SignInResponseDto;
import com.manjeet.techblog.backend.dto.UserDto;
import com.manjeet.techblog.backend.entities.User;
import com.manjeet.techblog.backend.repositories.UserRepository;
import com.manjeet.techblog.backend.services.UserService;
import com.manjeet.techblog.backend.utils.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;
    private final JwtTokenUtil jwtTokenUtil;

    @Override
    public SignInResponseDto saveUser(UserDto userDto) {
        // Map DTO to entity
        User user = modelMapper.map(userDto, User.class);

        // Encrypt the password using PasswordEncoder
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Generate the JWT token after user is saved
        String jwtToken = jwtTokenUtil.generateToken(savedUser);  // Generate the JWT token

        // Map the saved user entity back to DTO
        SignInResponseDto responseDto = new SignInResponseDto();
        responseDto.setName(savedUser.getName());
        responseDto.setImage(savedUser.getImage());
        responseDto.setJwtToken(jwtToken);  // Set the token here

        return responseDto;
    }

    @Override
    public SignInResponseDto signIn(SignInDto signInDto) {
        User user = userRepository.findByEmail(signInDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Check if the password matches
        if (!passwordEncoder.matches(signInDto.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtTokenUtil.generateToken(user);

        return new SignInResponseDto(user.getName(), user.getImage(), token);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }


}
