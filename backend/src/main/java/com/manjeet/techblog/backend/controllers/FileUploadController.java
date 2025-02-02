package com.manjeet.techblog.backend.controllers;

import com.manjeet.techblog.backend.advices.ApiError;
import com.manjeet.techblog.backend.advices.ApiResponse;
import com.manjeet.techblog.backend.services.S3Service;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FileUploadController {

    private final S3Service s3Service;

    @PostMapping
    public ResponseEntity<ApiResponse<ImageUrlDto>> uploadImage(@RequestParam("image") MultipartFile image) {
        String imageUrl = s3Service.uploadFile(image, "image");
        return ResponseEntity.ok(new ApiResponse<>(new ImageUrlDto(imageUrl)));
    }


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ImageUrlDto {
        private String url;
    }
}
