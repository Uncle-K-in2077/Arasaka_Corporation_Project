package com.ac.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ac.DTO.ProductDTO;
import com.ac.Entities.Product;
import com.ac.Repository.CategoryRepository;
import com.ac.Repository.ProductRepository;

@Component
public class ProductConverter {
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	public Product toEntity(ProductDTO DTO) {
		Product item = productRepository.findById(DTO.getId()).orElse(new Product());
		item.setQuantity(DTO.getQuantity());
		item.setCreatedAt(parseDate(DTO.getCreatedAt()));
		item.setDescription(DTO.getDescription());
		item.setImage(DTO.getImage());
		item.setSaleStatus(DTO.getSaleStatus());
		item.setName(DTO.getName());
		item.setPrice(DTO.getPrice());
		item.setStatus(DTO.getStatus());
		item.setCategory(categoryRepository.findById(DTO.getCategoryId()).orElse(null));
	
		return item;
	}
	
	public ProductDTO toDTO(Product entity) {
		ProductDTO dto = new ProductDTO();
		
        dto.setId(entity.getId());
        dto.setQuantity(entity.getQuantity());
        dto.setCreatedAt(formatDate(entity.getCreatedAt()));
        dto.setDescription(entity.getDescription());
        dto.setImage(entity.getImage());
        dto.setSaleStatus(entity.getSaleStatus());
        dto.setName(entity.getName());
        dto.setPrice(entity.getPrice());
        dto.setStatus(entity.getStatus());
        dto.setCategoryId(entity.getCategory().getId());
        return dto;
	}
	
	// Chuyển đổi kiểu Date thành String
	private static String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        return dateFormat.format(date);
    }

    // Chuyển đổi kiểu String thành Date
    private Date parseDate(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
}
