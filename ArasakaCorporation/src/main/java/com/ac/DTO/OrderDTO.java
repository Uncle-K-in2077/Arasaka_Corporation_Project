package com.ac.DTO;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class OrderDTO {
	private int id;
    private String address;
    private double amount;
    private Date createdAt;
    private String note;
    private String phone;
    private int status;
    private List<OrderDetailDTO> orderDetails;
    private int accountId;
    private String accountName;
    private String email;
}
