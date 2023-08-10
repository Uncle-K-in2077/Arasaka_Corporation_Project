package com.ac.ApiController;

import java.util.Optional;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.AccountConverter;
import com.ac.DTO.AccountDTO;
import com.ac.DTO.EmailDTO;
import com.ac.DTO.LoginResponse;
import com.ac.DTO.RefreshDTO;
import com.ac.Entities.Account;
import com.ac.Repository.AccountRepository;
import com.ac.Service.BCryptService;
import com.ac.Service.JWTService;
import com.ac.Service.MailerService;
import com.ac.Service.SessionService;


@RestController
@RequestMapping("/api/login")
public class LoginController {
//	for sending OTP and forgot Password function
	private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	public String getURL() {
		StringBuilder url = new StringBuilder();
		String scheme = request.getScheme();
		int port = request.getServerPort();

		url.append(scheme).append("://").append(request.getServerName());

		if (port != 80 && port != 443) {
			url.append(":").append(port);
		}

		return url.toString();
	}

	public String generateRandomString() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder(10);

		for (int i = 0; i < 10; i++) {
			int randomIndex = random.nextInt(CHARACTERS.length());
			char randomChar = CHARACTERS.charAt(randomIndex);
			sb.append(randomChar);
		}

		return sb.toString();
	}

	
	
	@Autowired
	SessionService sessionService;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	AccountConverter accountConverter;
	
	@Autowired
	JWTService jwtService;
	
	@Autowired
	BCryptService bCrypService;
	
	@Autowired
	HttpServletRequest request;
	
	@Autowired
	MailerService mailerService;
	
	@PostMapping()
	public ResponseEntity<?> login(@RequestBody AccountDTO account) {
	    // Code xử lý đăng nhập
		Optional<Account> user = accountRepository.findByEmail(account.getEmail());
	    if (user.isEmpty()) {
	        return ResponseEntity.badRequest().body("Tài khoản không tồn tại !");
	    } else {
	        if (bCrypService.checkPassword(account.getPassword(), user.get().getPassword())) {
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
	
//	Fogot Password
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPasswordVerify(@RequestBody EmailDTO emailDTO) {
		String verifyEmail = emailDTO.getVerifyEmail();
		System.out.println(verifyEmail);
	    

	    Optional<Account> verifyAccount = accountRepository.findByEmail(verifyEmail);
	    if (!verifyAccount.isPresent() || verifyAccount.isEmpty()) {
	    	System.out.println("Email not found 404");
	    	return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    // Generate and store OTP code
	    String newPassword = generateRandomString();
	    Account acc = verifyAccount.get();
	    acc.setPassword(bCrypService.hashPassword(newPassword));
	    accountRepository.save(acc);

	    try {
	        mailerService.send(verifyEmail, "ARASAKA - NEW PASSWORD", "Your new password is :  " + newPassword + "");
	        System.out.println("Send mail success!");
	    } catch (Exception e) {
	        System.out.println("Email sending failed");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email.");
	    }

	    // Return success response
	    return new ResponseEntity<>(newPassword ,HttpStatus.OK);
	}
	
}
