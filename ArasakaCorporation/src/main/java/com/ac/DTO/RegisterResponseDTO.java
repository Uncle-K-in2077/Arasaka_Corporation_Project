package com.ac.DTO;

import lombok.Data;

@Data
public class RegisterResponseDTO {
	private AccountDTO currentUser;
    private String token;
}
