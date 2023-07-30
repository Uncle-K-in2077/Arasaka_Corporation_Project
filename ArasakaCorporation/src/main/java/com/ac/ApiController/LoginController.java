package com.ac.ApiController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.AccountConverter;
import com.ac.DTO.AccountDTO;
import com.ac.DTO.LoginResponse;
import com.ac.DTO.RefreshDTO;
import com.ac.Entities.Account;
import com.ac.Repository.AccountRepository;
import com.ac.Service.JWTService;
import com.ac.Service.SessionService;

@RestController
@RequestMapping("/api/login")
public class LoginController {
	
	@Autowired
	SessionService sessionService;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountConverter accountConverter;
	
	@Autowired
	JWTService jwtService;
	
	@PostMapping()
	public ResponseEntity<?> login(@RequestBody AccountDTO account) {
	    // Code xử lý đăng nhập
		Optional<Account> user = accountRepository.findByEmail(account.getEmail());
	    if (user.isEmpty()) {
	        return ResponseEntity.badRequest().body("Tài khoản không tồn tại !");
	    } else {
	        if (user.get().getPassword().equals(account.getPassword())) {
	            String token = jwtService.generateTokenLogin(account.getEmail());
	            AccountDTO dto = accountConverter.toAccountDTO(user.get());
	            LoginResponse res = new LoginResponse();
	            res.setAccount(dto);
	            res.setToken(token);
	            return new ResponseEntity<>(res,HttpStatus.OK);
	        } else {
	            sessionService.set("LoginMessage", "Mật khẩu không chính xác !");
	            return ResponseEntity.badRequest().body("Mật khẩu không chính xác !");
	        }
	    }
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> refresh(@RequestBody RefreshDTO item) {
		try {
			if (item.getToken() != "" && jwtService.validateTokenLogin(item.getToken())) {
				
				String email = jwtService.getUsernameFromToken(item.getToken());
				
				Optional<Account> user = accountRepository.findByEmail(email);
				if (user.isPresent()) {
					 String token = jwtService.generateTokenLogin(email);
			            AccountDTO dto = accountConverter.toAccountDTO(user.get());
			            LoginResponse res = new LoginResponse();
			            res.setAccount(dto);
			            res.setToken(token);
			            return new ResponseEntity<>(res,HttpStatus.OK);

				} else {
					return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND);
				}
			} else {
				return new ResponseEntity<>("Tài khoản không tồn tại", HttpStatus.NOT_FOUND);
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
