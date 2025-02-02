package com.manjeet.techblog.backend.controllers;

import com.manjeet.techblog.backend.advices.ApiResponse;
import com.manjeet.techblog.backend.dto.BlogDto;
import com.manjeet.techblog.backend.entities.Blog;
import com.manjeet.techblog.backend.entities.User;
import com.manjeet.techblog.backend.services.BlogService;
import com.manjeet.techblog.backend.services.UserService;
import com.manjeet.techblog.backend.utils.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000") // Add this line
public class BlogController {

    private final BlogService blogService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserService userService;
    // Maximum allowed size for the blogs
    private static final int MAX_SIZE = 10;

    // Fetch all blogs with pagination and filtering (optional)
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BlogDto>>> getAllBlogs(
            @RequestParam(required = false) String query,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "asc") String order,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        if (size > MAX_SIZE) {
            throw new IllegalArgumentException("The requested size exceeds the maximum limit of " + MAX_SIZE);
        }

        Page<BlogDto> blogs = blogService.getAllBlogs(query, sort, order, page, size);
        return ResponseEntity.ok(new ApiResponse<>(blogs));
    }

    // Fetch a blog by slug
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BlogDto>> getBlogBySlug(@PathVariable String slug) {
        BlogDto blog = blogService.findBlogBySlug(slug);
        return ResponseEntity.ok(new ApiResponse<>(blog));
    }

    @PostMapping
    public ResponseEntity<?> createBlog(@RequestBody BlogDto blogRequest, HttpServletRequest request) {
        // Extract token from Authorization header
        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String token = header.substring(7); // Remove 'Bearer ' prefix
        String email = jwtTokenUtil.getEmailFromJwtToken(token); // Extract user email from token

        // Call the service to create the blog
        Blog blog = blogService.createBlog(blogRequest, email);

        return ResponseEntity.status(201).body(blog);
    }
}
