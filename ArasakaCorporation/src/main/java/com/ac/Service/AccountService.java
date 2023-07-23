package com.ac.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ac.Converter.RegisterAccountDTOConverter;
import com.ac.DTO.RegisterAccountDTO;
import com.ac.Entities.Account;
import com.ac.Repository.AccountRepository;

@Service
public class AccountService {

	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	RegisterAccountDTOConverter registerAccountDTOConverter;
	
	public Account registerAccount(RegisterAccountDTO registerAccountDTO) {
        // Chuyển đổi thông tin từ RegisterAccountDTO thành đối tượng Account
        Account account = registerAccountDTOConverter.toAccount(registerAccountDTO);
        
        // Kiểm tra xem tài khoản đã tồn tại chưa (dựa trên email hoặc username)
        if (getAccountByEmail(account.getEmail()) != null) {
            throw new RuntimeException("Tài khoản đã tồn tại");
        }

        // Lưu tài khoản vào cơ sở dữ liệu và trả về tài khoản đã được lưu
        Account saveAccount = accountRepository.save(account);
        return saveAccount;
    }
	
	
	public List<Account> getAllAccount() {
        return accountRepository.findAll();
    }
	
	public Account saveAccount(Account account) {
		// Triển khai logic để lưu tài khoản vào cơ sở dữ liệu
		return accountRepository.save(account);
	}
	
	public Account getAccountById(int id) {
		// Triển khai logic để lấy tài khoản từ cơ sở dữ liệu dựa trên id
		return accountRepository.findById(id).orElse(null);
	}
	
	public Account getAccountByUsername(String username) {
		// Triển khai logic để lấy tài khoản từ cơ sở dữ liệu dựa trên tên đăng nhập
		return accountRepository.findByUsername(username);
	}
	
	public Account getAccountByEmail(String email) {
		// Triển khai logic để lấy tài khoản từ cơ sở dữ liệu dựa trên email
		return accountRepository.findByEmail(email).orElse(null);
	}
	
	public List<Account> searchAccount(String keyword) {
	    return accountRepository.findByUsernameContainingOrEmailContaining(keyword, keyword);
	}
}
