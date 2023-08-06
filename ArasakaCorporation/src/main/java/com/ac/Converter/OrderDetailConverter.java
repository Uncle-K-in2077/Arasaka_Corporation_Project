package com.ac.Converter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.ac.DTO.OrderDetailDTO;
import com.ac.Entities.Order;
import com.ac.Entities.OrderDetail;
import com.ac.Repository.OrderDetailRepository;
import com.ac.Repository.OrderRepository;
import com.ac.Repository.ProductRepository;

@Component
public class OrderDetailConverter {
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	public OrderDetailDTO toDTO(OrderDetail orderDetail) {
        OrderDetailDTO orderDetailDTO = new OrderDetailDTO();
        orderDetailDTO.setId(orderDetail.getId());
        orderDetailDTO.setQuantity(orderDetail.getQuantity());
        orderDetailDTO.setSalePrice(orderDetail.getSalePrice());

        // Set the orderId and productId based on the relationship in the entity
        orderDetailDTO.setOrderId(orderDetail.getOrder().getId());
        orderDetailDTO.setProductId(orderDetail.getProduct().getId());

        return orderDetailDTO;
    }

    public OrderDetail toEntity(OrderDetailDTO orderDetailDTO) {
        OrderDetail orderDetail = orderDetailRepository.findById(orderDetailDTO.getId()).orElse(new OrderDetail());
//        orderDetail.setId(orderDetailDTO.getId());
        orderDetail.setQuantity(orderDetailDTO.getQuantity());
        orderDetail.setSalePrice(orderDetailDTO.getSalePrice());

        // Since you have the orderId and productId in the DTO, you can fetch the Order and Product entities using their respective IDs and set them in the OrderDetail entity.
        orderDetail.setOrder(orderRepository.findById(orderDetailDTO.getOrderId()));
        orderDetail.setProduct(productRepository.findById(orderDetailDTO.getProductId()).orElse(null));

        return orderDetail;
    }
}
