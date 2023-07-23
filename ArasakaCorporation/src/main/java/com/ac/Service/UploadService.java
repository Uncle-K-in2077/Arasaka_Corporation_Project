package com.ac.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class UploadService {
	@Autowired
	private ServletContext servletContext;

	public String save(MultipartFile file) {
		try {
			String originalFilename = file.getOriginalFilename();
			String extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
			String randomName = UUID.randomUUID().toString() + extension;
			String realPath = servletContext.getRealPath("/static/uploads/");
			Path path = Paths.get(realPath + File.separator + randomName);
			Files.createDirectories(path.getParent());
			Files.write(path, file.getBytes());
			return "/static/uploads/" + randomName;
		} catch (IOException e) {
			throw new RuntimeException("Could not store file " + file.getOriginalFilename(), e);
		}
	}
}
