package com.ac.ApiController;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.CategoryConverter;
import com.ac.DTO.CategoryDTO;
import com.ac.Entities.Category;
import com.ac.Repository.CategoryRepository;


@RestController
@RequestMapping("/api/category")
public class CategoryController {
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	CategoryConverter categoryConverter;
	
	@Autowired
	HttpServletRequest request;
	
	@GetMapping()
	public List<CategoryDTO> index(Model model) {
		List<Category> categoryList = categoryRepository.findAll();
		List<CategoryDTO> listDTO = new ArrayList<>();
		if(categoryList.size()>0) {
			for(Category item : categoryList) {
				listDTO.add(categoryConverter.toDTO(item));
			}
		}
		
		return listDTO;
	}
}
