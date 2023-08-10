package com.ac.Service;


import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class BCryptService {

	public String hashPassword(String password) {
		String salt = BCrypt.gensalt(10);
		return BCrypt.hashpw(password, salt);
	}

	public boolean checkPassword(String password, String hashedPassword) {
		return BCrypt.checkpw(password, hashedPassword);
	}
}