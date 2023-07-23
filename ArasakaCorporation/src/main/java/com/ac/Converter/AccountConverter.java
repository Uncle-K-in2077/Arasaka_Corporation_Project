package com.ac.Converter;

import org.springframework.stereotype.Component;

import com.ac.DTO.AccountDTO;
import com.ac.Entities.Account;


@Component
public class AccountConverter {
	public AccountDTO toAccountDTO(Account account) {
        AccountDTO accountDTO = new AccountDTO();
        accountDTO.setId(account.getId());
        accountDTO.setStatus(account.getStatus());
        accountDTO.setRole(account.getRole());
        accountDTO.setEmail(account.getEmail());
        accountDTO.setPassword(account.getPassword());
        accountDTO.setUsername(account.getUsername());
        return accountDTO;
    }

    public Account toAccount(AccountDTO accountDTO) {
        Account account = new Account();
        account.setId(accountDTO.getId());
        account.setStatus(accountDTO.getStatus());
        account.setRole(accountDTO.getRole());
        account.setEmail(accountDTO.getEmail());
        account.setPassword(accountDTO.getPassword());
        account.setUsername(accountDTO.getUsername());
        return account;
    }
}
