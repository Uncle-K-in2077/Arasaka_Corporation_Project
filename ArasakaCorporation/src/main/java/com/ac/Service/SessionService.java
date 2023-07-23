package com.ac.Service;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ac.Entities.Account;

@Service
public class SessionService {
	@Autowired
	private HttpSession session;

	public <T> T get(String name) {
		return (T) session.getAttribute(name);
	}

	public void set(String name, Object value) {
		session.setAttribute(name, value);
	}

	public void remove(String name) {
		session.removeAttribute(name);
	}
	
	public void saveAccount(Account account) {
	    set("account", account);
	}
}
