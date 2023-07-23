package com.ac.ApiController;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.AccountConverter;
import com.ac.DTO.AccountDTO;
import com.ac.Entities.Account;
import com.ac.Repository.AccountRepository;

@RestController
@RequestMapping("/api/account")
public class AccountController {
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountConverter accountConverter;
	
	
	@GetMapping
	public ResponseEntity<List<AccountDTO>> getAll(){
		List<Account> listEntity = accountRepository.findAll();
		List<AccountDTO> listDTO = new ArrayList<>();
		if(listEntity.size()>0) {
			for(Account item:listEntity) {
				listDTO.add(accountConverter.toAccountDTO(item));
			}
		}
		if(listDTO.size()>0) {
			return new ResponseEntity<>(listDTO,HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping
	public ResponseEntity<AccountDTO> create(@RequestBody AccountDTO item){
		try {
			Account account = accountConverter.toAccount(item);
			Account savedAccount = accountRepository.save(account);
			return new ResponseEntity<>(accountConverter.toAccountDTO(savedAccount), HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
}
