package com.ac.DTO;

import lombok.Data;

@Data
public class Output<T> {
	private String tableName;
	private int page;
	private int limit;
	private int totalPages;
	private T data;
}
