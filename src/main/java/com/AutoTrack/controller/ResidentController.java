package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.service.ResidentService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/Resident")
public class ResidentController {

    @Autowired
    private ResidentService residentService;


    // add resident with vehicles
    @PostMapping("/saveResidents")
    public ResponseEntity<?> addResident(@Valid @RequestBody Resident resident) {
         residentService.saveResident(resident);
        return new ResponseEntity<>("saved Resident", HttpStatus.CREATED);
    }
}
