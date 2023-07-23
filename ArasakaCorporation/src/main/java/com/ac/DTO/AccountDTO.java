package com.ac.DTO;

import lombok.Data;

@Data
public class AccountDTO {
	private int id;
    private String email;
    private String password;
    private int role;
    private int status;
    private String username;
}
