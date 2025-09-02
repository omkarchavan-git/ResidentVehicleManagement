package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.service.ResidentService;
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

    @PostMapping("addResident")
    public ResponseEntity<String> addResident(@RequestBody Resident resident)
    {
        System.out.println("Received Resident: " + resident);
        residentService.saveResident(resident);
        return new ResponseEntity<>("Resident Saved" , HttpStatus.CREATED);
    }
}
