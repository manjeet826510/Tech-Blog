package com.manjeet.techblog.backend.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class SlugUtil {

    public static String generateSlug(String title) {
        String slug = title.trim().toLowerCase();
        slug = Normalizer.normalize(slug, Normalizer.Form.NFD); // Remove accents
        slug = slug.replaceAll("[^a-z0-9\\s-]", ""); // Remove non-alphanumeric characters
        slug = slug.replaceAll("[\\s-]+", "-"); // Replace spaces and hyphens with a single hyphen
        slug = slug.replaceAll("^-|-$", ""); // Remove leading/trailing hyphens
        return slug;
    }
}
