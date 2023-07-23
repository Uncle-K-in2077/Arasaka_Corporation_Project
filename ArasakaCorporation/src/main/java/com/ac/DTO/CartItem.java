package com.ac.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItem {
	int id;
	String name;
	String image;
	double price;
	int quantity = 1;
}
