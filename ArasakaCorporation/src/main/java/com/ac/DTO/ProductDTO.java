package com.ac.DTO;


import lombok.Data;

@Data
public class ProductDTO {
	private int id;
    private String createdAt;
    private String description;
    private String image;
    private String name;
    private double price;
    private int quantity;
    private int saleStatus;
    private int status;
    private int categoryId;
}
