package com.ac.ApiController;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ac.Converter.OrderConverter;
import com.ac.Converter.OrderDetailConverter;
import com.ac.DTO.OrderDTO;
import com.ac.Entities.Order;
import com.ac.Entities.Product;
import com.ac.Repository.OrderDetailRepository;
import com.ac.Repository.OrderRepository;
import com.ac.Repository.ProductRepository;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	@Autowired
	OrderConverter orderConverter;

	@Autowired
	OrderDetailConverter orderDetailConverter;
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@GetMapping()
	public ResponseEntity<List<OrderDTO>> getAll(){
		List<Order> orders = orderRepository.findAll();
		List<OrderDTO> orderDTOs = orders.stream()
				.map(order -> orderConverter.toDTO(order))
				.collect(Collectors.toList());
		if(orderDTOs.size()>0) {
			return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PostMapping()
    public ResponseEntity<OrderDTO> createOrder(@RequestBody OrderDTO orderDTO) {
        Order order = orderConverter.toEntity(orderDTO);
        order.setCreatedAt(new Date());
        Order savedOrder = orderRepository.save(order);
        if (order.getOrderDetails().size() > 0) {
			order.getOrderDetails().forEach(item -> {
				item.setOrder(savedOrder);
				orderDetailRepository.save(item);
				Product product = item.getProduct();
				product.setQuantity(product.getQuantity() - item.getQuantity());
				productRepository.save(product);
			});
		}
        
        OrderDTO savedOrderDTO = orderConverter.toDTO(savedOrder);
        return new ResponseEntity<>(savedOrderDTO, HttpStatus.CREATED);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getById(@PathVariable("id") int orderId){
		try {
			Order order = orderRepository.findById(orderId);
			if(order == null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			OrderDTO orderDTO = orderConverter.toDTO(order);
			return new ResponseEntity<>(orderDTO, HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.FAILED_DEPENDENCY);
		}
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable int id, @RequestBody OrderDTO orderDTO) {
        Order existingOrder = orderRepository.findById(id);
        if (existingOrder == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Chỉ cập nhật trạng thái (status) của đơn hàng
        existingOrder.setStatus(orderDTO.getStatus());

        Order updatedOrder = orderRepository.save(existingOrder);
        OrderDTO updatedOrderDTO = orderConverter.toDTO(updatedOrder);
        return new ResponseEntity<>(updatedOrderDTO, HttpStatus.OK);
    }
	
}
