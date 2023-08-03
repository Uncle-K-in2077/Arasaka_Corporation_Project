package com.ac.ApiController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.loader.custom.Return;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ac.ApiController.ProductController.ErrorResponse;
import com.ac.Converter.CategoryConverter;
import com.ac.DTO.CategoryDTO;
import com.ac.Entities.Category;
import com.ac.Repository.CategoryRepository;


@RestController
@RequestMapping("/api/category")
@CrossOrigin
public class CategoryController {
	
	public class ErrorResponse {
		private String message;

		public ErrorResponse(String message) {
			this.message = message;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}
	
	@Autowired
	CategoryRepository categoryRepository;
	
	
	@Autowired
	HttpServletRequest request;
	
	@Autowired
	CategoryConverter categoryConverter;
	
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
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getCategoryById(@PathVariable("id") int id){
		try {
			Optional<Category> category = categoryRepository.findById(id);
			if(category.isPresent()) {
				CategoryDTO dto = categoryConverter.toDTO(category.get());
				return new ResponseEntity<>(dto, HttpStatus.OK);
			}else {
				ErrorResponse errorResponse = new ErrorResponse("No product found!");
				return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
			}
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping()
	public ResponseEntity<?> createCategory(@RequestBody CategoryDTO item){
		try {
			Category newCategory = categoryConverter.toEntity(item);
			Category saveCategory = categoryRepository.save(newCategory);
			return new ResponseEntity<>(categoryConverter.toDTO(saveCategory), HttpStatus.CREATED);	
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}	
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateVategory(@PathVariable("id") int id, @RequestBody CategoryDTO categoryDTO){
		try {
			Optional<Category> category = categoryRepository.findById(id);
			if(category.isPresent()) {
				Category updateCategory = category.get();
				
				if(categoryDTO.getName().equals("") || categoryDTO.getName().isEmpty() || categoryDTO.getName().isBlank()) {
					updateCategory.setName(category.get().getName());
				}else {					
					updateCategory.setName(categoryDTO.getName());
				}
				updateCategory.setStatus(categoryDTO.getStatus());
				
				Category updatedCategory = categoryRepository.save(updateCategory);
				return new ResponseEntity<>(categoryConverter.toDTO(updatedCategory), HttpStatus.OK);
			}else {
				ErrorResponse errorResponse = new ErrorResponse("No category found!");
	            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);

			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
