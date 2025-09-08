package com.AutoTrack.controller;

import com.AutoTrack.entity.Resident;
import com.AutoTrack.entity.Vehicles;
import com.AutoTrack.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // API to add vehicle data with resident
    @PostMapping("/addVehicle")
    public ResponseEntity<?> addVehicle (@Valid @RequestBody Vehicles vehicles,
                                         @RequestParam int residentId)
    {
        try {
            Vehicles savedVehicle = vehicleService.createVehicle(vehicles, residentId);
            return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // API to get Resident details by Vehicle Registration Number
    @GetMapping("/resident")
    public ResponseEntity<?> getResidentByRegNum(@RequestParam String regNum) {
        try {
            Resident resident = vehicleService.getResidentByRegNum(regNum);
            return ResponseEntity.ok(resident);         //  Only Resident details
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
