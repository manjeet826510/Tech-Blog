package com.manjeet.techblog.backend.services;

import com.manjeet.techblog.backend.dto.BlogDto;
import com.manjeet.techblog.backend.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public interface BlogService {
    Page<BlogDto> getAllBlogs(String query, String sort, String order, int page, int size);

    BlogDto findBlogBySlug(String slug);

    Blog createBlog(BlogDto blogRequest, String email);
}

