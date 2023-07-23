package com.ac.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ac.Entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer>{
	
}
