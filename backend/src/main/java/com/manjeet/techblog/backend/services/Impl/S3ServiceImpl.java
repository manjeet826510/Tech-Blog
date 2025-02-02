package com.manjeet.techblog.backend.services.Impl;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.manjeet.techblog.backend.services.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    // Inject AWS credentials and other config values from application.properties or application.yml
    @Value("${aws.accessKeyId}")
    private String awsAccessKeyId;

    @Value("${aws.secretAccessKey}")
    private String awsSecretAccessKey;

    @Value("${aws.region}")
    private String awsRegion;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private final AmazonS3 s3Client;

    // No need for this constructor anymore since @RequiredArgsConstructor will inject dependencies
    // @Autowired (Optional) constructor is not needed.

    @Override
    public String uploadFile(MultipartFile file, String fileName) {
        try {
            // Generate a unique file name by appending a random number (or timestamp)
            String uniqueFileName = generateUniqueFileName(fileName);

            // Convert MultipartFile to InputStream
            InputStream inputStream = file.getInputStream();

            // Prepare metadata (optional)
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(file.getSize());

            // Create a request to upload the file to S3
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, uniqueFileName, inputStream, metadata);

            // Upload the file to the S3 bucket
            s3Client.putObject(putObjectRequest);

            // Return the unique S3 URL
            return s3Client.getUrl(bucketName, uniqueFileName).toString();
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file to S3", e);
        } catch (AmazonServiceException e) {
            throw new RuntimeException("Error while interacting with S3", e);
        }
    }

    // Method to generate a unique file name
    private String generateUniqueFileName(String originalFileName) {
        // Get the current timestamp or a random number to append to the file name
        String uniqueSuffix = String.valueOf(System.currentTimeMillis()); // or use UUID.randomUUID().toString() for more uniqueness
        return originalFileName + "-" + uniqueSuffix;
    }

}
