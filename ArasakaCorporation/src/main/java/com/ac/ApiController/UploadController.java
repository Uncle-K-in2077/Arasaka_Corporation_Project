package com.ac.ApiController;

import java.util.Optional;

import javax.servlet.annotation.MultipartConfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ac.Service.UploadService;

@RestController
@MultipartConfig
public class UploadController {
	
	@Autowired 
	UploadService uploadService;
	
	@PostMapping("/api/upload")
	public ResponseEntity<String> uploadImage(@RequestParam("img") Optional<MultipartFile> file) {
        try {
        	if(file.isEmpty()){
                return new ResponseEntity<>("", HttpStatus.OK);
        	}
            String imageUrl = uploadService.save(file.get());
            return new ResponseEntity<>(imageUrl, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error uploading image", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}
