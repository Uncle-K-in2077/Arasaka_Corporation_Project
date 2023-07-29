package com.ac.ApiController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getCategoryById(@PathVariable("id") int id){
		try {
			Optional<Category> category = categoryRepository.findById(id);
			if(category.isPresent()) {
				CategoryDTO dto = CategoryConverter.toDTO(category.get());
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
	
}
