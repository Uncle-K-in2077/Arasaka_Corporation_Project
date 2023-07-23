package com.ac.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ac.Entities.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>{
	Account findByUsername(String username);
	
	Optional<Account> findByEmail(String email);
	
	List<Account> findByUsernameContainingOrEmailContaining(String usernameKeyword, String emailKeyword);
}
