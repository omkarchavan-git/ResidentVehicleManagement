package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.service.ResidentService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
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

    // API to get all resident
    @GetMapping("/getAllResident")
    public ResponseEntity<List<Resident>> getallresidents () {
        List<Resident> residentList = residentService.getAllDevelopers();
        return new ResponseEntity<>(residentList,HttpStatus.OK);
    }

    @GetMapping("/getByName")
    public ResponseEntity<?> getByName(@RequestParam(required = false) String firstname,
                                       @RequestParam(required = false) String lastname) {

        // validation: no numbers allowed
        if ((firstname != null && firstname.matches(".*\\d.*")) ||
                (lastname != null && lastname.matches(".*\\d.*"))) {
            return ResponseEntity.badRequest().body("Firstname/Lastname should not contain numbers.");
        }

        List<Resident> residents = residentService.findByName(firstname, lastname);

        if (residents.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("First name OR last name is required...");
        }
        return ResponseEntity.ok(residents);
    }
}




