package com.ac.DTO;

import lombok.Data;

@Data
public class LoginResponse {
	AccountDTO account;
	String token;
}
