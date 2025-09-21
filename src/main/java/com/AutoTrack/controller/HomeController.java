package com.AutoTrack.controller;

import com.AutoTrack.Service.HomeService;
import com.AutoTrack.dtoClasses.HomeSummaryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping("/summary")
    public ResponseEntity<HomeSummaryDTO> getHomeSummary() {
        HomeSummaryDTO summary = homeService.getHomeSummary();
        return ResponseEntity.ok(summary);
    }
}
