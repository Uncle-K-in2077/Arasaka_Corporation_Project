package com.ac.Converter;

import org.springframework.stereotype.Component;

import com.ac.DTO.CategoryDTO;
import com.ac.Entities.Category;

@Component
	public class CategoryConverter {
	public CategoryDTO toDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO();
        categoryDTO.setId(category.getId());
        categoryDTO.setName(category.getName());
        categoryDTO.setStatus(category.getStatus());
        // Không chuyển đổi danh sách sản phẩm để tránh lặp vô hạn
        return categoryDTO;
    }

    public Category toEntity(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setName(categoryDTO.getName());
        category.setStatus(categoryDTO.getStatus());
        // Không chuyển đổi danh sách sản phẩm để tránh lặp vô hạn
        return category;
    }
}
