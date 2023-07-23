package com.ac.ApiController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.DTO.AccountDTO;
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
	JWTService jwtService;
	
	@PostMapping()
	public ResponseEntity<String> login(@RequestBody AccountDTO account) {
	    // Code xử lý đăng nhập
		Optional<Account> user = accountRepository.findByEmail(account.getEmail());
	    if (user.isEmpty()) {
	        return ResponseEntity.badRequest().body("Tài khoản không tồn tại !");
	    } else {
	        if (user.get().getPassword().equals(account.getPassword())) {
	        	// Xác thực thành công, tạo JWT
	            String token = jwtService.generateTokenLogin(account.getEmail());
	            System.out.println(token);
//	            AccountDTO accountDTO = accountConverter.toAccountDTO(user.get());
	            return new ResponseEntity<>(token,HttpStatus.OK);
	        } else {
	            sessionService.set("LoginMessage", "Mật khẩu không chính xác !");
	            return ResponseEntity.badRequest().body("Mật khẩu không chính xác !");
	        }
	    }
	}
}
