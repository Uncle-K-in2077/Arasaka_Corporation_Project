package com.ac.Converter;

import org.springframework.stereotype.Component;

import com.ac.DTO.RegisterAccountDTO;
import com.ac.Entities.Account;

@Component
public class RegisterAccountDTOConverter {
	public Account toAccount(RegisterAccountDTO registerAccountDTO) {
        Account account = new Account();
        account.setEmail(registerAccountDTO.getEmail());
        account.setPassword(registerAccountDTO.getPassword());
        account.setUsername(registerAccountDTO.getUsername());
        
        return account;
    }
}
