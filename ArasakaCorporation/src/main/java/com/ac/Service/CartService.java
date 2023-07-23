package com.ac.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ac.DTO.CartItem;

@Service
public interface CartService {
	void add(int id);

	void remove(int id);

	void update(int id, int quantity);

	void clear();

	int getCount();

	double getAmount();

	List<CartItem> getList();
}
