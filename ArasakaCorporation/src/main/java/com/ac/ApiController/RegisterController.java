package com.ac.ApiController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.AccountConverter;
import com.ac.DTO.AccountDTO;
import com.ac.DTO.RegisterAccountDTO;
import com.ac.DTO.RegisterResponseDTO;
import com.ac.Entities.Account;
import com.ac.Repository.AccountRepository;
import com.ac.Service.AccountService;
import com.ac.Service.BCryptService;
import com.ac.Service.JWTService;

@RestController
@RequestMapping("/api/register")
public class RegisterController {
	@Autowired
	AccountService accountService;
	
	
	@Autowired
	AccountConverter accountConverter;
	
	@Autowired
	JWTService jwtService;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	BCryptService bCrypService;
	
	@PostMapping
	public ResponseEntity<?> register(@RequestBody RegisterAccountDTO account){
		try {
			
			Account existingAccount = accountService.getAccountByEmail(account.getEmail());
	        if (existingAccount != null) {
	        	System.out.println("Email allready been used");
	        	String error = "Email allready been used";
	            return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	        }
			
			AccountDTO newDTO = new AccountDTO();
			newDTO.setEmail(account.getEmail());
//			newDTO.setPassword(account.getPassword());
			newDTO.setUsername(account.getUsername());
			newDTO.setStatus(1);
			newDTO.setRole(1);
			newDTO.setPassword(bCrypService.hashPassword(account.getPassword()));
			System.out.println("password after hash: " + newDTO.getPassword());
			Account newAccount = accountConverter.toAccount(newDTO);
			Account saved = accountRepository.save(newAccount);
			
			AccountDTO currentUser = accountConverter.toAccountDTO(saved);
			String token = jwtService.generateTokenLogin(currentUser.getEmail());
			
			RegisterResponseDTO res = new RegisterResponseDTO();
			res.setCurrentUser(currentUser);
			res.setToken(token);
			System.out.println("Cteated!");
			return new ResponseEntity<>(res, HttpStatus.CREATED);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	
}
