package com.manjeet.techblog.backend.services.Impl;
import com.manjeet.techblog.backend.dto.BlogDto;
import com.manjeet.techblog.backend.entities.Blog;
import com.manjeet.techblog.backend.entities.User;
import com.manjeet.techblog.backend.exceptions.ResourceNotFoundException;
import com.manjeet.techblog.backend.repositories.BlogRepository;
import com.manjeet.techblog.backend.repositories.UserRepository;
import com.manjeet.techblog.backend.services.BlogService;
import com.manjeet.techblog.backend.utils.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;
    private final UserRepository userRepository;


    @Override
    public Page<BlogDto> getAllBlogs(String query, String sort, String order, int page, int size) {
        Pageable pageable = PageRequest.of(page, size,
                order.equalsIgnoreCase("asc") ? Sort.by(sort).ascending() : Sort.by(sort).descending());

        Page<Blog> blogs;
        if (query != null && !query.isEmpty()) {
            blogs = blogRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrUser_NameContainingIgnoreCase(
                    query, query, query, pageable);
        } else {
            blogs = blogRepository.findAll(pageable);
        }

        // Convert the Blog entities to BlogDto objects
        Page<BlogDto> blogDtos = blogs.map(blog -> {
            BlogDto dto = new BlogDto();
            dto.setId(blog.getId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setThumbnail(blog.getThumbnail());
            dto.setSlug(blog.getSlug());
            dto.setCreatedAt(blog.getCreatedAt());
            dto.setAuthor(blog.getUser().getName());
            dto.setAuthorImage(blog.getUser().getImage());
            return dto;
        });

        return blogDtos;
    }


    @Override
    public BlogDto findBlogBySlug(String slug) {
        Blog blog = blogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Blog not found for slug: " + slug));

        // Convert the Blog entity to BlogDto
        BlogDto dto = new BlogDto();
        dto.setId(blog.getId());
        dto.setTitle(blog.getTitle());
        dto.setContent(blog.getContent());
        dto.setThumbnail(blog.getThumbnail());
        dto.setSlug(blog.getSlug());
        dto.setCreatedAt(blog.getCreatedAt());
        dto.setAuthor(blog.getUser().getName());
        dto.setAuthorImage(blog.getUser().getImage());

        return dto;
    }


    @Override
    public Blog createBlog(BlogDto blogRequest, String email) {
        // Fetch the user from the database by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create the new Blog post
        Blog blog = new Blog();
        blog.setTitle(blogRequest.getTitle());
        blog.setContent(blogRequest.getContent());
        blog.setUser(user); // Associate the blog with the user
        blog.setThumbnail(blogRequest.getThumbnail());

        // Generate and set the slug
        String slug = SlugUtil.generateSlug(blogRequest.getTitle());
        blog.setSlug(slug);

        // Save the blog to the repository
        return blogRepository.save(blog);
    }

}
