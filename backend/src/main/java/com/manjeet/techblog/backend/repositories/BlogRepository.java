package com.manjeet.techblog.backend.repositories;

import com.manjeet.techblog.backend.entities.Blog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {

    Page<Blog> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCaseOrUser_NameContainingIgnoreCase(
            String title, String content, String author, Pageable pageable);

    Optional<Blog> findBySlug(String slug);
}
