package com.hotelJavali.hotelJavali.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;

@RestController
public class ImageExperienceController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/api/upload")
    public ResponseEntity<List<String>> handleFileUpload(@RequestParam("files") List<MultipartFile> files) {
        if (files.isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        List<String> fileUrls = new ArrayList<>();

        try {
            for (MultipartFile file : files) {
                byte[] bytes = file.getBytes();
                String fileName = file.getOriginalFilename();
                Path path = Paths.get(uploadPath + File.separator + fileName);
                Files.write(path, bytes);

                // Assuming your application is running at http://localhost:8080
                String fileUrl = "http://localhost:8080/assets/" + fileName;
                fileUrls.add(fileUrl);
            }
            return ResponseEntity.ok(fileUrls);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
