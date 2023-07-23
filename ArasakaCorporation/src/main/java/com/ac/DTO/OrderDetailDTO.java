package com.ac.DTO;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
	 private int id;
	    private int quantity;
	    private double salePrice;
	    private OrderDTO order;
	    private ProductDTO product;
	    
}
