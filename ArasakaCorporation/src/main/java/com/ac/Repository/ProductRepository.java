package com.ac.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ac.Entities.Category;
import com.ac.Entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer>{
	Page<Product> findAllByNameLike(String name, Pageable pageable);

	Page<Product> findByPriceBetween(double min, double max, Pageable pageable);
	

	@Query("SELECT o FROM Product o WHERE o.name LIKE ?1")
	Page<Product> findByKeywords(String keywords, Pageable pageable);


	Page<Product> findByNameContainingAndPriceBetween(String name, double minPrice,
			double maxPrice, Pageable pageable);

	// Có thể hoàn toàn sử dụng một hàm dưới này để tìm cả hai trường hợp là có hoặc
	// k có tham số Category, chỉ cần phía controller truyền vào category.orElse(null) là được
	Page<Product> findByCategoryAndNameContainingAndPriceBetween(Category category, String name,
			double minPrice, double maxPrice, Pageable pageable);
}
