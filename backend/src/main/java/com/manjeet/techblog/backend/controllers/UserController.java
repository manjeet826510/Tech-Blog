package com.manjeet.techblog.backend.controllers;

import com.manjeet.techblog.backend.dto.SignInDto;
import com.manjeet.techblog.backend.dto.SignInResponseDto;
import com.manjeet.techblog.backend.dto.UserDto;
import com.manjeet.techblog.backend.services.UserService;
import com.manjeet.techblog.backend.advices.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://tech-blog-teal-kappa.vercel.app/") // Add this line
public class UserController {

    private final UserService userService;

    // Sign up user
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignInResponseDto>> signUpUser(@RequestBody UserDto userDto) {
        SignInResponseDto savedUserDto = userService.saveUser(userDto);
        return ResponseEntity.ok(new ApiResponse<>(savedUserDto));
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<SignInResponseDto>> signInUser(@RequestBody SignInDto signInDto) {
        SignInResponseDto response = userService.signIn(signInDto);
        return ResponseEntity.ok(new ApiResponse<>(response));
    }
}


