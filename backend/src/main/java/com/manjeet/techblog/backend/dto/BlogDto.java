package com.manjeet.techblog.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BlogDto {
    private Long id;
    private String title;
    private String content;
    private String author;
    private String authorImage;
    private String thumbnail;
    private String slug;
    private Date createdAt;
}
