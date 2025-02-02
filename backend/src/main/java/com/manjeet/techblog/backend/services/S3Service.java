package com.manjeet.techblog.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface S3Service {
    String uploadFile(MultipartFile image, String image1);
}
