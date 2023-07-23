package com.ac.ApiController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.ProductConverter;
import com.ac.DTO.Output;
import com.ac.DTO.ProductDTO;
import com.ac.Entities.Category;
import com.ac.Entities.Product;
import com.ac.Repository.CategoryRepository;
import com.ac.Repository.ProductRepository;
import com.ac.Service.JWTService;



@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {
	
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
	ProductRepository productRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	HttpServletRequest request;

	@Autowired
	JWTService jwtService;

	@Autowired
	ProductConverter productConverter;

	private final static String TOKEN_HEADER = "authorization";

	@GetMapping()
	public ResponseEntity<Output<List<ProductDTO>>> getAllProduct(
			@RequestParam(value = "keyword", defaultValue = "") String keyword,
			@RequestParam(value = "page", defaultValue = "1") int page,
			@RequestParam(value = "limit", defaultValue = "12") int limit,
			@RequestParam(value = "category_id", defaultValue = "0") int categoryId,
			@RequestParam(value = "order_by", defaultValue = "desc") String orderBy,
			@RequestParam(value = "sort_by", defaultValue = "price") String sortBy,
			@RequestParam(value = "range", defaultValue = "mọi khoảng giá") String rangeOption) {

		String path = request.getRequestURI();
		String method = request.getMethod();
		HttpServletRequest httpRequest = (HttpServletRequest) request;

		String authToken = httpRequest.getHeader(TOKEN_HEADER);
		System.out.println(jwtService.validateTokenLogin(authToken));
		if (jwtService.validateTokenLogin(authToken) == false) {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}

		try {
			if (page < 1) {
				page = 1;
			}

			double min = Double.MIN_VALUE;
			double max = Double.MAX_VALUE;

			switch (rangeOption) {
			case "0-5":
				// Dưới 5 triệu
				min = 0;
				max = 4999999;
				break;
			case "5-10":
				// 5 - 10 triệu
				min = 5000000;
				max = 10000000;
				break;
			case "10-15":
				// 10 - 15 triệu
				min = 10000000;
				max = 15000000;
				break;
			case "15-20":
				// 15 - 20 triệu
				min = 15000000;
				max = 20000000;
				break;
			case "20-25":
				// 20tr - 25tr
				min = 20000000;
				max = 25000000;
				break;
			case "25+":
				// over 25tr
				min = 25000000;
				max = Double.MAX_VALUE;
				break;
			case "0":
				// All range
				min = Double.MIN_VALUE;
				max = Double.MAX_VALUE;
				break;
			default:
				break;
			}

			// Lấy Category
			Optional<Category> category = categoryRepository.findById(categoryId);

			Pageable pageable = PageRequest.of(page - 1, limit,
					Sort.by(orderBy.equals("DESC") ? Direction.DESC : Direction.ASC, sortBy));

			Page<Product> pageProduct = null;

			if (category.isEmpty()) {
				// Lấy tất cả các product theo tất cả category
				pageProduct = productRepository.findByNameContainingAndStatusAndPriceBetween(keyword, 1, min, max,
						pageable);
			} else {
				// Lấy product theo riêng category
				pageProduct = productRepository.findByCategoryAndNameContainingAndStatusAndPriceBetween(category.get(),
						keyword, 1, min, max, pageable);
			}

			if (pageProduct.getContent().size() == 0) {
				System.out.println("no product found");
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			Output<List<ProductDTO>> item = new Output<List<ProductDTO>>();
			List<ProductDTO> DTOs = new ArrayList<>();
			for (Product items : pageProduct.getContent()) {
				DTOs.add(productConverter.toDTO(items));
			}
			item.setData(DTOs);
			item.setLimit(limit);
			item.setPage(page);
			item.setTableName("Products");
			item.setTotalPages(pageProduct.getTotalPages());
			return new ResponseEntity<>(item, HttpStatus.OK);

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//	@GetMapping("/{id}")
//	public ResponseEntity<ProductDTO> getProductById(@PathVariable("id") int id) {
//		try {
//			Optional<Product> product = productRepository.findById(id);
//			if (product.isPresent()) {
//				ProductDTO dto = productConverter.toDTO(product.get());
//				return new ResponseEntity<>(dto, HttpStatus.OK);
//			} else {
//				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//			}
//		} catch (Exception e) {
//			System.out.println(e.getMessage());
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getProductById(@PathVariable("id") int id) {
	    try {
	        Optional<Product> product = productRepository.findById(id);
	        if (product.isPresent()) {
	            ProductDTO dto = productConverter.toDTO(product.get());
	            return new ResponseEntity<>(dto, HttpStatus.OK);
	        } else {
	            ErrorResponse errorResponse = new ErrorResponse("No product found!");
	            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}


	@PutMapping("/{id}")
	public ResponseEntity<ProductDTO> updateProduct(@PathVariable("id") int id, @RequestBody ProductDTO dto) {

		boolean exists = productRepository.existsById(id);

		if (exists) {
			Product product = productRepository.save(productConverter.toEntity(dto));
			return new ResponseEntity<>(productConverter.toDTO(product), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable("id") int id) {
	    try {
	        Optional<Product> product = productRepository.findById(id);
	        if (product.isPresent()) {
	            Product existingProduct = product.get();
	            existingProduct.setStatus(0);
	            productRepository.save(existingProduct);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	        } else {
	            ErrorResponse errorResponse = new ErrorResponse("Product not found");
	            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@PutMapping("/{id}/restore")
	public ResponseEntity<?> restoreProduct(@PathVariable("id") int id) {
	    try {
	        Optional<Product> product = productRepository.findById(id);
	        if (product.isPresent()) {
	            Product existingProduct = product.get();
	            existingProduct.setStatus(1);
	            productRepository.save(existingProduct);
	            return new ResponseEntity<>(HttpStatus.OK);
	        } else {
	            ErrorResponse errorResponse = new ErrorResponse("Product not found");
	            return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
	        }
	    } catch (Exception e) {
	        System.out.println(e.getMessage());
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}



	@PostMapping
	public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO item) {
		try {
			Product product = productConverter.toEntity(item);
			Product saved = productRepository.save(product);
			System.out.println(saved.getId());
			return new ResponseEntity<>(productConverter.toDTO(saved), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
}
