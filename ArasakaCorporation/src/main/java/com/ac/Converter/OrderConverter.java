package com.ac.Converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ac.DTO.OrderDTO;
import com.ac.DTO.OrderDetailDTO;
import com.ac.Entities.Order;
import com.ac.Entities.OrderDetail;
import com.ac.Repository.AccountRepository;
import com.ac.Repository.OrderDetailRepository;
import com.ac.Repository.OrderRepository;
import com.ac.Repository.ProductRepository;

@Component
public class OrderConverter {
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	OrderDetailRepository detailRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	AccountRepository accountRepository;
	
	@Autowired
	OrderDetailConverter orderDetailConverter;
	
	
	public OrderDTO toDTO(Order order) {
		OrderDTO orderDTO = new OrderDTO();
		orderDTO.setId(order.getId());
		orderDTO.setAddress(order.getAddress());
		orderDTO.setAmount(order.getAmount());
		orderDTO.setCreatedAt(order.getCreatedAt());
		orderDTO.setNote(order.getNote());
		orderDTO.setPhone(order.getPhone());
		orderDTO.setStatus(order.getStatus());
		
		// Assuming you have accountId in the Order entity
		orderDTO.setAccountId(order.getAccount().getId());
		orderDTO.setAccountName(order.getAccount().getUsername());
		orderDTO.setEmail(order.getAccount().getEmail());

		// Assuming you have a method to convert OrderDetail entity to OrderDetailDTO
		List<OrderDetailDTO> orderDetailDTOList = new ArrayList<>();
		if (order.getOrderDetails() != null) {
			for (OrderDetail orderDetail : order.getOrderDetails()) {
				orderDetailDTOList.add(orderDetailConverter.toDTO(orderDetail));
			}
		}
		orderDTO.setOrderDetails(orderDetailDTOList);
		
		return orderDTO;
	}

	public Order toEntity(OrderDTO orderDTO) {
		Order order = new Order();
		order.setId(orderDTO.getId());
		order.setAddress(orderDTO.getAddress());
		order.setAmount(orderDTO.getAmount());
		order.setCreatedAt(orderDTO.getCreatedAt());
		order.setNote(orderDTO.getNote());
		order.setPhone(orderDTO.getPhone());
		order.setStatus(orderDTO.getStatus());
		
		// Assuming you have accountId in the OrderDTO
		order.setAccount(accountRepository.findById(orderDTO.getAccountId()).orElse(null));

		// Assuming you have a method to convert OrderDetailDTO to OrderDetail entity
		List<OrderDetail> orderDetailList = new ArrayList<>();
		if (orderDTO.getOrderDetails() != null) {
			for (OrderDetailDTO orderDetailDTO : orderDTO.getOrderDetails()) {
				orderDetailList.add(orderDetailConverter.toEntity(orderDetailDTO));
			}
		}
		order.setOrderDetails(orderDetailList);
		
		return order;
	}
	
	
}
