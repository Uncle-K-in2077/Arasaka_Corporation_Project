package com.ac.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ac.Entities.Account;
import com.ac.Entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
	Page<Order> findByIdLike(int id, Pageable pageable);

	List<Order> findByAccount(Account account, Sort sort);
	
	Order findById(int orderId);
}
